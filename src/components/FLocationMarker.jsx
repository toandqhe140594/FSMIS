import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { Marker } from "react-native-maps";
import { Rating } from "react-native-ratings";
import { Image, Svg } from "react-native-svg";

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  locationInfoContainer: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 2,
    borderWidth: 1,
    flexDirection: "row",
  },
  padding4: {
    padding: 4,
  },
  svgMargin: {
    marginTop: 2,
  },
});

const verificationIconContainer = StyleSheet.compose(
  styles.center,
  styles.padding4,
);

const SpotMarker = ({ coordinate, fishingSpot, onPress }) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={styles.center}>
        <View style={styles.locationInfoContainer}>
          <View style={{ alignSelf: "center", padding: 2 }}>
            <Text>{fishingSpot.name}</Text>

            <View>
              <Rating
                imageSize={16}
                ratingCount={5}
                readonly
                showRating={false}
                startingValue={fishingSpot.rate || 0}
              />
            </View>
          </View>
          {fishingSpot.isVerified && (
            <View style={verificationIconContainer}>
              <Icon name="verified" type="material" color="blue" size={16} />
            </View>
          )}
        </View>
        <Svg height="36" width="36" style={styles.svgMargin}>
          <Image
            href={require("../assets/icons/marker.png")}
            width="100%"
            height="100%"
          />
        </Svg>
      </View>
    </Marker>
  );
};

SpotMarker.propTypes = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  fishingSpot: PropTypes.shape({
    name: PropTypes.string,
    rate: PropTypes.number,
    isVerified: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SpotMarker;
