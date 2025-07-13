import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const faqs = [
  {
    question: "Comment recevoir des alertes?",
    answer: "Activez les notifications dans les paramètres",
  },
  {
    question: "Comment changer de région?",
    answer: "Allez dans votre profil et modifiez la localisation",
  },
];

const HelpScreen = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aide & FAQ</Text>

      {faqs.map((item, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity
            style={styles.faqHeader}
            onPress={() => setExpanded(expanded === index ? null : index)}
          >
            <Text style={styles.faqQuestion}>{item.question}</Text>
            <Ionicons
              name={expanded === index ? "chevron-up" : "chevron-down"}
              size={20}
              color="#3498db"
            />
          </TouchableOpacity>

          {expanded === index && (
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          )}
        </View>
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
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
    flex: 1,
  },
  faqAnswer: {
    paddingBottom: 15,
    color: "#7f8c8d",
    lineHeight: 22,
  },
});

export default HelpScreen;
