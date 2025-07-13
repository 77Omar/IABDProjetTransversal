import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const NotificationSettingsScreen = () => {
  const [settings, setSettings] = useState({
    pushEnabled: true,
    smsEnabled: false,
    emailEnabled: true,
  });

  const toggleSwitch = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres de notifications</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications push</Text>
        <Switch
          value={settings.pushEnabled}
          onValueChange={() => toggleSwitch("pushEnabled")}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Alertes par SMS</Text>
        <Switch
          value={settings.smsEnabled}
          onValueChange={() => toggleSwitch("smsEnabled")}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications par email</Text>
        <Switch
          value={settings.emailEnabled}
          onValueChange={() => toggleSwitch("emailEnabled")}
        />
      </View>
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  settingText: {
    fontSize: 16,
    color: "#34495e",
  },
});

export default NotificationSettingsScreen;
