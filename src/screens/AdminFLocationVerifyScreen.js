import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-elements";

import EventListRoute from "../components/AdminOverviewScreenComponents/EventListRoute";
import LakeListViewRoute from "../components/AdminOverviewScreenComponents/LakeListViewRoute";
import OverviewInformationRoute from "../components/AdminOverviewScreenComponents/OverviewInformationRoute";
import ReviewListRoute from "../components/AdminOverviewScreenComponents/ReviewListRoute";
import HeaderWithButton from "../components/HeaderWithButton";
import colors from "../config/colors";
import LocationModel from "../models/LocationModel";
import store from "../utilities/Store";

store.addModel("LocationModel", LocationModel);

const Tab = createBottomTabNavigator();

const FishingSpotDetailScreen = () => {
  const route = useRoute();
  const locationOverview = useStoreState(
    (states) => states.LocationModel.locationOverview,
  );
  const {
    setCurrentId,
    getLocationOverviewById,
    setLakeList,
    setLocationReviewList,
    setLocationOverview,
  } = useStoreActions((actions) => actions.LocationModel);
  const activateFishingLocation = useStoreActions(
    (actions) => actions.AdminFLocationModel.activateFishingLocation,
  );
  const verifyFishingLocation = useStoreActions(
    (actions) => actions.AdminFLocationModel.verifyFishingLocation,
  );

  const [verifyLoading, setVerifyLoading] = useState(false);
  const [activateLoading, setActivateLoading] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(null);
  const [activateSuccess, setActivateSuccess] = useState(null);
  const [active, setActive] = useState(true);
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { id } = route.params;
      setCurrentId(id);
      getLocationOverviewById({ id });
    }
    return () => {
      setLakeList(null);
      setLocationReviewList({ data: [], status: "Overwrite" });
      setLocationOverview({});
    };
  }, []);

  useEffect(() => {
    setActive(locationOverview.active);
    setVerify(locationOverview.verify);
  }, [locationOverview]);

  const activateFishingLocationButtonAction = (id) => () => {
    setActivateLoading(true);
    activateFishingLocation({
      id,
      setLoading: setActivateLoading,
      setSuccess: setActivateSuccess,
    });
  };

  const changeVerifyState = (id) => () => {
    setVerifyLoading(true);
    verifyFishingLocation({
      id,
      setLoading: setVerifyLoading,
      setSuccess: setVerifySuccess,
    });
  };

  useEffect(() => {
    if (verifySuccess === true) {
      setVerify(!verify);
      setVerifyLoading(false);
      setVerifySuccess(null);
    } else {
      setVerifySuccess(null);
      setVerifyLoading(false);
    }
    if (activateSuccess === true) {
      setActive(!active);
      setActivateLoading(false);
      setActivateSuccess(null);
    } else {
      setActivateSuccess(null);
      setActivateLoading(false);
    }
  }, [verifySuccess, activateSuccess]);

  const { id, name } = locationOverview;
  return (
    <>
      <HeaderWithButton
        id={id}
        name={name || route.params.name}
        isVerified={verify}
        buttonName={active ? "Vô hiệu hóa" : "Kích hoạt"}
        onSuccess={activateFishingLocationButtonAction(id)}
        isDanger={active}
        isLoading={activateLoading}
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
      <Button
        title={verify ? "Hủy xác thực" : "Xác thực"}
        buttonStyle={
          verify && {
            backgroundColor: colors.defaultDanger,
          }
        }
        onPress={changeVerifyState(id)}
        loading={verifyLoading}
      />
    </>
  );
};

export default FishingSpotDetailScreen;
