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
        flexDir="row"
        alignItems="center"
        px={4}
        w="100%"
        bg="white"
      >
        <Pressable
          onPress={() => {
            goBack(navigation);
          }}
          flex={1}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Box
          flexDir="row"
          alignItems="center"
          alignSelf="center"
          flex={1.2}
          justifyContent="center"
        >
          <Text
            style={[
              styles.nameTextLg,
              { fontSize: 12, flex: 1, textAlign: "center" },
            ]}
            numberOfLines={1}
          >
            {name}
          </Text>
          {isVerified && (
            <MaterialIcons
              name="verified"
              color="blue"
              size={16}
              style={styles.ml1}
            />
          )}
        </Box>
        <Box flex={1} justifyContent="flex-end" alignItems="flex-end">
          <Button
            // position="absolute"
            onPress={onSuccess}
            _text={{
              fontSize: 10,
            }}
            w="80%"
          >
            {buttonName}
          </Button>
        </Box>
      </Box>
      <Divider />
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
