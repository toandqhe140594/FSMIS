import { useNavigation } from "@react-navigation/native";
import { Box, Button, Divider, Pressable } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Icon, Text } from "react-native-elements";

import styles from "../config/styles";
import { goBack } from "../navigations";

const HeaderWithButton = ({
  name,
  isVerified,
  buttonName,
  onSuccess,
  isDanger,
  isLoading,
}) => {
  const navigation = useNavigation();

  const goBackAction = () => {
    goBack(navigation);
  };

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
          onPress={goBackAction}
          flex={1}
          alignItems="flex-start"
          hitSlop={10}
        >
          <Icon
            name="arrow-back"
            size={24}
            type="ionicon"
            color="black"
            containerStyle={styles.ml1}
          />
        </Pressable>
        <Box
          flexDir="row"
          alignItems="center"
          alignSelf="center"
          flex={1.2}
          justifyContent="center"
        >
          <Text
            style={[styles.nameTextLg, { fontSize: 12, textAlign: "center" }]}
            numberOfLines={1}
          >
            {name}
          </Text>
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
        <Box flex={1} justifyContent="flex-end" alignItems="flex-end">
          <Button
            onPress={onSuccess}
            _text={{
              fontSize: 10,
            }}
            w="80%"
            colorScheme={isDanger ? "danger" : "primary"}
            isLoading={isLoading}
          >
            {buttonName}
          </Button>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

HeaderWithButton.propTypes = {
  name: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  buttonName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  isDanger: PropTypes.bool,
  isLoading: PropTypes.bool,
};
HeaderWithButton.defaultProps = {
  isVerified: false,
  isDanger: false,
  isLoading: false,
};

export default HeaderWithButton;
