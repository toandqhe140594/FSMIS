import { Box, Image, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const FishInformationCard = ({
  amount,
  currentAmount,
  currentWeight,
  image,
  name,
  totalWeight,
  weightRange,
  overview,
}) => {
  return (
    <Box flexDirection="row" py={1} bg="white" pl={3} alignItems="center">
      <Image
        alt="LW"
        size={100}
        mr={3}
        source={{
          uri: image,
        }}
        resizeMode="contain"
        key={image}
      />
      <Box flex={1} ml={3}>
        <Text bold fontSize="lg">
          {name}
        </Text>
        {overview ? (
          <>
            <Text>Biểu: {weightRange}kg</Text>
            <Text>Số lượng hiện tại: {currentAmount} con</Text>
            <Text>Tổng khối lượng ước tính: {currentWeight}kg</Text>
          </>
        ) : (
          <>
            {amount ? <Text>Số lượng: {amount} con</Text> : null}
            <Text>Tổng khối lượng ước tính: {totalWeight} kg</Text>
          </>
        )}
      </Box>
    </Box>
  );
};

FishInformationCard.propTypes = {
  amount: PropTypes.number,
  currentAmount: PropTypes.number,
  currentWeight: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  totalWeight: PropTypes.number,
  weightRange: PropTypes.string,
  overview: PropTypes.bool,
};
FishInformationCard.defaultProps = {
  overview: false,
  image: "https://picsum.photos/200",
  amount: 0,
  totalWeight: 0,
  currentAmount: 0,
  currentWeight: 0,
  weightRange: "",
};

export default FishInformationCard;
