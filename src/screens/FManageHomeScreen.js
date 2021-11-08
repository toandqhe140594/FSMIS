import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import CloseFLocationComponent from "../components/CloseFLocationComponent";
import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";
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

  const { setCurrentId, getLocationDetailsById, getListOfLake } =
    useStoreActions((actions) => actions.FManageModel);
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
    };
  }, []);

  if (!role)
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="blue" />
      </Box>
    );

  return (
    <Box>
      <HeaderTab
        id={locationDetails.id}
        name={locationDetails.name || "Hồ câu"}
        isVerified={locationDetails.verify || false}
      />

      <ScrollView maxHeight="97%">
        <VStack mt="1" mb="2">
          {role === VIEW_ROLE_OWNER && (
            <>
              {MENU_OWNER.map((item) => (
                <MenuScreen menuListItem={item.category} key={item.id} />
              ))}
              <CloseFLocationComponent
                name={locationDetails.name || "Hồ câu"}
              />
            </>
          )}
          {role === VIEW_ROLE_STAFF && (
            <>
              {MENU_STAFF.map((item) => (
                <MenuScreen menuListItem={item.category} key={item.id} />
              ))}
            </>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default FManageHomeScreen;
