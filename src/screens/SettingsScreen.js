import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const settingsItems = [
    {
      icon: "language",
      title: "Langue",
      screen: "LanguageSettings",
    },
    {
      icon: "notifications",
      title: "Notifications",
      screen: "NotificationSettings",
    },
    {
      icon: "shield-checkmark",
      title: "Confidentialité",
      screen: "PrivacySettings",
    },
    {
      icon: "help-circle",
      title: "Aide & FAQ",
      screen: "HelpScreen",
    },
    {
      icon: "information-circle",
      title: "À propos",
      screen: "AboutScreen",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Paramètres</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons
              name="moon"
              size={22}
              color="#3498DB"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Mode sombre</Text>
          </View>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkModeEnabled ? "#3498DB" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alertes</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons
              name="notifications"
              size={22}
              color="#3498DB"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Notifications push</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#3498DB" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Ionicons
              name="text"
              size={22}
              color="#3498DB"
              style={styles.settingIcon}
            />
            <Text style={styles.settingText}>Alertes par SMS</Text>
          </View>
          <Switch
            value={smsAlertsEnabled}
            onValueChange={setSmsAlertsEnabled}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={smsAlertsEnabled ? "#3498DB" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.settingItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.settingInfo}>
              <Ionicons
                name={item.icon}
                size={22}
                color="#3498DB"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#95A5A6" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EBEDEF",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: "#34495E",
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    color: "#95A5A6",
    fontSize: 12,
    marginBottom: 10,
  },
  settingDescription: {
    fontSize: 12,
    color: "#95A5A6",
    marginTop: 2,
  },
});

export default SettingsScreen;
