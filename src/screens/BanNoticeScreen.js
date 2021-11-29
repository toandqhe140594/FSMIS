import { useStoreActions } from "easy-peasy";
import { Box, Divider, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { BackHandler, Linking, ScrollView, StyleSheet } from "react-native";

import HeaderTab from "../components/HeaderTab";
import ImageResizeMode from "../components/ImageResizeMode";
import colors from "../config/colors";
import { DICTIONARY } from "../constants";
import { showAlertConfirmBox } from "../utilities";

const styles = StyleSheet.create({
  text: {
    color: "#053742",
    fontSize: 14,
  },
  textHeader: {
    fontSize: 14,
    color: "#053742",
  },
});
const BanNoticeScreen = ({ bannedInformation }) => {
  const setErrorMessage = useStoreActions((actions) => actions.setErrorMessage);

  const resetErrorMessage = () => {
    setErrorMessage({});
  };

  useEffect(() => {
    /**
     * Show alert box confirm go back to login screen action
     * @returns true
     */
    const backAction = () => {
      showAlertConfirmBox(
        DICTIONARY.ALERT_WARNING_TITLE,
        DICTIONARY.ALERT_BACK_TO_LOGIN_MSG,
        resetErrorMessage,
      );
      return true;
    };

    // Overwrite android back press
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    // Remove back press handler when unmount screen
    return () => backHandler.remove();
  }, []);

  const onPressCallHandler = () => {
    Linking.openURL(`tel:0969051715`);
  };

  return (
    <ScrollView>
      <HeaderTab name="Thông báo" popToTop={resetErrorMessage} />
      <Box
        padding={2}
        paddingTop={8}
        flex={1}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box
          borderWidth={0.5}
          padding={3}
          paddingTop={4}
          backgroundColor="#A2DBFA"
          borderColor="#39A2DB"
          width="100%"
        >
          <Text marginBottom={2}>
            <Text fontSize="md" style={styles.textHeader}>
              Gửi bạn
            </Text>
            <Text bold style={(styles.text, styles.textHeader)}>
              {bannedInformation.name ? ` ${bannedInformation.name}` : ""},
            </Text>
          </Text>

          <Text style={styles.text}>Tài khoản của bạn hiện đang bị khóa!</Text>
          {bannedInformation.description ? (
            <>
              <Divider mt="2" />
              <Text mt={2} style={styles.text} bold>
                Lý do:
              </Text>
              <Text style={styles.text} mb={2}>
                {bannedInformation.description}
              </Text>
            </>
          ) : (
            <></>
          )}

          {bannedInformation.image ? (
            <>
              <Box>
                <Text mb={2} style={styles.text} bold>
                  Ảnh minh họa:
                </Text>
                <ImageResizeMode
                  imgUri={bannedInformation.image}
                  height={240}
                />
              </Box>
            </>
          ) : (
            <></>
          )}

          <Divider my="2" backgroundColor="white" />
          <Text style={styles.text}>
            Tài khoản:{" "}
            <Text bold style={styles.text}>
              091123431
            </Text>
          </Text>
          <Text>
            <Text style={styles.text}>Trạng thái: </Text>
            <Text style={{ color: colors.defaultDanger }} bold>
              Khóa
            </Text>
          </Text>
        </Box>
        <Divider marginTop={3} />
        <Box marginTop={3} alignItems="baseline" flexDirection="row">
          <Text>Liên hệ hỗ trợ: </Text>
          <Text underline onPress={onPressCallHandler}>
            0985043311
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};

BanNoticeScreen.propTypes = {
  bannedInformation: PropTypes.shape({
    image: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
export default BanNoticeScreen;
