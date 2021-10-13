import { Box, Image, Text } from "native-base";
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
    <Box flexDirection="row" mt={3}>
      <Image
        alt="LW"
        size={90}
        mr={3}
        source={{
          uri: image || "https://picsum.photos/200",
        }}
      />
      <Box flex={1}>
        <Text bold fontSize="md">
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
            {amount && <Text>Số lượng: {amount} con</Text>}
            <Text>Tổng khối lượng ước tính: {totalWeight} kg</Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FishInformationCard;
