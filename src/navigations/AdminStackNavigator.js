import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import AccountManagementModel from "../models/AccountManagementModel";
import AdminAccountDetailScreen from "../screens/AdminAccountDetailScreen";
import AdminAccountManagementScreen from "../screens/AdminAccountManagementScreen";
import AdminBlacklistPhoneAddScreen from "../screens/AdminBlacklistPhoneAddScreen";
import AdminBlacklistManagementScreen from "../screens/AdminBlacklistPhoneScreen";
import AdminFishEditScreen from "../screens/AdminFishEditScreen";
import AdminFishingMethodEditScreen from "../screens/AdminFishingMethodEditScreen";
import AdminFishingMethodManagementScreen from "../screens/AdminFishingMethodManagementScreen";
import AdminFishManagementScreen from "../screens/AdminFishManagementScreen";
import AdminFLocationManagementScreen from "../screens/AdminFLocationManagementScreen";
import AdminFLocationReportDetailScreen from "../screens/AdminFLocationReportDetailScreen";
import AdminFLocationVerifyScreen from "../screens/AdminFLocationVerifyScreen";
import AdminMainScreen from "../screens/AdminMainScreen";
import AdminReportManagementScreen from "../screens/AdminReportManagementScreen";
import AdminReportPostDetailScreen from "../screens/AdminReportPostDetailScreen";
import AdminReportReviewDetailScreen from "../screens/AdminReportReviewDetailScreen";
import store from "../utilities/Store";

const AdminStack = createNativeStackNavigator();

store.addModel("AccountManagementModel", AccountManagementModel);
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
        component={AdminReportPostDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_REVIEW_DETAIL}
        component={AdminReportReviewDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT}
        component={AdminFLocationManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT_OVERVIEW}
        component={AdminFLocationVerifyScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT}
        component={AdminReportManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT}
        component={AdminBlacklistManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT_ADD}
        component={AdminBlacklistPhoneAddScreen}
      />
    </AdminStack.Navigator>
  );
};

export default AdminStackNavigator;
