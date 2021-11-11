import { useNavigation } from "@react-navigation/native";
import { Box, Divider, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Icon, Text } from "react-native-elements";

import styles from "../config/styles";
import { goBack, goToWriteReportScreen } from "../navigations";

const HeaderTab = ({ name, isVerified, flagable, id, customIcon }) => {
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
          hitSlop={10}
        >
          <Icon name="arrow-back" size={24} type="ionicon" color="black" />
        </Pressable>
        <Box flexDir="row" alignItems="center" alignSelf="center">
          <Text style={[styles.nameTextLg]}>{name}</Text>
          {isVerified && (
            <Icon
              name="verified"
              size={16}
              type="material"
              color="blue"
              style={styles.ml1}
            />
          )}
        </Box>
        {customIcon.name === null && (
          <Pressable
            onPress={() => {
              if (id)
                goToWriteReportScreen(navigation, { id, type: "location" });
            }}
            hitSlop={10}
          >
            <Icon
              name="flag"
              size={24}
              color={flagable ? "black" : "rgba(0,0,0,0)"}
              type="ionicon"
            />
          </Pressable>
        )}
        {customIcon.name !== null && (
          <Pressable
            onPress={() => {
              customIcon.onPress();
            }}
            hitSlop={10}
          >
            <Icon
              name={customIcon.name}
              size={24}
              color={customIcon.color || "black"}
              type={customIcon.type}
            />
          </Pressable>
        )}
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
  customIcon: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
    type: PropTypes.string,
    onPress: PropTypes.func,
  }),
};
HeaderTab.defaultProps = {
  name: "",
  isVerified: false,
  flagable: false,
  id: null,
  customIcon: {
    name: null,
    color: null,
    type: null,
    onPress: () => {},
  },
};

export default HeaderTab;
