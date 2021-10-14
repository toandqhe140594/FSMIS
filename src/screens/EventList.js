/* eslint-disable no-unused-vars */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustom from "../components/Pressable";

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
const A = () => {
  return (
    <FlatList
      // eslint-disable-next-line no-use-before-define
      data={dummyMenu}
      renderItem={({ item }) => (
        <PressableCustom paddingX="1">
          <EventPostCard postStyle="ANGLER_POST" />
        </PressableCustom>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const dummyMenu = [
  { id: 1, name: "Hồ thuần việt" },
  { id: 2, name: "Hồ không thuần việt" },
  { id: 3, name: "Hồ Quản" },
];
const FLocationEventRoute = () => {
  return (
    <FlatList
      data={dummyMenu}
      renderItem={({ item }) => (
        <PressableCustom paddingX="1">
          <EventPostCard postStyle="LAKE_POST" />
        </PressableCustom>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Tab = createMaterialTopTabNavigator();

const EventListRoute = () => {
  return (
    <Box style={{ flex: 1 }}>
      <HeaderTab name="Hồ câu thuần việt" isVerified flagable />
      <Divider />
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: "white",
        }}
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tab.Screen name="Bài viết" component={FLocationEventRoute} />
        <Tab.Screen name="Lịch sử báo cá" component={A} />
      </Tab.Navigator>
    </Box>
  );
};

export default EventListRoute;
