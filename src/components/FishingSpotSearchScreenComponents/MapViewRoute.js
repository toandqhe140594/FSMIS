import { Ionicons } from "@expo/vector-icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as Location from "expo-location";
import { Button, Center, Text, ZStack } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import FLocationMapView from "../FLocationMapView";
import MapViewOverlay from "./MapViewOverlay";

const MapViewRoute = () => {
  const { locationList, currentLocation } = useStoreState(
    (states) => states.MapSearchModel,
  );
  const setCurrentLocation = useStoreActions(
    (actions) => actions.MapSearchModel.setCurrentLocation,
  );
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [visible, setVisible] = useState(false);
  const methods = useForm();

  // Show/hide overlay
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /**
   * Check and request access to location service from user
   * If permission granted, set location to current location of user
   */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      setPermissionGranted(true);
      let location = await Location.getLastKnownPositionAsync({});
      if (!location) location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  return (
    <>
      {currentLocation && (
        <Center flex={1}>
          <ZStack>
            <FLocationMapView
              coordinates={currentLocation}
              locationList={locationList}
            />
            <Button
              colorScheme="muted"
              position="absolute"
              left={3}
              top={3}
              onPress={toggleOverlay}
            >
              <Center flexDir="row">
                <Ionicons name="options" size={24} color="white" />
                <Text ml={2} color="white">
                  Bộ lọc
                </Text>
              </Center>
            </Button>
          </ZStack>
          <FormProvider {...methods}>
            <MapViewOverlay visible={visible} toggleOverlay={toggleOverlay} />
          </FormProvider>
        </Center>
      )}
      {!currentLocation && (
        <Center flex={1}>
          <Text textAlign="center" w="80%">
            {permissionGranted
              ? "Đang lấy thông tin vị trí"
              : "Ứng dụng cần quyền truy cập vào vị trí để sử dụng chức năng này"}
          </Text>
        </Center>
      )}
    </>
  );
};

export default MapViewRoute;
