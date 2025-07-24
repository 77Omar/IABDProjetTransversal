import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RecommendationsScreen = ({ route }) => {
  const { alertLevel, region } = route.params;

  const getRecommendations = () => {
    const baseTips = [
      "Évitez les activités extérieures entre 11h et 16h",
      "Portez des vêtements légers et clairs",
      "Hydratez-vous régulièrement",
    ];

    switch (alertLevel) {
      case "very_uncomfortable":
        return [...baseTips, "Utilisez un ventilateur ou climatiseur"];
      case "dangerous":
        return [
          ...baseTips,
          "Prenez des douches fraîches",
          "Surveillez les signes de coup de chaleur",
        ];
      case "very_dangerous":
        return [
          ...baseTips,
          "Restez dans des endroits climatisés",
          "Contactez le 1515 en cas de malaise",
        ];
      default:
        return baseTips;
    }
  };

  const emergencyNumber = "1515";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recommandations pour {region}</Text>
        <Text style={styles.alertLevel}>
          Niveau d'alerte: {alertLevel.replace("_", " ")}
        </Text>
      </View>

      {getRecommendations().map((tip, index) => (
        <View key={index} style={styles.tipItem}>
          <Ionicons name="checkmark-circle" size={18} color="#2ECC71" />
          <Text style={styles.tipText}>{tip}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => Linking.openURL(`tel:${emergencyNumber}`)}
      >
        <Ionicons name="alert-circle" size={24} color="white" />
        <Text style={styles.emergencyText}>
          Urgence: composer le {emergencyNumber}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  alertLevel: {
    fontSize: 16,
    color: "#E74C3C",
    marginTop: 5,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  tipText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#34495E",
    flex: 1,
  },
  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  emergencyText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default RecommendationsScreen;
