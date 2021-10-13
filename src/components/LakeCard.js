import { Box, Image, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const LakeCard = ({ image, listOfFishes, name }) => {
  return (
    <Box borderWidth={1} flexDirection="row">
      <Image
        alt="LW"
        m={3}
        size={100}
        source={{
          uri: image,
        }}
      />
      <Box flex={1} my={3} mr={3}>
        <Text bold fontSize="md">
          {name}
        </Text>
        <Text fontSize="sm" noOfLines={2} isTruncated>
          Các loại cá: {listOfFishes.join(", ")}
        </Text>
        <Text underline position="absolute" bottom={0} right={0}>
          Xem thêm
        </Text>
      </Box>
    </Box>
  );
};
LakeCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  listOfFishes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
LakeCard.defaultProps = {
  image: "https://picsum.photos/200",
};

export default LakeCard;
