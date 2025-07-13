import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const languages = [
  { code: "fr", name: "Français" },
  { code: "wo", name: "Wolof" },
  { code: "pu", name: "Pulaar" },
];

const LanguageSettingsScreen = () => {
  const [selectedLang, setSelectedLang] = useState("fr");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez votre langue</Text>

      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={styles.langItem}
          onPress={() => setSelectedLang(lang.code)}
        >
          <Ionicons
            name={
              selectedLang === lang.code
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#3498db"
          />
          <Text style={styles.langText}>{lang.name}</Text>
        </TouchableOpacity>
      ))}
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
    marginBottom: 30,
    color: "#2c3e50",
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  langText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#34495e",
  },
});

export default LanguageSettingsScreen;
