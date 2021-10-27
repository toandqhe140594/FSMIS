import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Divider, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Text } from "react-native-elements";

import styles from "../config/styles";
import { goBack } from "../navigations";

const HeaderWithButton = ({ name, isVerified, buttonName, onSuccess }) => {
  const navigation = useNavigation();

  return (
    <Box position="relative" justifyContent="center">
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
        <Ionicons name="arrow-back" size={24} color="rgba(0,0,0,0)" />
      </Box>
      <Divider />
      <Button
        position="absolute"
        right={2}
        bottom={1}
        top={1}
        onPress={onSuccess}
      >
        {buttonName}
      </Button>
    </Box>
  );
};

HeaderWithButton.propTypes = {
  name: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  buttonName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
HeaderWithButton.defaultProps = {
  isVerified: false,
};

export default HeaderWithButton;
