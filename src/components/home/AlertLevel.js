import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AlertLevel = ({ level }) => {
  const getAlertConfig = () => {
    switch (level) {
      case "very_uncomfortable":
        return {
          color: "#F39C12",
          text: "Très inconfortable",
          icon: "alert-circle-outline",
        };
      case "dangerous":
        return { color: "#E74C3C", text: "Dangereux", icon: "warning-outline" };
      case "very_dangerous":
        return { color: "#C0392B", text: "Très dangereux", icon: "alert" };
      default:
        return {
          color: "#2ECC71",
          text: "Normal",
          icon: "checkmark-circle-outline",
        };
    }
  };

  const config = getAlertConfig();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: config.color }]}
    >
      <View style={styles.alertContent}>
        <Ionicons name={config.icon} size={24} color="white" />
        <Text style={styles.alertText}>{config.text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default AlertLevel;
