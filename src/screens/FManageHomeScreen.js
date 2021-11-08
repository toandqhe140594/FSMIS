import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import CloseFLocationComponent from "../components/CloseFLocationComponent";
import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";
import { MENU_OWNER, MENU_STAFF } from "../constants";

const FManageHomeScreen = ({ typeString }) => {
  const route = useRoute();

  const locationDetails = useStoreState(
    (states) => states.FManageModel.locationDetails,
  );
  const setLocationLatLng = useStoreActions(
    (actions) => actions.FManageModel.setLocationLatLng,
  );

  let menuCategory;
  if (typeString === "OWNER") {
    menuCategory = [...MENU_OWNER];
  }
  if (typeString === "STAFF") {
    menuCategory = [...MENU_STAFF];
  }

  const { setCurrentId, getLocationDetailsById, getListOfLake } =
    useStoreActions((actions) => actions.FManageModel);

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
      const { id } = route.params;
      setCurrentId(id);
      getLocationDetailsById({ id });
      getListOfLake({ id });
    }
    return () => {
      setLocationLatLng({ latitude: null, longitude: null });
    };
  }, []);

  return (
    <Box>
      <HeaderTab
        id={locationDetails.id}
        name={locationDetails.name || "Hồ câu"}
        isVerified={locationDetails.verify || false}
      />

      <ScrollView maxHeight="97%">
        <VStack mt="1" mb="2">
          {menuCategory.map((item) => {
            return <MenuScreen menuListItem={item.category} key={item.id} />;
          })}
          <CloseFLocationComponent name={locationDetails.name || "Hồ câu"} />
        </VStack>
      </ScrollView>
    </Box>
  );
};
FManageHomeScreen.defaultProps = { typeString: "OWNER" };
FManageHomeScreen.propTypes = { typeString: PropTypes.string };
export default FManageHomeScreen;
