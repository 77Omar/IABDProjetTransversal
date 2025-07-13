import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const WeatherMapScreen = () => {
  // Données des régions avec indicateurs de température
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

  // Couleurs et icônes dynamiques
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
    // Ajoutez ici la navigation vers un écran de détail si nécessaire
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alertes Météo Régionales</Text>

      {/* Légende améliorée */}
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

      {/* Liste des régions */}
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
