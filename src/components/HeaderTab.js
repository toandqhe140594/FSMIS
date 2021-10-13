import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Box, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const HeaderTab = ({ name, isVerified, flagable }) => {
  return (
    <Box
      style={{ height: 40 }}
      bg="white"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      px={4}
    >
      <Ionicons name="arrow-back" size={24} color="black" />
      <Box flexDir="row" alignItems="center">
        <Text bold fontSize="lg" mr={2}>
          {name}
        </Text>
        {isVerified && <MaterialIcons name="verified" color="blue" size={16} />}
      </Box>
      <Ionicons
        name="flag"
        size={24}
        color={flagable ? "black" : "rgba(0,0,0,0)"}
      />
    </Box>
  );
};

HeaderTab.propTypes = {
  name: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  flagable: PropTypes.bool,
};
HeaderTab.defaultProps = {
  isVerified: false,
  flagable: false,
};

export default HeaderTab;
