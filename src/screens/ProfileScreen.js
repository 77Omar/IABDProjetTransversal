import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Omar Faye",
    phone: "+221 77 123 45 67",
    region: "MATAM",
    vulnerable: true,
    profileType: "elderly", // elderly, pregnant, child, chronic
    language: "fr", // fr, wo, pu
  });

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const profileTypes = [
    { id: "elderly", label: "Personne âgée", icon: "accessibility-outline" },
    { id: "pregnant", label: "Femme enceinte", icon: "female-outline" },
    { id: "child", label: "Enfant", icon: "body-outline" },
    { id: "chronic", label: "Maladie chronique", icon: "medkit-outline" },
  ];

  const languages = [
    { id: "fr", label: "Français" },
    { id: "wo", label: "Wolof" },
    { id: "pu", label: "Pulaar" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={80} color="#3498DB" />
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userInfo}>
          {userProfile.phone} • {userProfile.region}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil de vulnérabilité</Text>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            Je fais partie d'un groupe vulnérable
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={userProfile.vulnerable ? "#3498DB" : "#f4f3f4"}
            onValueChange={() =>
              setUserProfile({
                ...userProfile,
                vulnerable: !userProfile.vulnerable,
              })
            }
            value={userProfile.vulnerable}
          />
        </View>

        {userProfile.vulnerable && (
          <View style={styles.profileTypes}>
            {profileTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.profileTypeButton,
                  userProfile.profileType === type.id &&
                    styles.profileTypeButtonActive,
                ]}
                onPress={() =>
                  setUserProfile({ ...userProfile, profileType: type.id })
                }
              >
                <Ionicons
                  name={type.icon}
                  size={24}
                  color={
                    userProfile.profileType === type.id ? "#3498DB" : "#95A5A6"
                  }
                />
                <Text
                  style={[
                    styles.profileTypeText,
                    userProfile.profileType === type.id &&
                      styles.profileTypeTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        <Text style={styles.preferenceLabel}>Langue de l'application</Text>
        <View style={styles.languageOptions}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.languageButton,
                userProfile.language === lang.id && styles.languageButtonActive,
              ]}
              onPress={() =>
                setUserProfile({ ...userProfile, language: lang.id })
              }
            >
              <Text
                style={[
                  styles.languageText,
                  userProfile.language === lang.id && styles.languageTextActive,
                ]}
              >
                {lang.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.notificationSetting}>
          <Text style={styles.settingText}>Notifications push</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#3498DB" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.notificationSetting}>
          <Text style={styles.settingText}>Alertes par SMS</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#3498DB" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
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
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2C3E50",
    marginTop: 10,
  },
  userInfo: {
    fontSize: 14,
    color: "#7F8C8D",
    marginTop: 5,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleText: {
    fontSize: 14,
    color: "#34495E",
  },
  profileTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  profileTypeButton: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#EBEDEF",
    borderRadius: 8,
    marginBottom: 10,
  },
  profileTypeButtonActive: {
    borderColor: "#3498DB",
    backgroundColor: "#EBF5FB",
  },
  profileTypeText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#95A5A6",
  },
  profileTypeTextActive: {
    color: "#3498DB",
    fontWeight: "500",
  },
  preferenceLabel: {
    fontSize: 14,
    color: "#34495E",
    marginBottom: 10,
  },
  languageOptions: {
    flexDirection: "row",
    marginBottom: 20,
  },
  languageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#EBEDEF",
    borderRadius: 20,
    marginRight: 10,
  },
  languageButtonActive: {
    borderColor: "#3498DB",
    backgroundColor: "#EBF5FB",
  },
  languageText: {
    fontSize: 14,
    color: "#7F8C8D",
  },
  languageTextActive: {
    color: "#3498DB",
    fontWeight: "500",
  },
  notificationSetting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  settingText: {
    fontSize: 14,
    color: "#34495E",
  },
  saveButton: {
    backgroundColor: "#3498DB",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
