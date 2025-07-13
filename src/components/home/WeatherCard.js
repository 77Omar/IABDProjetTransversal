import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WeatherCard = ({ currentTemp, maxTemp, minTemp, weatherCondition }) => {
  const getWeatherIcon = () => {
    switch (weatherCondition) {
      case "sunny":
        return <Ionicons name="sunny" size={40} color="#F39C12" />;
      case "cloudy":
        return <Ionicons name="cloudy" size={40} color="#95A5A6" />;
      default:
        return <Ionicons name="partly-sunny" size={40} color="#F1C40F" />;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.weatherInfo}>
        {getWeatherIcon()}
        <Text style={styles.currentTemp}>{currentTemp}</Text>
      </View>
      <View style={styles.tempRange}>
        <Text style={styles.tempText}>Max: {maxTemp}</Text>
        <Text style={styles.tempText}>Min: {minTemp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 15,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#2C3E50",
  },
  tempRange: {
    alignItems: "flex-end",
  },
  tempText: {
    fontSize: 14,
    color: "#7F8C8D",
    marginBottom: 3,
  },
});

export default WeatherCard;
