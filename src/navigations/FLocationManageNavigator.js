import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import * as ROUTE_NAMES from "../config/routeNames";
import FishingSpotDetailScreen from "../screens/FLocationOverviewScreen";
import FManageCatchReportHistory from "../screens/FManageCatchReportHistory";
import EmployeeManagementScreen from "../screens/FManageEmployeeScreen";
import FLocationHomeManagementScreen from "../screens/FManageHomeScreen";
import LakeListManagementScreen from "../screens/FManagementListLakeScreen";
import VerifyCatchReportScreen from "../screens/FManageVerifyCatchReportScreen";
import ScanQRCodeScreen from "../screens/ScanQRCodeScreen";

const ManageStack = createNativeStackNavigator();
const ManageNavigator = () => {
  return (
    <ManageStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.PROFILE_MAIN}
    >
      <ManageStack.Screen
        name={ROUTE_NAMES.PROFILE_MAIN}
        component={FLocationHomeManagementScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_OVERVIEW}
        component={FishingSpotDetailScreen}
      />
      {/* <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_PROFILE_EDIT}
        component={FLocationHomeManagementScreen}
      /> */}
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_MANAGE_LAKE}
        component={LakeListManagementScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_MANAGE_STAFF}
        component={EmployeeManagementScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_CATCH_VERIFY}
        component={VerifyCatchReportScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_CATCH_HISTORY}
        component={FManageCatchReportHistory}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.LOCATION_QR_SCAN}
        component={ScanQRCodeScreen}
      />
      {/*       
      <ManageStack.Screen
        name={ROUTE_NAMES.LOCATION_CHECKIN_HISTORY}
        component={FLocationHomeManagementScreen}
      /> */}
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_MANAGE_POST}
        component={FLocationHomeManagementScreen}
      />
      <ManageStack.Screen
        name={ROUTE_NAMES.FLOCATION_CLOSE_FISHING_LOCATION}
        component={FLocationHomeManagementScreen}
      />
    </ManageStack.Navigator>
  );
};
export default ManageNavigator;
