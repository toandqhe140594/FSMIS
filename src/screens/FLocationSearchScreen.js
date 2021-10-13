import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ListViewRoute from "../components/FishingSpotSearchScreenComponents/ListViewRoute";
import MapViewRoute from "../components/FishingSpotSearchScreenComponents/MapViewRoute";
import FooterTabsView from "../components/FooterTabsView";

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
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}
        >
          <Tab.Screen name="Hồ câu gần đây" component={MapViewRoute} />
          <Tab.Screen name="Tìm kiếm nâng cao" component={ListViewRoute} />
        </Tab.Navigator>
      </NavigationContainer>
      <FooterTabsView />
    </SafeAreaView>
  );
}
