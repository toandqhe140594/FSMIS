import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Divider, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Text } from "react-native-elements";

import styles from "../config/styles";
import { goBack, goToWriteReportScreen } from "../navigations";

const HeaderTab = ({ name, isVerified, flagable, id }) => {
  const navigation = useNavigation();

  return (
    <>
      <Box
        style={{ height: 40 }}
        bg="white"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        w="100%"
      >
        <Pressable
          onPress={() => {
            goBack(navigation);
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Box flexDir="row" alignItems="center" alignSelf="center">
          <Text style={[styles.nameTextLg]}>{name}</Text>
          {isVerified && (
            <MaterialIcons
              name="verified"
              color="blue"
              size={16}
              style={styles.ml1}
            />
          )}
        </Box>
        <Pressable
          onPress={() => {
            if (id) goToWriteReportScreen(navigation, { id, type: "location" });
          }}
        >
          <Ionicons
            name="flag"
            size={24}
            color={flagable ? "black" : "rgba(0,0,0,0)"}
          />
        </Pressable>
      </Box>
      <Divider />
    </>
  );
};

HeaderTab.propTypes = {
  name: PropTypes.string,
  isVerified: PropTypes.bool,
  flagable: PropTypes.bool,
  id: PropTypes.number,
};
HeaderTab.defaultProps = {
  name: "",
  isVerified: false,
  flagable: false,
  id: null,
};

export default HeaderTab;
