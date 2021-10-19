import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Center, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Marker } from "react-native-maps";
import { Rating } from "react-native-ratings";

import { goToFishingLocationOverviewScreen } from "../navigations";

const SpotMarker = ({ coordinate, fishingSpot }) => {
  const navigation = useNavigation();
  return (
    <Marker
      coordinate={coordinate}
      onPress={() => {
        goToFishingLocationOverviewScreen(navigation, { id: fishingSpot.id });
      }}
    >
      <Center>
        <Box
          bg="white"
          borderColor="black"
          borderRadius={4}
          borderWidth={1}
          flexDir="row"
        >
          <Box padding={2} alignSelf="center">
            <Text>{fishingSpot.name}</Text>

            <Rating
              imageSize={16}
              ratingCount={5}
              readonly
              showRating={false}
              startingValue={fishingSpot.rate || 0}
            />
          </Box>
          {fishingSpot.isVerified && (
            <Center padding={1}>
              <MaterialIcons name="verified" color="blue" size={24} />
            </Center>
          )}
        </Box>
        <MaterialCommunityIcons name="map-marker" color="red" size={36} />
      </Center>
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
};

export default SpotMarker;
