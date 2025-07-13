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

const EmergencyScreen = () => {
  const emergencyContacts = [
    { name: "SAMU Médical", number: "1515" },
    { name: "Pompiers", number: "18" },
    { name: "Police", number: "17" },
    { name: "Centre Anti Poison", number: "33869 58 58" },
  ];

  const firstAidTips = [
    "Placez la personne à l'ombre ou dans un endroit frais",
    "Allongez-la et surélevez ses jambes",
    "Enlevez ses vêtements superflus",
    "Rafraîchissez-la avec de l'eau (pas trop froide)",
    "Faites-la boire si elle est consciente",
    "Appelez les secours si les symptômes sont graves",
  ];

  const callEmergency = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Urgence - Coup de chaleur</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Numéros d'urgence</Text>
        {emergencyContacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactItem}
            onPress={() => callEmergency(contact.number)}
          >
            <View style={styles.contactInfo}>
              <Ionicons name="call-outline" size={24} color="#E74C3C" />
              <Text style={styles.contactName}>{contact.name}</Text>
            </View>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Premiers secours</Text>
        {firstAidTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Symptômes d'alerte</Text>
        <Text style={styles.symptomText}>
          • Forte fièvre (au-dessus de 39°C)
        </Text>
        <Text style={styles.symptomText}>• Peau chaude, rouge et sèche</Text>
        <Text style={styles.symptomText}>• Maux de tête violents</Text>
        <Text style={styles.symptomText}>• Nausées et vomissements</Text>
        <Text style={styles.symptomText}>
          • Confusion ou perte de conscience
        </Text>
        <Text style={styles.symptomText}>• Crampes musculaires</Text>
      </View>

      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => callEmergency("1515")}
      >
        <Ionicons name="alert-circle" size={28} color="white" />
        <Text style={styles.emergencyButtonText}>Appel d'urgence</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEDEF",
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    fontSize: 16,
    color: "#34495E",
    marginLeft: 10,
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E74C3C",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#34495E",
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
  symptomText: {
    fontSize: 14,
    color: "#34495E",
    marginBottom: 8,
    marginLeft: 5,
  },
  emergencyButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  emergencyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default EmergencyScreen;
