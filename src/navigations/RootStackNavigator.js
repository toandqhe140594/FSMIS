import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import AnglerAdvanceSearchScreen from "../screens/AnglerAdvanceSearchScreen";
import AnglerCatchReportDetailScreen from "../screens/AnglerCatchReportDetailScreen";
import AnglerCatchReportScreen from "../screens/AnglerCatchReportScreen";
import ChangePhoneNumberScreen from "../screens/AnglerChangePhoneNumberScreen";
import EditProfileScreen from "../screens/AnglerEditProfileScreen";
import FishingLocationOverviewScreen from "../screens/FLocationOverviewScreen";
import LakeDetailScreen from "../screens/LakeDetailScreen";
import MediaSelectScreen from "../screens/MediaSelectScreen";
import OTPScreen from "../screens/OTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import WriteReportScreen from "../screens/WriteReportScreen";
import WriteReviewScreen from "../screens/WriteReviewScreen";
import AnglerMainTabNavigator from "./AnglerMainTabNavigator";
import FManageNavigator from "./FManageNavigator";

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
        component={AnglerCatchReportDetailScreen}
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
      <RootStack.Screen
        name={ROUTE_NAMES.FMANAGE_SELECTOR}
        component={ChangePhoneNumberScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.CATCHES_REPORT_FORM}
        component={AnglerCatchReportScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.MANAGEMENT_MODE}
        component={FManageNavigator}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.MEDIA_SELECTOR}
        component={MediaSelectScreen}
      />
      <RootStack.Screen
        name={ROUTE_NAMES.ADVANCE_SEARCH}
        component={AnglerAdvanceSearchScreen}
      />
      <RootStack.Screen name={ROUTE_NAMES.OTP_SCREEN} component={OTPScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
