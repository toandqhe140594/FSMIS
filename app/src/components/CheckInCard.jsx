import { Box, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const CheckInCard = ({ timeIn, timeOut, ...props }) => {
  return (
    <VStack space={2} alignItems="flex-start">
      {props.children}
      <Box>
        <Text>
          <Text bold> Thời gian Check-in: </Text>
          {timeIn}
        </Text>
        <Text>
          <Text bold> Thời gian Check-out: </Text>
          {timeOut}
        </Text>
      </Box>
    </VStack>
  );
};
CheckInCard.defaultProps = {
  timeIn: "0/0/0",
  timeOut: "0/0/0",
  children: null,
};
CheckInCard.propTypes = {
  timeIn: PropTypes.string,
  timeOut: PropTypes.string,
  children: PropTypes.element,
};

export default CheckInCard;
