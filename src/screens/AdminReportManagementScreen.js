import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import FLocationReportRoute from "../components/ReportManagement/FLocationReportRoute";
import PostReportRoute from "../components/ReportManagement/PostReportRoute";
import ReviewReportRoute from "../components/ReportManagement/ReviewReportRoute";

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
      <Tab.Screen name="Báo cáo điểm câu" component={FLocationReportRoute} />
      <Tab.Screen name="Báo cáo đánh giá" component={ReviewReportRoute} />
      <Tab.Screen name="Báo cáo bài đăng" component={PostReportRoute} />
    </Tab.Navigator>
  );
};

export default AdminReportManagementScreen;
