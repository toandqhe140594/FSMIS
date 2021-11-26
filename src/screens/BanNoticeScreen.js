import { useRoute } from "@react-navigation/native";
import { Box, Divider, Text } from "native-base";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import HeaderTab from "../components/HeaderTab";
import ImageResizeMode from "../components/ImageResizeMode";
import colors from "../config/colors";

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
const BanNoticeScreen = () => {
  const route = useRoute();

  const onPressCallHandler = () => {
    Linking.openURL(`tel:0969051715`);
  };

  return (
    <ScrollView>
      <HeaderTab name="Thông báo" />
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
              {route.params?.name ? ` ${route.params.name}` : ""},
            </Text>
          </Text>

          <Text style={styles.text}>Tài khoản của bạn hiện đang bị khóa!</Text>
          {route.params?.description ? (
            <>
              <Text mt={2} style={styles.text} bold>
                Lý do:
              </Text>
              <Text style={styles.text}>{route.params.description}</Text>
            </>
          ) : (
            <></>
          )}

          {route.params?.image ? (
            <>
              <Divider mb="2" />
              <Box>
                <Text mb={2} style={styles.text} bold>
                  Ảnh minh họa:
                </Text>
                <ImageResizeMode imgUri={route.params.image} height={240} />
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
          <TouchableOpacity onPress={onPressCallHandler}>
            <Text underline>0985043311</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  );
};
export default BanNoticeScreen;
