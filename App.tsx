import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

// Import des écrans
import HomeScreen from "./src/screens/HomeScreen";
import AlertsScreen from "./src/screens/AlertsScreen";
import WeatherMapScreen from "./src/screens/WeatherMapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import EmergencyScreen from "./src/screens/EmergencyScreen";

// Import des écrans de paramètres
import LanguageSettingsScreen from "./src/screens/LanguageSettingsScreen";
import NotificationSettingsScreen from "./src/screens/NotificationSettingsScreen";
import PrivacySettingsScreen from "./src/screens/PrivacySettingsScreen";
import HelpScreen from "./src/screens/HelpScreen";
import AboutScreen from "./src/screens/AboutScreen";

import ForecastScreen from "./src/screens/ForecastScreen";
import AirQualityScreen from "./src/screens/AirQualityScreen";

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

// Créez un Stack Navigator pour les paramètres
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsMain" component={SettingsScreen} />
      <SettingsStack.Screen
        name="LanguageSettings"
        component={LanguageSettingsScreen}
      />
      <SettingsStack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
      />
      <SettingsStack.Screen
        name="PrivacySettings"
        component={PrivacySettingsScreen}
      />
      <SettingsStack.Screen name="HelpScreen" component={HelpScreen} />
      <SettingsStack.Screen name="AboutScreen" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "alert-circle";

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Alerts":
                iconName = "notifications";
                break;
              case "Emergency":
                iconName = "warning";
                break;
              case "WeatherMap":
                iconName = "map";
                break;
              case "Profile":
                iconName = "person";
                break;
              case "Settings":
                iconName = "settings";
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#3498db",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Alerts" component={AlertsScreen} />
        <Tab.Screen name="Emergency" component={EmergencyScreen} />
        <Tab.Screen name="WeatherMap" component={WeatherMapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />

        <Tab.Screen
          name="Forecast"
          component={ForecastScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AirQuality"
          component={AirQualityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloudy" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
