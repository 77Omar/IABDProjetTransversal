import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomTabNavigator = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = () => {
          switch (route.name) {
            case "Home":
              return isFocused ? "home" : "home-outline";
            case "Alerts":
              return isFocused ? "notifications" : "notifications-outline";
            case "WeatherMap":
              return isFocused ? "map" : "map-outline";
            case "Profile":
              return isFocused ? "person" : "person-outline";
            case "Settings":
              return isFocused ? "settings" : "settings-outline";
            default:
              return "home";
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <Ionicons
              name={iconName()}
              size={24}
              color={isFocused ? "#3498DB" : "#95A5A6"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EBEDEF",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabNavigator;
