import * as Location from "expo-location";
import { Box } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import HeaderWithButton from "../components/HeaderWithButton";
import { DEFAULT_LATLNG } from "../config/constants";

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});

const PickLocationScreen = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [markerCoords, setMarkerCoords] = useState(DEFAULT_LATLNG);

  /**
   * Check and request access to location service from user
   * If permission granted, set location to current location of user
   */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

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
      mapRef.current.fitToCoordinates([{ ...markerCoords }]);
    }
  }, [markerCoords]);

  return (
    <>
      <HeaderWithButton
        name="Chọn vị trí"
        buttonName="Chọn"
        onPress={() => {
          alert(`${markerCoords.latitude} ${markerCoords.longitude}`); // Test only
        }}
      />

      {/* Map view */}
      <Box flex={1} bg="red.100">
        <MapView
          ref={mapRef}
          mapType="standard"
          style={styles.map}
          initialRegion={{
            ...DEFAULT_LATLNG,
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
