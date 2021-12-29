import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

import EventListRoute from "../components/FLocationOverviewScreenComponents/EventListRoute";
import LakeListViewRoute from "../components/FLocationOverviewScreenComponents/LakeListViewRoute";
import OverviewInformationRoute from "../components/FLocationOverviewScreenComponents/OverviewInformationRoute";
import ReviewListRoute from "../components/FLocationOverviewScreenComponents/ReviewListRoute";
import HeaderTab from "../components/HeaderTab";
import { VIEW_ROLE_ANGLER } from "../constants";
import LocationModel from "../models/LocationModel";
import store from "../utilities/Store";

store.addModel("LocationModel", LocationModel);

const Tab = createBottomTabNavigator();

const FishingSpotDetailScreen = () => {
  const route = useRoute();
  const locationOverview = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );
  const setCurrentId = useStoreActions(
    (actions) => actions.LocationModel.setCurrentId,
  );
  const resetLocationModel = useStoreActions(
    (actions) => actions.LocationModel.reset,
  );
  const {
    getLocationOverviewById,
    getCheckinStatus,
    setLocationOverview,
    setLocationReviewList,
    resetPersonalReview,
  } = useStoreActions((actions) => actions.LocationModel);

  useEffect(() => {
    if (route.params && route.params.id) {
      const { id } = route.params;
      setCurrentId(id);
      getLocationOverviewById({ id });
      getCheckinStatus();
    }
    return () => {
      resetPersonalReview();
      setLocationReviewList({ data: [], status: "Overwrite" });
      setLocationOverview({});
      resetLocationModel();
    };
  }, []);

  const { id, name, verify, role } = locationOverview;

  return (
    <>
      <HeaderTab
        id={id}
        name={name}
        isVerified={verify}
        flagable={role === VIEW_ROLE_ANGLER}
      />
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
