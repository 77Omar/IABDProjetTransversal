import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>À propos de Kaaw Tang</Text>
      <Text style={styles.version}>Version 1.0.0</Text>

      <Text style={styles.description}>
        Application d'alerte et de prévention des vagues de chaleur au Sénégal.
        Développée pour protéger les populations vulnérables.
      </Text>

      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL("https://www.kaawtang.sn")}
      >
        <Ionicons name="globe" size={20} color="#3498db" />
        <Text style={styles.linkText}>www.kaawtang.sn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c3e50",
  },
  version: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#34495e",
    marginBottom: 30,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#3498db",
    marginLeft: 10,
  },
});

export default AboutScreen;
