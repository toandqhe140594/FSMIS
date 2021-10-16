import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Box } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";

import EventPostCard from "../components/EventPostCard";
import HeaderTab from "../components/HeaderTab";
import PressableCustomCard from "../components/PressableCustomCard";

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
const dummyMenu = [
  { id: 1, name: "Hồ thuần việt" },
  { id: 2, name: "Hồ không thuần việt" },
  { id: 3, name: "Hồ Quản" },
];
const reportHandler = () => {
  console.log("report");
};
const eventIconList = [{ name: "Báo cáo bài viết", onPress: reportHandler }];
const A = () => {
  return (
    <FlatList
      data={dummyMenu}
      renderItem={() => (
        <Box backgroundColor="white" my="1">
          <PressableCustomCard>
            <EventPostCard postStyle="ANGLER_POST" />
          </PressableCustomCard>
        </Box>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const FLocationEventRoute = () => {
  return (
    <FlatList
      data={dummyMenu}
      renderItem={() => (
        <Box backgroundColor="white" my="1">
          <EventPostCard postStyle="LAKE_POST" iconEvent={eventIconList} />
        </Box>
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
