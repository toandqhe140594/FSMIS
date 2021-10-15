/* eslint-disable no-nested-ternary */
import { Box, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const PressableCustomCard = ({ paddingX, paddingY, ...props }) => {
  return (
    <Pressable>
      {({ isHovered, isPressed }) => {
        return (
          <Box
            bg={
              isPressed ? "muted.300" : isHovered ? "cyan.400" : "rgba(0,0,0,0)"
            }
            px={paddingX}
            py={paddingY}
          >
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
  children: PropTypes.element,
};

PressableCustomCard.defaultProps = {
  paddingX: "0",
  paddingY: "0",
  children: null,
};

export default PressableCustomCard;
