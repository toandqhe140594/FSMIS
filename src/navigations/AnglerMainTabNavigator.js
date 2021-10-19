import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CheckinScreen from "../screens/AnglerCheckinScreen";
import FLocationSaveScreen from "../screens/FLocationSaveScreen";
import FishingLocationSearchScreen from "../screens/FLocationSearchScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileNavigator from "./NestedProfileNavigator";

const Tab = createBottomTabNavigator();
const AnglerMainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Báo cá"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Điểm câu"
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name="location-searching"
                color={color}
                size={size}
              />
            );
          },
        }}
        component={FishingLocationSearchScreen}
      />
      <Tab.Screen
        name="Đã lưu"
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="bookmarks" color={color} size={size} />;
          },
        }}
        component={FLocationSaveScreen}
      />
      <Tab.Screen
        name="Báo cá"
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="fish" color={color} size={size} />
            );
          },
        }}
        component={CheckinScreen}
      />
      <Tab.Screen
        name="Thông báo"
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="notifications" color={color} size={size} />
            );
          },
        }}
        component={NotificationsScreen}
      />
      <Tab.Screen
        name="Cá nhân"
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="account-circle" color={color} size={size} />
            );
          },
        }}
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default AnglerMainNavigator;
