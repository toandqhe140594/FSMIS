// eslint-disable-next-line import/no-unresolved
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import LakeListViewRoute from "../components/FLocationOverviewScreenComponents/LakeListViewRoute";
import OverviewInformationRoute from "../components/FLocationOverviewScreenComponents/OverviewInformationRoute";
import ReviewListRoute from "../components/FLocationOverviewScreenComponents/ReviewListRoute";

const Tab = createBottomTabNavigator();

const FishingSpotDetailScreen = () => {
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
      <Tab.Screen name="Thông tin" component={OverviewInformationRoute} />
      <Tab.Screen name="Loại hồ" component={LakeListViewRoute} />
      <Tab.Screen name="Đánh giá" component={ReviewListRoute} />
      <Tab.Screen name="Sự kiện" component={OverviewInformationRoute} />
    </Tab.Navigator>
  );
};

export default FishingSpotDetailScreen;
