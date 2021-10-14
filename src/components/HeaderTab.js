import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Pressable, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import { goBack, goToWriteReportScreen } from "../navigations";

const HeaderTab = ({ name, isVerified, flagable }) => {
  const navigation = useNavigation();

  return (
    <Box
      style={{ height: 40 }}
      bg="white"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      px={4}
    >
      <Pressable
        onPress={() => {
          goBack(navigation);
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Box flexDir="row" alignItems="center">
        <Text bold fontSize="lg" mr={2}>
          {name}
        </Text>
        {isVerified && <MaterialIcons name="verified" color="blue" size={16} />}
      </Box>
      <Pressable
        onPress={() => {
          goToWriteReportScreen(navigation);
        }}
      >
        <Ionicons
          name="flag"
          size={24}
          color={flagable ? "black" : "rgba(0,0,0,0)"}
        />
      </Pressable>
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
