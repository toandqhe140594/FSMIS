import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useStoreState } from "easy-peasy";
import React from "react";

import EventListRoute from "../components/FManageOverviewScreenComponents/EventListRoute";
import LakeListViewRoute from "../components/FManageOverviewScreenComponents/LakeListViewRoute";
import OverviewInformationRoute from "../components/FManageOverviewScreenComponents/OverviewInformationRoute";
import ReviewListRoute from "../components/FManageOverviewScreenComponents/ReviewListRoute";
import HeaderTab from "../components/HeaderTab";

const Tab = createBottomTabNavigator();

const FishingSpotDetailScreen = () => {
  const locationDetails = useStoreState(
    (states) => states.FManageModel.locationDetails,
  );

  const { id, name, verify } = locationDetails;

  return (
    <>
      <HeaderTab id={id} name={name} isVerified={verify} flagable />
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
        <Tab.Screen name="Sự kiện" component={EventListRoute} />
      </Tab.Navigator>
    </>
  );
};

export default FishingSpotDetailScreen;
