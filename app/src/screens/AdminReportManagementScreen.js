import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import FLocationReportRoute from "../components/ReportManagement/FLocationReportRoute";
import PostReportRoute from "../components/ReportManagement/PostReportRoute";
import ReportCatchRoute from "../components/ReportManagement/ReportCatchRoute";
import ReviewReportRoute from "../components/ReportManagement/ReviewReportRoute";
import ReportModel from "../models/ReportModel";
import store from "../utilities/Store";

store.addModel("ReportModel", ReportModel);

const Tab = createBottomTabNavigator();

const AdminReportManagementScreen = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarShowLabel: true,
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Điểm câu" component={FLocationReportRoute} />
      <Tab.Screen name="Đánh giá" component={ReviewReportRoute} />
      <Tab.Screen name="Bài đăng" component={PostReportRoute} />
      <Tab.Screen name="Báo cá" component={ReportCatchRoute} />
    </Tab.Navigator>
  );
};

export default AdminReportManagementScreen;
