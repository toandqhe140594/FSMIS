import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

import styles from "../config/styles";
import { goToFishingLocationOverviewScreen } from "../navigations";
import FLocationMarker from "./FLocationMarker";

export default function FLocationMapView({ coordinates, locationList }) {
  const navigation = useNavigation();
  const [marginTop, setMarginTop] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      setMarginTop(0);
    }, 50);
  }, []);

  const openLocationDetail = (id) => () => {
    goToFishingLocationOverviewScreen(navigation, { id });
  };

  return (
    <View style={styles.flexBox}>
      <MapView
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={MapView.PROVIDER_GOOGLE}
        mapType="standard"
        style={[styles.map, { marginTop }]}
        showsUserLocation
        showsMyLocationButton
      >
        {locationList &&
          locationList.map((location) => (
            <FLocationMarker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              fishingSpot={{
                name: location.name,
                rate: location.score,
                isVerified: location.verify,
                id: location.id,
              }}
              onPress={openLocationDetail(location.id)}
              key={location.id}
            />
          ))}
      </MapView>
    </View>
  );
}
FLocationMapView.propTypes = {
  coordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  locationList: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
      rate: PropTypes.number,
      isVerified: PropTypes.bool,
    }),
  ).isRequired,
};
