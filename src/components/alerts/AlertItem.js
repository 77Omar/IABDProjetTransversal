import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AlertItem = ({ alert, navigation }) => {
  const getAlertColor = () => {
    switch (alert.level) {
      case "very_uncomfortable":
        return "#F39C12";
      case "dangerous":
        return "#E74C3C";
      case "very_dangerous":
        return "#C0392B";
      default:
        return "#2ECC71";
    }
  };

  return (
    <View style={[styles.container, { borderLeftColor: getAlertColor() }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{alert.title}</Text>
        <View style={styles.regionBadge}>
          <Text style={styles.regionText}>{alert.region}</Text>
        </View>
      </View>
      <Text style={styles.date}>{alert.date}</Text>
      <Text style={styles.description}>{alert.description}</Text>

      <TouchableOpacity
        style={styles.footer}
        onPress={() =>
          navigation.navigate("Recommendations", {
            alertLevel: alert.level,
            region: alert.region,
            alertDetails: alert, 
          })
        }
      >
        <Text style={styles.moreInfo}>Voir les recommandations</Text>
        <Ionicons name="chevron-forward" size={16} color="#3498DB" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    flex: 1,
  },
  regionBadge: {
    backgroundColor: "#EBF5FB",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 10,
  },
  regionText: {
    fontSize: 12,
    color: "#3498DB",
  },
  date: {
    fontSize: 12,
    color: "#7F8C8D",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#34495E",
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  moreInfo: {
    color: "#3498DB",
    fontSize: 12,
    marginRight: 5,
  },
});

export default AlertItem;



/* import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AlertItem = ({ alert, navigation }) => {
  const getAlertColor = () => {
    switch (alert.level) {
      case "very_uncomfortable":
        return "#F39C12";
      case "dangerous":
        return "#E74C3C";
      case "very_dangerous":
        return "#C0392B";
      default:
        return "#2ECC71";
    }
  };

  const handlePress = () => {
    navigation.navigate("Recommendations", {
      alertLevel: alert.level,
      region: alert.region,
    });
  };

  return (
    <View style={[styles.container, { borderLeftColor: getAlertColor() }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{alert.title}</Text>
        <View style={styles.regionBadge}>
          <Text style={styles.regionText}>{alert.region}</Text>
        </View>
      </View>
      <Text style={styles.date}>{alert.date}</Text>
      <Text style={styles.description}>{alert.description}</Text>

      <TouchableOpacity style={styles.footer} onPress={handlePress}>
        <Text style={styles.moreInfo}>Voir les recommandations</Text>
        <Ionicons name="chevron-forward" size={16} color="#3498DB" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    flex: 1,
  },
  regionBadge: {
    backgroundColor: "#EBF5FB",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginLeft: 10,
  },
  regionText: {
    fontSize: 12,
    color: "#3498DB",
  },
  date: {
    fontSize: 12,
    color: "#7F8C8D",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#34495E",
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  moreInfo: {
    color: "#3498DB",
    fontSize: 12,
    marginRight: 5,
  },
});

export default AlertItem;
 */
