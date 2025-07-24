import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { OPENWEATHER_API_KEY } from "@env";

// Configuration des données Sénégal
const SENEGAL_BOUNDS = {
  north: 16.691,
  south: 12.307,
  west: -17.535,
  east: -11.342,
};

const SENEGAL_CENTER = {
  latitude: 14.4974,
  longitude: -14.4524,
  latitudeDelta: 4.5,
  longitudeDelta: 4.5,
};

// Liste des villes avec classification santé
const CITIES = [
  { id: 1, name: "Dakar", lat: 14.6928, lon: -17.4467 },
  { id: 2, name: "Kaolack", lat: 14.1825, lon: -16.2533 },
  { id: 3, name: "Thiès", lat: 14.7918, lon: -16.9256 },
  { id: 4, name: "Tambacounda", lat: 13.7689, lon: -13.6672 },
  { id: 5, name: "Ziguinchor", lat: 12.5833, lon: -16.2667 },
  { id: 6, name: "Saint-Louis", lat: 16.0179, lon: -16.4896 },
  { id: 7, name: "Kédougou", lat: 12.5579, lon: -12.1743 },
  { id: 8, name: "Matam", lat: 15.6556, lon: -13.2554 },
  { id: 9, name: "Louga", lat: 15.6144, lon: -16.2212 },
  { id: 10, name: "Diourbel", lat: 14.6561, lon: -16.2331 },
  { id: 11, name: "Sédhiou", lat: 12.7042, lon: -15.5569 },
  { id: 12, name: "Kaffrine", lat: 14.1053, lon: -15.5503 },
  { id: 13, name: "Fatick", lat: 14.3392, lon: -16.4152 },
];

