import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

import EventListRoute from "../components/AdminOverviewScreenComponents/EventListRoute";
import LakeListViewRoute from "../components/AdminOverviewScreenComponents/LakeListViewRoute";
import OverviewInformationRoute from "../components/AdminOverviewScreenComponents/OverviewInformationRoute";
import ReviewListRoute from "../components/AdminOverviewScreenComponents/ReviewListRoute";
import HeaderWithButton from "../components/HeaderWithButton";
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
  const getLocationOverviewById = useStoreActions(
    (actions) => actions.LocationModel.getLocationOverviewById,
  );
  const setLakeList = useStoreActions(
    (actions) => actions.LocationModel.setLakeList,
  );

  useEffect(() => {
    if (route.params) {
      const { id } = route.params;
      setCurrentId(id);
      getLocationOverviewById({ id });
    }
    return () => {
      setLakeList(null);
    };
  }, []);

  const { id, name, verify } = locationOverview;

  return (
    <>
      <HeaderWithButton
        id={id}
        name={name || route.params.name}
        isVerified={verify}
        buttonName={verify ? "Hủy xác thực" : "Xác thực"}
        onSuccess={() => {
          console.log(id);
        }}
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
