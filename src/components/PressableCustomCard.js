import { Box, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const PressableCustomCard = ({ paddingX, paddingY, onPress, ...props }) => {
  return (
    <Pressable onPress={onPress}>
      {({ isHovered, isPressed }) => {
        let bgStyle = "rgba(0,0,0,0)";
        if (isPressed) bgStyle = "muted.300";
        else if (isHovered) bgStyle = "cyan.400";

        return (
          <Box bg={bgStyle} px={paddingX} py={paddingY}>
            {props.children}
          </Box>
        );
      }}
    </Pressable>
  );
};
PressableCustomCard.propTypes = {
  paddingX: PropTypes.string,
  paddingY: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.element,
};

PressableCustomCard.defaultProps = {
  paddingX: "0",
  paddingY: "0",
  onPress: () => {},
  children: null,
};

export default PressableCustomCard;
