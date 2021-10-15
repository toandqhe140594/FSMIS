import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

import * as ROUTE_NAMES from "../config/routeNames";
import test from "../screens/CatchReportsHistoryDetailScreen";
import FishingLocationOverviewScreen from "../screens/FLocationOverviewScreen";
import LakeDetailScreen from "../screens/LakeDetailScreen";
import WriteReportScreen from "../screens/WriteReportScreen";
import WriteReviewScreen from "../screens/WriteReviewScreen";
import AnglerMainTabNavigator from "./AnglerMainTabNavigator";

const PlaceholderView = () => {
  return <View>PlaceholderView</View>;
};

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.TEST}
    >
      <RootStack.Screen name={ROUTE_NAMES.TEST} component={test} />
      <RootStack.Screen
        name={ROUTE_NAMES.ANGLER_MAIN}
        component={AnglerMainTabNavigator}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.FLOCATION_OVERVIEW}
        component={FishingLocationOverviewScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.WRITE_REPORT}
        component={WriteReportScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.WRITE_REVIEW}
        component={WriteReviewScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.LAKE_DETAIL}
        component={LakeDetailScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.CATCHES_REPORT_DETAIL}
        component={PlaceholderView}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.PROFILE_MAIN}
        component={PlaceholderView}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
