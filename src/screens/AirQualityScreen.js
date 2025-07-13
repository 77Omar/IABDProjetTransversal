import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAirQuality } from "../services/airQualityService";


const AirQualityScreen = () => {
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAirQuality = async () => {
      try {
        const data = await getAirQuality(14.7167, -17.4677);
        setAirData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadAirQuality();
  }, []);

  const getQualityLevel = (aqi) => {
    if (aqi <= 1) return { level: "Bonne", color: "#2ecc71", icon: "happy" };
    if (aqi <= 2)
      return { level: "Modérée", color: "#f1c40f", icon: "neutral" };
    return { level: "Mauvaise", color: "#e74c3c", icon: "sad" };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Qualité de l'Air</Text>

      {loading ? (
        <Text>Chargement...</Text>
      ) : airData ? (
        <View style={styles.qualityCard}>
          <View
            style={[
              styles.qualityHeader,
              { backgroundColor: getQualityLevel(airData.main.aqi).color },
            ]}
          >
            <Ionicons
              name={getQualityLevel(airData.main.aqi).icon}
              size={30}
              color="white"
            />
            <Text style={styles.qualityTitle}>
              {getQualityLevel(airData.main.aqi).level}
            </Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Indice AQI</Text>
              <Text style={styles.detailValue}>{airData.main.aqi}</Text>
            </View>

            <View style={styles.detailGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>CO</Text>
                <Text style={styles.gridValue}>
                  {airData.components.co.toFixed(1)}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>NO2</Text>
                <Text style={styles.gridValue}>
                  {airData.components.no2.toFixed(1)}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>O3</Text>
                <Text style={styles.gridValue}>
                  {airData.components.o3.toFixed(1)}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>PM2.5</Text>
                <Text style={styles.gridValue}>
                  {airData.components.pm2_5.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text>Données non disponibles</Text>
      )}
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  qualityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  qualityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  qualityTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  detailsContainer: {
    padding: 15,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  detailValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#ECF0F1",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  gridLabel: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  gridValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
});

export default AirQualityScreen;
