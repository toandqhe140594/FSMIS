import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import FManageAddNewScreen from "../screens/FManageAddNewScreen";
import FManageCatchReportHistory from "../screens/FManageCatchReportHistory";
import FManageCheckinHistoryScreen from "../screens/FManageCheckinHistory";
import FManageEditProfileScreen from "../screens/FManageEditProfileScreen";
import FManageEmployeeAddScreen from "../screens/FManageEmployeeAddScreen";
import FManageEmployeeDetailScreen from "../screens/FManageEmployeeDetailScreen";
import FManageEmployeeManagementScreen from "../screens/FManageEmployeeManagementScreen";
import FManageFishAddScreen from "../screens/FManageFishAddScreen";
import FManageFishLocationPostScreen from "../screens/FManageFishLocationPostScreen";
import FManageHomeScreen from "../screens/FManageHomeScreen";
import FManageLakeAddNewScreen from "../screens/FManageLakeAddNewScreen";
import FManageLakeEditProfileScreen from "../screens/FManageLakeEditProfileScreen";
import FManageLakeManagementScreen from "../screens/FManageLakeManagementScreen";
import FManageLakeProfileScreen from "../screens/FManageLakeProfileScreen";
import FManagePickLocationScreen from "../screens/FManagePickLocationScreen";
import FManagePostCreateScreen from "../screens/FManagePostCreateScreen";
import FManagePostEditScreen from "../screens/FManagePostEditScreen";
import FManageScanQRCodeScreen from "../screens/FManageScanQRCodeScreen";
import FManageSelectScreen from "../screens/FManageSelectScreen";
import FManageSuggestLocationScreen from "../screens/FManageSuggestLocationScreen";
import FManageVerifyCatchReportDetailScreen from "../screens/FManageVerifyCatchReportDetailScreen";
import FManageVerifyCatchReportScreen from "../screens/FManageVerifyCatchReportScreen";
import FManageVerifyCheckinScreen from "../screens/FManageVerifyCheckinScreen";

const ManageStack = createNativeStackNavigator();
const ManageNavigator = () => {
  return (
    <ManageStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.FMANAGE_SELECTOR}
    >
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_SELECTOR}
        component={FManageSelectScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LOCATION_SUGGEST}
        component={FManageSuggestLocationScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_MAIN}
        component={FManageHomeScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW}
        component={FManageAddNewScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_PROFILE_EDIT}
        component={FManageEditProfileScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LOCATION_PICK}
        component={FManagePickLocationScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LAKE_MANAGEMENT}
        component={FManageLakeManagementScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LAKE_PROFILE}
        component={FManageLakeProfileScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LAKE_ADD}
        component={FManageLakeAddNewScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LAKE_EDIT}
        component={FManageLakeEditProfileScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_LAKE_FISH_ADD}
        component={FManageFishAddScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_STAFF_MANAGEMENT}
        component={FManageEmployeeManagementScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_STAFF_ADD}
        component={FManageEmployeeAddScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_STAFF_DETAIL}
        component={FManageEmployeeDetailScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_CATCH_HISTORY}
        component={FManageCatchReportHistory}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_CATCH_VERIFY}
        component={FManageVerifyCatchReportScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_CATCH_DETAIL}
        component={FManageVerifyCatchReportDetailScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_QR_SCAN}
        component={FManageScanQRCodeScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_CHECKIN_VERIFY}
        component={FManageVerifyCheckinScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_CHECKIN_HISTORY}
        component={FManageCheckinHistoryScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_POST_MANAGEMENT}
        component={FManageFishLocationPostScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_POST_EDIT}
        component={FManagePostEditScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FMANAGE_POST_CREATE}
        component={FManagePostCreateScreen}
      />
    </ManageStack.Navigator>
  );
};
export default ManageNavigator;
