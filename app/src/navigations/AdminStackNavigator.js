import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import AccountManagementModel from "../models/AccountManagementModel";
import AdminFLocationModel from "../models/AdminFLocationModel";
import AdminLocationLatLngModel from "../models/AdminLocationLatLngModel";
import AdminAccountDeactivateScreen from "../screens/AdminAccountDeactivateScreen";
import AdminAccountDetailScreen from "../screens/AdminAccountDetailScreen";
import AdminAccountManagementScreen from "../screens/AdminAccountManagementScreen";
import AdminBlacklistPhoneAddScreen from "../screens/AdminBlacklistPhoneAddScreen";
import AdminBlacklistManagementScreen from "../screens/AdminBlacklistPhoneScreen";
import AdminCatchReportDetailScreen from "../screens/AdminCatchReportDetailScreen";
import AdminCreateSuggestLocation from "../screens/AdminCreateSuggestLocation";
import AdminFishEditScreen from "../screens/AdminFishEditScreen";
import AdminFishingMethodEditScreen from "../screens/AdminFishingMethodEditScreen";
import AdminFishingMethodManagementScreen from "../screens/AdminFishingMethodManagementScreen";
import AdminFishManagementScreen from "../screens/AdminFishManagementScreen";
import AdminFLocationManagementScreen from "../screens/AdminFLocationManagementScreen";
import AdminFLocationReportDetailScreen from "../screens/AdminFLocationReportDetailScreen";
import AdminFLocationVerifyScreen from "../screens/AdminFLocationVerifyScreen";
import AdminMainScreen from "../screens/AdminMainScreen";
import AdminReportCatchDetailScreen from "../screens/AdminReportCatchDetailScreen";
import AdminReportManagementScreen from "../screens/AdminReportManagementScreen";
import AdminReportPostDetailScreen from "../screens/AdminReportPostDetailScreen";
import AdminReportReviewDetailScreen from "../screens/AdminReportReviewDetailScreen";
import AdminSuggestedLocationDetailScreen from "../screens/AdminSuggestedLocationDetailScreen";
import AdminSuggestedLocationManagementScreen from "../screens/AdminSuggestedLocationManagementScreen";
import FManagePickLocationScreen from "../screens/FManagePickLocationScreen";
import LakeDetailScreen from "../screens/LakeDetailScreen";
import MediaSelectScreen from "../screens/MediaSelectScreen";
import store from "../utilities/Store";

const AdminStack = createNativeStackNavigator();

store.addModel("AccountManagementModel", AccountManagementModel);
store.addModel("AdminFLocationModel", AdminFLocationModel);
store.addModel("FManageModel", AdminLocationLatLngModel);
const AdminStackNavigator = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.ADMIN_MAIN}
      theme={{
        colors: {
          primary: "rbg(255,255,255)",
          background: "white",
        },
      }}
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
        name={ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT_DEACTIVATE}
        component={AdminAccountDeactivateScreen}
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
        name={ROUTE_NAMES.ADMIN_CATCH_REPORT_DETAIL}
        component={AdminReportCatchDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.MEDIA_SELECTOR}
        component={MediaSelectScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT}
        component={AdminBlacklistManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT_ADD}
        component={AdminBlacklistPhoneAddScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.LAKE_DETAIL}
        component={LakeDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_CATCH_DETAIL}
        component={AdminCatchReportDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_LOCATION_SUGGEST_MANAGEMENT}
        component={AdminSuggestedLocationManagementScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_LOCATION_SUGGEST_DETAIL}
        component={AdminSuggestedLocationDetailScreen}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.ADMIN_CREATE_SUGGEST_LOCATION}
        component={AdminCreateSuggestLocation}
      />
      <AdminStack.Screen
        name={ROUTE_NAMES.FMANAGE_LOCATION_PICK}
        component={FManagePickLocationScreen}
      />
    </AdminStack.Navigator>
  );
};

export default AdminStackNavigator;
