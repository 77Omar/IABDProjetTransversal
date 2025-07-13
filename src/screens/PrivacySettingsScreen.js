import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PrivacySettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Politique de confidentialité</Text>
      <Text style={styles.text}>
        Nous respectons votre vie privée. Toutes les données collectées sont
        utilisées uniquement pour fournir et améliorer nos services.
      </Text>
      <Text style={styles.sectionTitle}>Données collectées</Text>
      <Text style={styles.text}>
        - Position géographique (pour les alertes locales) - Préférences de
        notification - Historique des alertes
      </Text>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: "#2c3e50",
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: "#34495e",
  },
});

export default PrivacySettingsScreen;
