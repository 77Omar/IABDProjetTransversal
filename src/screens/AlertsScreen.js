import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AlertItem from "../components/alerts/AlertItem";

const AlertsScreen = ({ navigation }) => {
  const alerts = [
    {
      id: "20",
      title: "Alerte vague de chaleur",
      region: "Matam",
      date: "15 Juin 2025",
      level: "dangerous",
      description:
        "Températures attendues jusqu'à 45°C dans les prochains jours.",
    },
    {
      id: "21",
      title: "Niveau très inconfortable",
      region: "Podor",
      date: "10 Juin 2025",
      level: "very_uncomfortable",
      description: "Températures élevées prévues, prenez vos précautions.",
    },
    {
      id: "3",
      title: "Alerte rouge",
      region: "Kaffrine",
      date: "15 Juin 2025",
      level: "very_dangerous",
      description:
        "Vague de chaleur extrême, évitez toute activité extérieure.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alertes récentes</Text>
        <Ionicons name="notifications-outline" size={24} color="#3498DB" />
      </View>

      <FlatList
        data={alerts}
        renderItem={({ item }) => (
          <AlertItem alert={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },
});

export default AlertsScreen;

/* import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AlertItem from "../components/alerts/AlertItem";

const AlertsScreen = () => {
  const alerts = [
    {
      id: "1",
      title: "Alerte vague de chaleur",
      region: "Matam",
      date: "15 Juin 2023",
      level: "dangerous",
      description:
        "Températures attendues jusqu'à 45°C dans les prochains jours.",
    },
    {
      id: "2",
      title: "Niveau très inconfortable",
      region: "Podor",
      date: "10 Juin 2023",
      level: "very_uncomfortable",
      description: "Températures élevées prévues, prenez vos précautions.",
    },
    {
      id: "3",
      title: "Alerte rouge",
      region: "Kaffrine",
      date: "5 Juin 2023",
      level: "very_dangerous",
      description:
        "Vague de chaleur extrême, évitez toute activité extérieure.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alertes récentes</Text>
        <Ionicons name="notifications-outline" size={24} color="#3498DB" />
      </View>
    
      <FlatList
        data={alerts}
        renderItem={({ item }) => (
          <AlertItem alert={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },
});

export default AlertsScreen; */
