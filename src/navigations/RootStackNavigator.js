import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import * as ROUTE_NAMES from "../config/routeNames";
import AnglerCatchReportScreen from "../screens/AnglerCatchReportScreen";
import CatchReportsHistoryDetailScreen from "../screens/CatchReportHistoryDetailScreen";
import ChangePhoneNumberScreen from "../screens/ChangePhoneNumberScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import FishingLocationOverviewScreen from "../screens/FLocationOverviewScreen";
import FManageHomeScreen from "../screens/FManageHomeScreen";
import LakeDetailScreen from "../screens/LakeDetailScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import WriteReportScreen from "../screens/WriteReportScreen";
import WriteReviewScreen from "../screens/WriteReviewScreen";
import AnglerMainTabNavigator from "./AnglerMainTabNavigator";

const RootStack = createNativeStackNavigator();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.ANGLER_MAIN}
    >
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
        component={CatchReportsHistoryDetailScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.PROFILE_CHANGE_INFORMATION}
        component={EditProfileScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.PROFILE_CHANGE_PHONE_NUMBER}
        component={ChangePhoneNumberScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.PROFILE_CHANGE_PASSWORD}
        component={ResetPasswordScreen}
      />
      {/* <RootStack.Screen
        name={ROUTE_NAMES.PERSONAL_MANAGE_LOCATION_LIST}
        component={ChangePhoneNumberScreen}
      /> */}
      <RootStack.Screen
        name={ROUTE_NAMES.PERSONAL_MANAGE_LOCATION_LIST}
        component={FManageHomeScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.CATCHES_REPORT_FORM}
        component={AnglerCatchReportScreen}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
