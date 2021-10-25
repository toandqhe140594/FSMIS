import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import AnglerCatchReportsHistoryScreen from "../screens/AnglerCatchReportsHistoryScreen";
import AnglerCheckInHistory from "../screens/AnglerCheckinHistory";
import AnglerProfileScreen from "../screens/AnglerProfileScreen";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.PROFILE_MAIN}
    >
      <ProfileStack.Screen
        name={ROUTE_NAMES.PROFILE_MAIN}
        component={AnglerProfileScreen}
      />
      <ProfileStack.Screen
        name={ROUTE_NAMES.PROFILE_CHECKIN_REPORT_HISTORY}
        component={AnglerCheckInHistory}
      />
      <ProfileStack.Screen
        name={ROUTE_NAMES.PROFILE_CATCHES_REPORT_HISTORY}
        component={AnglerCatchReportsHistoryScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
