import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Menu, Pressable } from "native-base";
import React, { useEffect, useState } from "react";

import EventListRoute from "../components/AdminOverviewScreenComponents/EventListRoute";
import LakeListViewRoute from "../components/AdminOverviewScreenComponents/LakeListViewRoute";
import OverviewInformationRoute from "../components/AdminOverviewScreenComponents/OverviewInformationRoute";
import ReviewListRoute from "../components/AdminOverviewScreenComponents/ReviewListRoute";
import HeaderTab from "../components/HeaderTab";
import LocationModel from "../models/LocationModel";
import { showAlertConfirmBox, showToastMessage } from "../utilities";
import store from "../utilities/Store";

store.addModel("LocationModel", LocationModel);

const Tab = createBottomTabNavigator();

const menuItemProps = {
  _text: {
    fontSize: 16,
  },
};
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
    const alertTitle = active ? "Hủy kích hoạt hồ câu?" : "Kích hoạt hồ câu?";
    const alertMessage = active
      ? `Hồ câu "${locationOverview.name}" sau khi bị vô hiệu hóa sẽ không còn hiển thị trên ứng dụng`
      : `Hồ câu "${locationOverview.name}" sau khi được kích hoạt sẽ hiển thị trên ứng dụng`;
    showAlertConfirmBox(alertTitle, alertMessage, () =>
      activateFishingLocation({
        id,
        setSuccess: setActivateSuccess,
      }),
    );
  };

  const changeVerifyState = (id) => () => {
    const alertTitle = verify ? "Hủy xác thực hồ câu?" : "Xác thực hồ câu?";
    const alertMessage = verify
      ? `Hồ câu "${locationOverview.name}" sau khi bị hủy xác thực sẽ không còn dấu tích xanh`
      : `Hồ câu "${locationOverview.name}" sau khi được xác thực sẽ được cấp dấu tích xanh`;
    showAlertConfirmBox(alertTitle, alertMessage, () =>
      verifyFishingLocation({
        id,
        setSuccess: setVerifySuccess,
      }),
    );
  };

  useEffect(() => {
    if (verifySuccess === true) {
      showToastMessage(
        verify ? "Hủy xác thực thành công" : "Xác thực hồ câu thành công",
      );
      setVerify(!verify);
      setVerifySuccess(null);
    } else {
      setVerifySuccess(null);
    }
    if (activateSuccess === true) {
      showToastMessage(
        active
          ? "Vô hiệu hóa hồ câu thành công"
          : "Kích hoạt hồ câu thành công",
      );
      setActive(!active);
      setActivateSuccess(null);
    } else {
      setActivateSuccess(null);
    }
  }, [verifySuccess, activateSuccess]);

  const { id, name } = locationOverview;
  return (
    <>
      <Box position="relative" justifyContent="center">
        <HeaderTab id={id} name={name} isVerified={verify} flagable={false} />
        <Box style={{ position: "absolute", right: 8 }}>
          <Menu
            w="150"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <MaterialCommunityIcons
                    color="black"
                    name="dots-vertical"
                    size={24}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item
              onPress={activateFishingLocationButtonAction(id)}
              {...menuItemProps}
            >
              {active ? "Vô hiệu hóa" : "Kích hoạt"}
            </Menu.Item>
            <Menu.Item onPress={changeVerifyState(id)} {...menuItemProps}>
              {verify ? "Hủy xác thực" : "Xác thực"}
            </Menu.Item>
          </Menu>
        </Box>
      </Box>
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
