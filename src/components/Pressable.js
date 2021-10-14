/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Box, Pressable } from "native-base";
import React from "react";

const PressableCustom = ({ paddingX, paddingY, ...props }) => {
  return (
    <Pressable>
      {({ isHovered, isPressed }) => {
        return (
          <Box
            bg={
              isPressed ? "muted.300" : isHovered ? "cyan.400" : "rgba(0,0,0,0)"
            }
            style={{ width: "100%" }}
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
export default PressableCustom;
