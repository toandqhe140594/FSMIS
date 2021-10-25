import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import AdminAccountDetailScreen from "../screens/AdminAccountDetailScreen";
import AdminAccountManagementScreen from "../screens/AdminAccountManagementScreen";
import AdminFishEditScreen from "../screens/AdminFishEditScreen";
import AdminFishingMethodEditScreen from "../screens/AdminFishingMethodEditScreen";
import AdminFishingMethodManagementScreen from "../screens/AdminFishingMethodManagementScreen";
import AdminFishManagementScreen from "../screens/AdminFishManagementScreen";
import AdminFLocationReportDetailScreen from "../screens/AdminFLocationReportDetailScreen";
import AdminMainScreen from "../screens/AdminMainScreen";
import AdminReportEventPostScreen from "../screens/AdminReportEventPostScreen";
import AdminReportReviewDetailScreen from "../screens/AdminReportReviewDetailScreen";

const PlaceholderScreen = () => {
  return <></>;
};

const AdminStack = createNativeStackNavigator();

const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.ADMIN_MAIN}
    >
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_MAIN}
        component={AdminMainScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT}
        component={AdminAccountManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT_DETAIL}
        component={AdminAccountDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_FISH_MANAGEMENT}
        component={AdminFishManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT}
        component={AdminFishEditScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT}
        component={AdminFishingMethodManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT_EDIT}
        component={AdminFishingMethodEditScreen}
      />

      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_LOCATION_DETAIL}
        component={AdminFLocationReportDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_POST_DETAIL}
        component={AdminReportEventPostScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_REVIEW_DETAIL}
        component={AdminReportReviewDetailScreen}
      />

      {/* Placeholder */}
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT}
        component={PlaceholderScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT_OVERVIEW}
        component={PlaceholderScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT}
        component={PlaceholderScreen}
      />
    </AdminStack.Navigator>
  );
};

export default AdminStackNavigator;
