import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as Location from "expo-location";
import { Box } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";

import HeaderWithButton from "../components/HeaderWithButton";
import styles from "../config/styles";
import { DEFAULT_LATLNG } from "../constants";
import { goBack } from "../navigations";

const PickLocationScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [markerCoords, setMarkerCoords] = useState(DEFAULT_LATLNG);

  const locationLatLng = useStoreState(
    (states) => states.FManageModel.locationLatLng,
  );

  const setLocationLatLng = useStoreActions(
    (actions) => actions.FManageModel.setLocationLatLng,
  );

  /**
   * Check and request access to location service from user
   * If permission granted, set location to current location of user
   */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      if (
        locationLatLng &&
        locationLatLng.longitude &&
        locationLatLng.latitude
      ) {
        setLocation({ coords: locationLatLng });
        return;
      }

      let currentLocation = await Location.getLastKnownPositionAsync({});
      if (!currentLocation)
        currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  // Mark user current location
  useEffect(() => {
    if (location) {
      const { longitude, latitude } = location.coords;
      setMarkerCoords({ longitude, latitude });
    }
  }, [location]);

  // Zoom to user current location
  useEffect(() => {
    if (!location) return;
    const { longitude, latitude } = location.coords;
    if (
      longitude === markerCoords.longitude &&
      latitude === markerCoords.latitude
    ) {
      mapRef.current.animateToRegion(
        {
          latitude: markerCoords.latitude,
          longitude: markerCoords.longitude,
          latitudeDelta: 0.026,
          longitudeDelta: 0.027,
        },
        1000,
      );
    }
  }, [markerCoords]);

  const headerButtonOnPress = () => {
    setLocationLatLng(markerCoords);
    goBack(navigation);
  };

  return (
    <>
      <HeaderWithButton
        name="Chọn vị trí"
        buttonName="Chọn"
        onSuccess={headerButtonOnPress}
      />

      {/* Map view */}
      <Box flex={1} bg="red.100">
        <MapView
          ref={mapRef}
          mapType="standard"
          style={styles.map}
          initialRegion={{
            latitude: locationLatLng.latitude
              ? locationLatLng.latitude
              : DEFAULT_LATLNG.latitude,
            longitude: locationLatLng.longitude
              ? locationLatLng.longitude
              : DEFAULT_LATLNG.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            setMarkerCoords({ ...e.nativeEvent.coordinate });
          }}
        >
          <Marker coordinate={markerCoords} />
        </MapView>
      </Box>
    </>
  );
};

export default PickLocationScreen;
