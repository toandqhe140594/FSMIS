import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Card } from "react-native-elements";
import { Rating } from "react-native-ratings";

import {
  goToAdminFLocationOverviewScreen,
  goToFishingLocationOverviewScreen,
  goToFManageMainScreen,
} from "../navigations";

const SpotCard = ({
  id,
  address,
  image,
  isVerifed,
  name,
  rate,
  isManaged,
  isAdmin,
  showImage,
}) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (isManaged)
      goToFManageMainScreen(navigation, { id, name, isVerified: isVerifed });
    else if (isAdmin) goToAdminFLocationOverviewScreen(navigation, { id });
    else goToFishingLocationOverviewScreen(navigation, { id });
  };

  return (
    <Pressable onPress={() => onPress()}>
      <Card containerStyle={{ width: "100%", padding: 0, margin: 0 }}>
        {showImage && <Card.Image source={{ uri: image }} />}
        <VStack mt={1.5} mb={2} ml={3} space={1.5}>
          <Box>
            <Box flexDir="row" alignItems="center">
              <Text bold fontSize="18" mr={2}>
                {name}
              </Text>
              {isVerifed && (
                <MaterialIcons name="verified" color="blue" size={16} />
              )}
            </Box>
            <Rating
              style={{ alignSelf: "flex-start" }}
              imageSize={15}
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
  isManaged: PropTypes.bool,
  id: PropTypes.number,
  showImage: PropTypes.bool,
  isAdmin: PropTypes.bool,
};
SpotCard.defaultProps = {
  image: "https://picsum.photos/200",
  isVerifed: false,
  rate: 0,
  isManaged: false,
  id: 1,
  showImage: true,
  isAdmin: false,
};

export default SpotCard;