export default function WeatherHealthMap() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const mapRef = useRef(null);

  // 1. Récupération des données actuelles
  const fetchCurrentWeather = async () => {
    try {
      const results = await Promise.all(
        CITIES.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=fr`
          );
          const data = await response.json();
          return {
            ...city,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            condition: data.weather[0].description,
            icon: data.weather[0].icon,
          };
        })
      );
      setWeatherData(results);
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Récupération des prévisions (jour/nuit)
  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=8`
      );
      const data = await response.json();

      // Extraction des températures max/min
      const dailyData = data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!acc[date]) {
          acc[date] = {
            maxTemp: -Infinity,
            minTemp: Infinity,
            dayTemp: null,
            nightTemp: null,
          };
        }

        const hour = new Date(item.dt * 1000).getHours();
        if (hour >= 6 && hour < 18) {
          // Jour (6h-18h)
          acc[date].dayTemp = Math.round(item.main.temp);
          acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp_max);
        } else {
          // Nuit (18h-6h)
          acc[date].nightTemp = Math.round(item.main.temp);
          acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp_min);
        }

        return acc;
      }, {});

      setForecastData(Object.values(dailyData).slice(0, 3)); // 3 jours
    } catch (error) {
      console.error("Erreur prévisions:", error);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, []);

  // 3. Classification santé
  const getHealthRisk = (temp, humidity, riskLevel) => {
    const heatIndex = temp + 0.5 * humidity; // Formule simplifiée

    if (heatIndex >= 45 || riskLevel === 4)
      return { level: 4, color: "#e74c3c", label: "Danger extrême" };
    if (heatIndex >= 40 || riskLevel === 3)
      return { level: 3, color: "#f39c12", label: "Risque élevé" };
    if (heatIndex >= 35 || riskLevel === 2)
      return { level: 2, color: "#f1c40f", label: "Risque modéré" };
    return { level: 1, color: "#2ecc71", label: "Normal" };
  };

  // 4. Données pour la heatmap
  const heatmapPoints = weatherData.map((city) => ({
    latitude: city.lat,
    longitude: city.lon,
    weight: city.temp / 10, // Normalisation pour la heatmap
  }));

  const handleMarkerPress = async (city) => {
    setSelectedCity(city);
    await fetchForecast(city.lat, city.lon);
    setShowForecast(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Chargement des données santé-météo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={SENEGAL_CENTER}
      >
        <Heatmap
          points={heatmapPoints}
          radius={50}
          opacity={0.7}
          gradient={{
            colors: ["#2ecc71", "#f1c40f", "#f39c12", "#e74c3c"],
            startPoints: [0.1, 0.3, 0.6, 1],
          }}
        />

        {weatherData.map((city) => {
          const healthRisk = getHealthRisk(
            city.temp,
            city.humidity,
            city.riskLevel
          );

          return (
            <Marker
              key={city.id}
              coordinate={{ latitude: city.lat, longitude: city.lon }}
              onPress={() => handleMarkerPress(city)}
            >
              <View
                style={[styles.marker, { backgroundColor: healthRisk.color }]}
              >
                <Text style={styles.markerText}>{city.temp}°</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Niveaux de risque santé</Text>
        {[
          { level: 4, color: "#e74c3c", label: "Danger extrême" },
          { level: 3, color: "#f39c12", label: "Risque élevé" },
          { level: 2, color: "#f1c40f", label: "Risque modéré" },
          { level: 1, color: "#2ecc71", label: "Normal" },
        ].map((item) => (
          <View key={item.level} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text>{item.label}</Text>
          </View>
        ))}
      </View>

      <Modal visible={showForecast} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Prévisions pour {selectedCity?.name}
          </Text>

          <ScrollView>
            {forecastData.map((day, index) => (
              <View key={index} style={styles.forecastDay}>
                <Text style={styles.forecastHeader}>
                  Jour {index + 1} - Max: {Math.round(day.maxTemp)}° / Min:{" "}
                  {Math.round(day.minTemp)}°
                </Text>
                <View style={styles.forecastRow}>
                  <Text>🌞 Jour: {day.dayTemp}°C</Text>
                  <Text>🌙 Nuit: {day.nightTemp}°C</Text>
                </View>
                <View style={styles.healthAdvice}>
                  <Text style={styles.adviceTitle}>Conseils santé:</Text>
                  {day.maxTemp >= 40 ? (
                    <Text>
                      ⚠️ Évitez toute activité extérieure entre 12h et 16h
                    </Text>
                  ) : day.maxTemp >= 35 ? (
                    <Text>⏱ Limitez les activités physiques intenses</Text>
                  ) : (
                    <Text>
                      ✅ Conditions normales, maintenez une bonne hydratation
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowForecast(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  marker: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  markerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  legend: {
    position: "absolute",
    bottom: 20,
    left: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    width: "60%",
  },
  legendTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    textDecorationLine: "underline",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 5,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
  },
  forecastDay: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  forecastHeader: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  forecastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  healthAdvice: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    marginTop: 5,
  },
  adviceTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});




//second
/* import React, {useState, useEffect} from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";
import * as Location from 'expo-location';

export default function WeatherMapScreen() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.799,
    longitude: -122.40,
    latitudeDelta: 0.0930,
    longitudeDelta: 0.0421
  });

  const userLocation = async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted'){
          setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      setMapRegion({
          latitude:location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0930,
          longitudeDelta: 0.0421
      });
      console.log(location.coords.latitude, location.coords.longitude);
  }

  useEffect(()=> {
      userLocation();
  },[]);
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
          region={mapRegion}
      >
      <Marker coordinate={mapRegion} title='Marker'/>
      </MapView>
      <Button title='Get Location' onPress={userLocation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
 */

/* import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WeatherMapScreen = () => {
  
  const regions = [
    {
      id: 1,
      name: "Dakar",
      temp: 36,
      level: "uncomfortable",
      trend: "up", 
    },
    {
      id: 2,
      name: "Thiès",
      temp: 38,
      level: "very_uncomfortable",
      trend: "up",
    },
    {
      id: 3,
      name: "Saint-Louis",
      temp: 40,
      level: "dangerous",
      trend: "up",
    },
    {
      id: 4,
      name: "Tambacounda",
      temp: 42,
      level: "dangerous",
      trend: "up",
    },
    {
      id: 5,
      name: "Ziguinchor",
      temp: 35,
      level: "normal",
      trend: "down",
    },
  ];

  const getRegionStyle = (level) => {
    const styles = {
      normal: { color: "#2ECC71", icon: "thermometer-outline" },
      uncomfortable: { color: "#F1C40F", icon: "warning-outline" },
      very_uncomfortable: { color: "#F39C12", icon: "alert-circle-outline" },
      dangerous: { color: "#E74C3C", icon: "alert-circle" },
    };
    return styles[level] || styles.normal;
  };

  const handleRegionPress = (region) => {
    console.log(`Region selected: ${region.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alertes Météo Régionales</Text>

      <View style={styles.legend}>
        {["normal", "uncomfortable", "very_uncomfortable", "dangerous"].map(
          (level) => (
            <View key={level} style={styles.legendItem}>
              <Ionicons
                name={getRegionStyle(level).icon}
                size={16}
                color={getRegionStyle(level).color}
              />
              <Text style={styles.legendText}>
                {level === "dangerous"
                  ? "Dangereux"
                  : level === "very_uncomfortable"
                  ? "Très inconfortable"
                  : level === "uncomfortable"
                  ? "Inconfortable"
                  : "Normal"}
              </Text>
            </View>
          )
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {regions.map((region) => {
          const style = getRegionStyle(region.level);

          return (
            <TouchableOpacity
              key={region.id}
              style={styles.regionCard}
              onPress={() => handleRegionPress(region)}
              activeOpacity={0.7}
            >
              <Ionicons name={style.icon} size={28} color={style.color} />

              <View style={styles.regionInfo}>
                <Text style={styles.regionName}>{region.name}</Text>
                <View style={styles.tempContainer}>
                  <Text style={styles.regionTemp}>{region.temp}°C</Text>
                  <Ionicons
                    name={`arrow-${region.trend}`}
                    size={16}
                    color={region.trend === "up" ? "#E74C3C" : "#2ECC71"}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.alertBadge,
                  { backgroundColor: `${style.color}20` },
                ]}
              >
                <Text style={[styles.alertLevel, { color: style.color }]}>
                  {region.level === "dangerous"
                    ? "DANGER"
                    : region.level === "very_uncomfortable"
                    ? "ALERTE"
                    : "NORMAL"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#2C3E50",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  legendText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#34495E",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  regionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  regionInfo: {
    flex: 1,
    marginLeft: 16,
  },
  regionName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#2C3E50",
    marginBottom: 4,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  regionTemp: {
    fontSize: 15,
    fontWeight: "500",
    color: "#7F8C8D",
  },
  alertBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  alertLevel: {
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
  },
});

export default WeatherMapScreen;
 */
