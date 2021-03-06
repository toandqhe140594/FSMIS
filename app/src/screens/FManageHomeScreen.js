import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import CloseFLocationComponent from "../components/CloseFLocationComponent";
import CloseFLocationTemporaryComponent from "../components/CloseFLocationTemporaryComponent";
import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";
import colors from "../config/colors";
import {
  MENU_OWNER,
  MENU_STAFF,
  VIEW_ROLE_OWNER,
  VIEW_ROLE_STAFF,
} from "../constants";

const FManageHomeScreen = () => {
  const route = useRoute();

  const locationDetails = useStoreState(
    (states) => states.FManageModel.locationDetails,
  );
  const setLocationLatLng = useStoreActions(
    (actions) => actions.FManageModel.setLocationLatLng,
  );

  const {
    setCurrentId,
    getLocationDetailsById,
    getListOfLake,
    setLocationPostListFirstPage,
    resetLocationDetails,
  } = useStoreActions((actions) => actions.FManageModel);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (locationDetails.latitude && locationDetails.longitude) {
      setLocationLatLng({
        latitude: locationDetails.latitude,
        longitude: locationDetails.longitude,
      });
    }
  }, [locationDetails]);

  useEffect(() => {
    if (route.params) {
      const { id, role: paramRole } = route.params;
      setCurrentId(id);
      getLocationDetailsById({ id });
      getListOfLake({ id });
      setRole(paramRole);
    }
    return () => {
      setLocationLatLng({ latitude: null, longitude: null });
      setLocationPostListFirstPage([]);
      resetLocationDetails();
    };
  }, []);

  if (!role || !locationDetails.id)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size={60} color="#2089DC" />
      </Box>
    );

  return (
    <Box bg={colors.defaultBackground}>
      <HeaderTab
        id={locationDetails.id}
        name={locationDetails.name || "H??? c??u"}
        isVerified={locationDetails.verify || false}
      />

      <ScrollView maxHeight="97%">
        <VStack mt="1" mb="2">
          {role === VIEW_ROLE_OWNER && (
            <>
              {MENU_OWNER.map((item) => (
                <MenuScreen
                  menuListItem={item.category}
                  key={item.id}
                  locationId={locationDetails.id}
                />
              ))}
              <CloseFLocationTemporaryComponent
                name={locationDetails.name || "H??? c??u"}
                isClosed={locationDetails.closed || false}
                key={locationDetails.name}
              />
              <CloseFLocationComponent
                name={locationDetails.name || "H??? c??u"}
                phone={locationDetails.phone}
              />
            </>
          )}
          {role === VIEW_ROLE_STAFF && (
            <>
              {MENU_STAFF.map((item) => (
                <MenuScreen
                  menuListItem={item.category}
                  key={item.id}
                  locationId={locationDetails.id}
                />
              ))}
            </>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default FManageHomeScreen;
