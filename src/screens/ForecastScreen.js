import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getWeeklyForecast } from "../services/forecastService";

const ForecastScreen = () => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour obtenir les icônes météo
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return "sunny";
      case "Rain":
        return "rainy";
      case "Clouds":
        return "cloudy";
      default:
        return "calendar";
    }
  };

  // Fonction pour générer des conseils adaptés
  const getWeatherTips = (temp) => {
    if (temp > 35)
      return [
        "☀️ Évitez le soleil entre 12h-16h",
        "💧 Buvez 3L d'eau aujourd'hui",
        "👒 Portez un chapeau et des lunettes",
      ];
    return [
      "🌤️ Temps idéal pour les activités extérieures",
      "🧴 Appliquez de la crème solaire",
      "💦 Emportez une bouteille d'eau",
    ];
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getWeeklyForecast(14.7167, -17.4677);
        setForecast(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (forecast.length === 0) return <NoDataView />;

  return (
    <ScrollView style={styles.container}>
      {/* Section Prévisions existante */}
      <Text style={styles.header}>Prévisions 7 Jours</Text>
      {forecast.map((day, index) => (
        <View key={index} style={styles.dayCard}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayText}>
              {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </Text>
            <Ionicons
              name={getWeatherIcon(day.weather[0].main)}
              size={24}
              color="#3498db"
            />
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.tempText}>
              Max: {Math.round(day.temp.max)}°C
            </Text>
            <Text style={styles.tempText}>
              Min: {Math.round(day.temp.min)}°C
            </Text>
          </View>
          <Text style={styles.description}>{day.weather[0].description}</Text>
        </View>
      ))}

      {/* Nouvelle Section Conseils */}
      <Text style={[styles.header, { marginTop: 30 }]}>Conseils du Jour</Text>
      <View style={styles.tipsCard}>
        {getWeatherTips(forecast[0]?.temp?.max || 25).map((tip, i) => (
          <View key={i} style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#2ecc71" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Composants séparés pour plus de clarté
const LoadingView = () => (
  <View style={styles.centerContainer}>
    <ActivityIndicator size="large" color="#3498db" />
    <Text style={styles.loadingText}>Chargement des données...</Text>
  </View>
);

const ErrorView = ({ error }) => (
  <View style={styles.centerContainer}>
    <Ionicons name="warning" size={40} color="#e74c3c" />
    <Text style={styles.errorText}>{error}</Text>
    <Text style={styles.helpText}>Vérifiez votre connexion et réessayez</Text>
  </View>
);

const NoDataView = () => (
  <View style={styles.centerContainer}>
    <Ionicons name="cloud-offline" size={40} color="#7f8c8d" />
    <Text style={styles.noDataText}>Aucune donnée disponible</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  dayCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tipText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#34495E",
  },
  loadingText: {
    marginTop: 10,
    color: "#3498db",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    textAlign: "center",
  },
  helpText: {
    marginTop: 5,
    color: "#7f8c8d",
    fontSize: 14,
  },
  noDataText: {
    textAlign: "center",
    color: "#7F8C8D",
  },
  description: {
    fontSize: 14,
    color: "#3498db",
    fontStyle: "italic",
  },
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495E",
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tempText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
});

export default ForecastScreen;