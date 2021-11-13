import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";

import colors from "../config/colors";
import ProfileModel from "../models/ProfileModel";
import CheckinScreen from "../screens/AnglerCheckinScreen";
import FLocationSaveScreen from "../screens/FLocationSaveScreen";
import FishingLocationSearchScreen from "../screens/FLocationSearchScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import store from "../utilities/Store";
import ProfileNavigator from "./NestedProfileNavigator";

store.addModel("ProfileModel", ProfileModel);

const Tab = createBottomTabNavigator();
const AnglerMainNavigator = () => {
  const getUserInfo = useStoreActions(
    (actions) => actions.ProfileModel.getUserInfo,
  );

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Báo cá"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary["500"],
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
            return <FontAwesome5 name="fish" color={color} size={size} />;
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
