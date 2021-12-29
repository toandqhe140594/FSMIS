import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useStoreActions } from "easy-peasy";
import React, { useEffect } from "react";

import colors from "../config/colors";
import FManageModel from "../models/FManageModel";
import ProfileModel from "../models/ProfileModel";
import UtilModel from "../models/UtilModel";
import CheckinScreen from "../screens/AnglerCheckinScreen";
import FLocationSaveScreen from "../screens/FLocationSaveScreen";
import FishingLocationSearchScreen from "../screens/FLocationSearchScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import store from "../utilities/Store";
import ProfileNavigator from "./NestedProfileNavigator";

store.addModel("ProfileModel", ProfileModel);
store.addModel("UtilModel", UtilModel);
store.addModel("FManageModel", FManageModel);

const Tab = createBottomTabNavigator();
const AnglerMainNavigator = () => {
  const getUserInfo = useStoreActions(
    (actions) => actions.ProfileModel.getUserInfo,
  );
  const getSavedLocationList = useStoreActions(
    (actions) => actions.ProfileModel.getSavedLocationList,
  );
  const resetProfileModel = useStoreActions(
    (actions) => actions.ProfileModel.reset,
  );
  const resetFManageModel = useStoreActions(
    (actions) => actions.FManageModel.reset,
  );

  useEffect(() => {
    getUserInfo();
    getSavedLocationList({ mode: "refresh" });
    return () => {
      resetProfileModel();
      resetFManageModel();
    };
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
