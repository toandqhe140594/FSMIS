import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box } from "native-base";
import React, { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { DEFAULT_LATLNG } from "../../constants";
import { goToFManageLocationPickScreen } from "../../navigations";

const styles = StyleSheet.create({
  mapviewContainer: { borderColor: "black", borderWidth: 1 },
});

const MapOverviewBox = () => {
  const navigation = useNavigation();

  const mapRef = useRef(null);

  const locationLatLng = useStoreState(
    (states) => states.FManageModel.locationLatLng,
  );

  return (
    <TouchableOpacity
      onPress={() => {
        goToFManageLocationPickScreen(navigation);
      }}
    >
      <Box h="150" style={styles.mapviewContainer}>
        {!locationLatLng.latitude && (
          <MapView
            ref={mapRef}
            initialRegion={{
              latitude: DEFAULT_LATLNG.latitude,
              longitude: DEFAULT_LATLNG.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{ height: "100%", width: "100%" }}
            liteMode
          />
        )}
        {locationLatLng.latitude && (
          <MapView
            ref={mapRef}
            region={{
              latitude: locationLatLng.latitude,
              longitude: locationLatLng.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{ height: "100%", width: "100%" }}
            liteMode
          >
            <Marker
              coordinate={{
                latitude: locationLatLng.latitude,
                longitude: locationLatLng.longitude,
              }}
            />
          </MapView>
        )}
      </Box>
    </TouchableOpacity>
  );
};

export default MapOverviewBox;
