import { Box, Image, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const FishCard = ({ image, fishType, quantity, totalWeight }) => {
  const defaultWeight = "kg";
  const defaultQuantity = "con";

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      borderBottomWidth="0.5"
      backgroundColor="white"
    >
      <Image
        ml={3}
        alt="LW"
        my={1}
        py={0.5}
        resizeMode="contain"
        size="lg"
        w="150"
        h="110"
        source={{
          uri: image,
        }}
        key={image}
      />

      <Box flex={1} my={3} mx={4}>
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
FishCard.propTypes = {
  image: PropTypes.string,
  fishType: PropTypes.string,
  quantity: PropTypes.string,
  totalWeight: PropTypes.string,
};
FishCard.defaultProps = {
  image: "https://picsum.photos/200",
  fishType: "Test",
  quantity: "0",
  totalWeight: "0",
};

export default FishCard;
