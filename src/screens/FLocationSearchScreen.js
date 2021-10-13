import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";

import ListViewRoute from "../components/FishingSpotSearchScreenComponents/ListViewRoute";
import MapViewRoute from "../components/FishingSpotSearchScreenComponents/MapViewRoute";

const Tab = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  tabBarStyle: {
    height: 40,
    justifyContent: "center",
  },
  tabBarLabelStyle: {
    fontSize: 13,
    marginTop: 0,
  },
});

export default function FishingSpotSearchScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <Tab.Screen name="Hồ câu gần đây" component={MapViewRoute} />
      <Tab.Screen name="Tìm kiếm nâng cao" component={ListViewRoute} />
    </Tab.Navigator>
  );
}
