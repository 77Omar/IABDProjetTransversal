import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QuickActions = ({ navigation }) => {
  const actions = [
    { icon: "thermometer-outline", label: "Alertes", screen: "Alerts" },
    { icon: "person-outline", label: "Profil", screen: "Profile" },
    { icon: "medkit-outline", label: "Urgence", screen: "Emergency" },
    { icon: "map-outline", label: "Carte", screen: "WeatherMap" },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionItem}
          onPress={() => navigation.navigate(action.screen)}
        >
          <View style={styles.actionIcon}>
            <Ionicons name={action.icon} size={24} color="#3498DB" />
          </View>
          <Text style={styles.actionText}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionItem: {
    alignItems: "center",
    width: "23%",
  },
  actionIcon: {
    backgroundColor: "#EBF5FB",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    textAlign: "center",
    color: "#2C3E50",
  },
});

export default QuickActions;
