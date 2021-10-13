import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-native-elements";
import { Rating } from "react-native-ratings";

import { goToFishingLocationOverviewScreen } from "../navigations";

const SpotCard = ({ address, image, isVerifed, name, rate }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        goToFishingLocationOverviewScreen(navigation);
      }}
    >
      <Card containerStyle={{ width: "100%", padding: 0, margin: 0 }}>
        <Card.Image source={{ uri: image }} />
        <VStack mt={1} mb={1} ml={2} space={1}>
          <Box flexDir="row" alignItems="center">
            <Text bold fontSize="lg" mr={2}>
              {name}
            </Text>
            {isVerifed && (
              <MaterialIcons name="verified" color="blue" size={16} />
            )}
          </Box>
          <Box>
            <Rating
              style={{ alignSelf: "flex-start" }}
              imageSize={18}
              ratingCount={5}
              readonly
              showRating={false}
              startingValue={rate}
            />
          </Box>
          <Text>{address}</Text>
        </VStack>
      </Card>
    </Pressable>
  );
};

SpotCard.propTypes = {
  address: PropTypes.string.isRequired,
  image: PropTypes.string,
  isVerifed: PropTypes.bool,
  name: PropTypes.string.isRequired,
  rate: PropTypes.number,
};
SpotCard.defaultProps = {
  image: "https://picsum.photos/200",
  isVerifed: false,
  rate: 0,
};

export default SpotCard;