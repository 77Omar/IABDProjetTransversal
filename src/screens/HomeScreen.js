import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getWeatherData } from "../services/weatherService";

const HomeScreen = ({ navigation }) => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ lat: 14.7167, lon: -17.4677 }); // Dakar par défaut

  useEffect(() => {
    const loadData = async () => {
      const data = await getWeatherData(location.lat, location.lon);
      setWeather(data);
    };
    loadData();
  }, [location]);

  // Détermine le niveau d'alerte en fonction de la température
  const getAlertLevel = () => {
    if (!weather) return "normal";
    if (weather.temp > 40) return "dangerous";
    if (weather.temp > 35) return "warning";
    return "normal";
  };

  // Conseils adaptés à la météo
  const getWeatherTips = () => {
    if (!weather)
      return [
        "Chargez en cours...",
        "Conseils météo personnalisés",
        "Disponible bientôt",
      ];

    if (weather.temp > 35)
      return [
        "Buvez au moins 2 litres d'eau par jour",
        "Évitez de sortir entre 12h et 16h",
        "Portez des vêtements légers et clairs",
        "Utilisez un parasol ou un chapeau",
      ];

    return [
      "Météo agréable aujourd'hui",
      "Profitez-en pour vos activités extérieures",
      "Protégez-vous quand même du soleil",
    ];
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec localisation */}
      <View style={styles.header}>
        <Ionicons name="location-sharp" size={20} color="#FF6B6B" />
        <Text style={styles.locationText}>Dakar, Sénégal</Text>
      </View>

      {/* Carte météo principale */}
      <View style={styles.weatherCard}>
        <Text style={styles.weatherTitle}>Conditions actuelles</Text>

        {weather ? (
          <>
            <View style={styles.weatherRow}>
              <Ionicons name="thermometer" size={24} color="#FF6B6B" />
              <Text style={styles.weatherText}>
                Température: {weather.temp}°C
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <Ionicons name="body" size={24} color="#FF6B6B" />
              <Text style={styles.weatherText}>
                Ressenti: {weather.feels_like}°C
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <Ionicons name="water" size={24} color="#3498db" />
              <Text style={styles.weatherText}>
                Humidité: {weather.humidity}%
              </Text>
            </View>
            <View style={styles.weatherRow}>
              <Ionicons name="alert-circle" size={24} color="#f39c12" />
              <Text style={styles.weatherText}>
                Conditions: {weather.alerts}
              </Text>
            </View>
          </>
        ) : (
          <Text>Chargement des données météo...</Text>
        )}
      </View>

      {/* Niveau d'alerte */}
      <View style={styles.alertContainer}>
        <Text style={styles.sectionTitle}>Niveau d'alerte</Text>
        <View
          style={[
            styles.alertLevel,
            getAlertLevel() === "dangerous"
              ? styles.alertDangerous
              : getAlertLevel() === "warning"
              ? styles.alertWarning
              : styles.alertNormal,
          ]}
        >
          <Text style={styles.alertText}>
            {getAlertLevel() === "dangerous"
              ? "Dangereux"
              : getAlertLevel() === "warning"
              ? "Vigilance"
              : "Normal"}
          </Text>
        </View>
      </View>

      {/* Actions rapides */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Alerts")}
          >
            <Ionicons name="alert" size={24} color="white" />
            <Text style={styles.actionText}>Alertes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Forecast")}
          >
            <Ionicons name="book" size={24} color="white" />
            <Text style={styles.actionText}>Conseils</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conseils du jour */}
      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Conseils du jour</Text>
        {getWeatherTips().map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#2ecc71" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  weatherCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
    textAlign: "center",
  },
  weatherRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  weatherText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#34495E",
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  alertLevel: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  alertNormal: {
    backgroundColor: "#2ecc71",
  },
  alertWarning: {
    backgroundColor: "#f39c12",
  },
  alertDangerous: {
    backgroundColor: "#e74c3c",
  },
  alertText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  quickActions: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
  },
  actionText: {
    color: "white",
    marginTop: 5,
    fontWeight: "500",
  },
  tipsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#34495E",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 10,
  },
});

export default HomeScreen;
