import { Box } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";

import styles from "../config/styles";
import FLocationMarker from "./FLocationMarker";

export default function FLocationMapView({ coordinates, locationList }) {
  const [marginTop, setMarginTop] = useState(-1);
  useEffect(() => {
    setTimeout(() => {
      setMarginTop(0);
    }, 50);
  }, []);
  return (
    <Box flex={1}>
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
        showsCompass
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
                rate: location.rating,
                isVerified: location.verify,
                id: location.id,
              }}
              key={location.id}
            />
          ))}
      </MapView>
    </Box>
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
