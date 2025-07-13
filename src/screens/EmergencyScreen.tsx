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
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  // ajoutez d'autres routes ici si nécessaire
};

const EmergencyScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Données des contacts d'urgence (adaptables pour le Sénégal)
  const emergencyContacts: {
    name: string;
    number: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
  }[] = [
    { name: "SAMU Médical", number: "1515", icon: "medkit" },
    { name: "Pompiers", number: "18", icon: "flame" },
    { name: "Police", number: "17", icon: "shield" },
    { name: "Centre Anti Poison", number: "338695858", icon: "skull" },
  ];

  // Conseils pour les coups de chaleur
  const firstAidTips = [
    "Placez la personne à l'ombre",
    "Allongez-la et surélevez ses jambes",
    "Appliquez des compresses d'eau froide",
    "Donnez-lui à boire si consciente",
    "Appelez les secours immédiatement",
  ];

  // Fonction pour composer un numéro
  const callNumber = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Ionicons name="warning" size={30} color="#E74C3C" />
        <Text style={styles.headerTitle}>Urgence - Coup de Chaleur</Text>
      </View>

      {/* Section Contacts d'Urgence */}
      <Text style={styles.sectionTitle}>Numéros d'Urgence</Text>
      <View style={styles.contactsContainer}>
        {emergencyContacts.map((contact, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactCard}
            onPress={() => callNumber(contact.number)}
          >
            <Ionicons name={contact.icon} size={24} color="#E74C3C" />
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section Premiers Secours */}
      <Text style={styles.sectionTitle}>Premiers Secours</Text>
      <View style={styles.tipsContainer}>
        {firstAidTips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      {/* Bouton d'Appel d'Urgence Principal */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => callNumber("1515")}
      >
        <Ionicons name="alert-circle" size={28} color="white" />
        <Text style={styles.emergencyButtonText}>Appeler les Secours</Text>
      </TouchableOpacity>

      {/* Lien vers la Prévention */}
      <TouchableOpacity
        style={styles.preventionLink}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.preventionText}>
          ← Retour aux conseils de prévention
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles avec adaptation pour les zones rurales (lisibilité)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FDEDED",
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E74C3C",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginVertical: 15,
    marginLeft: 5,
  },
  contactsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#34495E",
  },
  contactNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E74C3C",
  },
  tipsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: "#34495E",
    lineHeight: 22,
  },
  emergencyButton: {
    backgroundColor: "#E74C3C",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  emergencyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  preventionLink: {
    marginTop: 10,
    padding: 10,
  },
  preventionText: {
    color: "#3498DB",
    textAlign: "center",
    fontSize: 14,
  },
});

export default EmergencyScreen;
