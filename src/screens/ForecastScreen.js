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
  const [error, setError] = useState(null); // Retrait du typage TypeScript

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getWeeklyForecast(14.7167, -17.4677);
        console.log("Données reçues:", data);
        setForecast(data);
        setError(null);
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="warning" size={40} color="#e74c3c" />
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.helpText}>
          Vérifiez votre connexion et réessayez
        </Text>
      </View>
    );
  }

  if (forecast.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="cloud-offline" size={40} color="#7f8c8d" />
        <Text style={styles.noDataText}>Aucune donnée disponible</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 15,
  },
  loadingText: {
    marginTop: 10,
    color: "#3498db",
  },
  helpText: {
    marginTop: 5,
    color: "#7f8c8d",
    fontSize: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 16,
    textAlign: "center",
  },
  noDataText: {
    textAlign: "center",
    color: "#7F8C8D",
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
  description: {
    fontSize: 14,
    color: "#3498db",
    fontStyle: "italic",
  },
});

export default ForecastScreen;
