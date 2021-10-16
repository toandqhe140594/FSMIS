import { Box } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import MapView from "react-native-maps";

import styles from "../config/styles";
import FLocationMarker from "./FLocationMarker";

export default function FLocationMapView({ coordinates }) {
  return (
    <Box flex={1}>
      <MapView
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        style={styles.map}
      >
        <FLocationMarker
          coordinate={{
            latitude: 21.038793470613445,
            longitude: 105.83590283070224,
          }}
          fishingSpot={{
            name: "Hồ câu thuần việt",
            rate: 4.4,
            isVerified: false,
          }}
        />
        <FLocationMarker
          coordinate={{
            latitude: 21.03517331108639,
            longitude: 105.85090718809838,
          }}
          fishingSpot={{ name: "Hồ Ngọc Bích", rate: 3.4, isVerified: true }}
        />
        <FLocationMarker
          coordinate={{
            latitude: 21.021549290938946,
            longitude: 105.83967943749226,
          }}
          fishingSpot={{ name: "Hồ câu oh yeah", rate: 1.5, isVerified: false }}
        />
      </MapView>
    </Box>
  );
}
FLocationMapView.propTypes = {
  coordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};
