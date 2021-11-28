import { useNavigation } from "@react-navigation/native";
import { Box, Image, Pressable, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import {
  goToFManageLakeProfileScreen,
  goToLakeDetailScreen,
} from "../navigations";

const LakeCard = ({ id, image, listOfFishes, name, isManaged }) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (isManaged) goToFManageLakeProfileScreen(navigation, { id });
    else goToLakeDetailScreen(navigation, { id });
  };

  return (
    <Pressable onPress={onPress}>
      <Box borderWidth={1} flexDirection="row">
        <Image
          alt="LW"
          m={3}
          size={100}
          source={{
            uri: image,
          }}
          key={image}
        />
        <Box
          flex={1}
          my={3}
          mr={3}
          justifyContent={listOfFishes.length > 0 ? "flex-start" : "center"}
        >
          <Text bold fontSize="md">
            {name}
          </Text>
          {listOfFishes.length > 0 && (
            <>
              <Text fontSize="sm" noOfLines={2} isTruncated>
                Các loại cá: {listOfFishes.join(", ")}
              </Text>
              <Text underline position="absolute" bottom={0} right={0}>
                Xem thêm
              </Text>
            </>
          )}
        </Box>
      </Box>
    </Pressable>
  );
};
LakeCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  listOfFishes: PropTypes.arrayOf(PropTypes.string),
  isManaged: PropTypes.bool,
  id: PropTypes.number.isRequired,
};
LakeCard.defaultProps = {
  image: "https://picsum.photos/200",
  listOfFishes: [],
  isManaged: false,
};

export default LakeCard;
