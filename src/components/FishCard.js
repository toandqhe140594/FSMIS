import { Box, Image, Text } from "native-base";
// import PropTypes from "prop-types";
import React from "react";

// eslint-disable-next-line react/prop-types
const FishCard = ({ image, fishType, quantity, totalWeight }) => {
  const defaultWeight = "kg";
  const defaultQuantity = "con";

  return (
    <Box flexDirection="row" alignItems="center">
      <Image
        alt="LW"
        m={1}
        size={110}
        source={{
          uri: image,
        }}
      />
      <Box flex={1} my={3} mr={3}>
        <Text bold fontSize="md" mb={1}>
          {fishType}
        </Text>

        <Text fontSize="sm">
          Số lượng: {quantity} {defaultQuantity}
        </Text>

        <Text fontSize="sm">
          Tổng khối lượng: {totalWeight} {defaultWeight}
        </Text>
      </Box>
    </Box>
  );
};
// FishCard.propTypes = {
//   image: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   listOfFishes: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
FishCard.defaultProps = {
  image: "https://picsum.photos/200",
  fishType: "Test",
  quantity: "0",
  totalWeight: "0",
};

export default FishCard;
