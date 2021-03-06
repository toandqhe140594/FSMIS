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
    const alertTitle = active ? "H???y k??ch ho???t h??? c??u?" : "K??ch ho???t h??? c??u?";
    const alertMessage = active
      ? `H??? c??u "${locationOverview.name}" sau khi b??? v?? hi???u h??a s??? kh??ng c??n hi???n th??? tr??n ???ng d???ng`
      : `H??? c??u "${locationOverview.name}" sau khi ???????c k??ch ho???t s??? hi???n th??? tr??n ???ng d???ng`;
    showAlertConfirmBox(alertTitle, alertMessage, () =>
      activateFishingLocation({
        id,
        setSuccess: setActivateSuccess,
      }),
    );
  };

  const changeVerifyState = (id) => () => {
    const alertTitle = verify ? "H???y x??c th???c h??? c??u?" : "X??c th???c h??? c??u?";
    const alertMessage = verify
      ? `H??? c??u "${locationOverview.name}" sau khi b??? h???y x??c th???c s??? kh??ng c??n d???u t??ch xanh`
      : `H??? c??u "${locationOverview.name}" sau khi ???????c x??c th???c s??? ???????c c???p d???u t??ch xanh`;
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
        verify ? "H???y x??c th???c th??nh c??ng" : "X??c th???c h??? c??u th??nh c??ng",
      );
      setVerify(!verify);
      setVerifySuccess(null);
    } else {
      setVerifySuccess(null);
    }
    if (activateSuccess === true) {
      showToastMessage(
        active
          ? "V?? hi???u h??a h??? c??u th??nh c??ng"
          : "K??ch ho???t h??? c??u th??nh c??ng",
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
              {active ? "V?? hi???u h??a" : "K??ch ho???t"}
            </Menu.Item>
            <Menu.Item onPress={changeVerifyState(id)} {...menuItemProps}>
              {verify ? "H???y x??c th???c" : "X??c th???c"}
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
        <Tab.Screen name="Th??ng tin" component={OverviewInformationRoute} />
        <Tab.Screen name="Lo???i h???" component={LakeListViewRoute} />
        <Tab.Screen name="????nh gi??" component={ReviewListRoute} />
        <Tab.Screen name="S??? ki???n" component={EventListRoute} />
      </Tab.Navigator>
    </>
  );
};

export default FishingSpotDetailScreen;
