import { Box, Divider, Text } from "native-base";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";

import HeaderTab from "../components/HeaderTab";
import ImageResizeMode from "../components/ImageResizeMode";

const styles = StyleSheet.create({
  text: {
    color: "#053742",
    fontSize: 12,
  },
  textHeader: {
    fontSize: 14,
    color: "#053742",
  },
});
const BanNoticeScreen = () => {
  const onPressCallHandler = () => {
    Linking.openURL(`tel:0969051715`);
  };
  return (
    <ScrollView>
      <HeaderTab name="Thông báo" />
      <Box
        padding={2}
        paddingTop={10}
        flex={0.8}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box
          borderWidth={0.5}
          padding={4}
          paddingTop={6}
          backgroundColor="#BDE5FB"
        >
          <Text marginBottom={2}>
            <Text fontSize="md" style={styles.textHeader}>
              Gửi bạn:{" "}
            </Text>
            <Text bold style={(styles.text, styles.textHeader)}>
              {" "}
              123Text.
            </Text>
          </Text>

          <Text paddingLeft={0.5} style={styles.text} fontSize="12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, seiusmod
            tempor
          </Text>

          <Divider mb="2" />
          <Box>
            <Text mb={2} style={styles.text}>
              Ảnh gửi bởi cộng đồng:
            </Text>
            <Swiper
              loadMinimal
              paginationStyle={{
                height: 15,
                marginBottom: 0,
                bottom: 0,
              }}
              style={{ marginTop: 0 }}
              containerStyle={{
                padding: 0,
                height: 240,
                flex: 0,
                backgroundColor: "#DBE6FD",
              }}
            >
              <ImageResizeMode
                imgUri="https://picsum.photos/200"
                height={240}
              />
              <ImageResizeMode
                imgUri="https://picsum.photos/300"
                height={240}
              />
              <ImageResizeMode
                imgUri="https://picsum.photos/400"
                height={240}
              />
            </Swiper>
          </Box>
          <Divider my="2" backgroundColor="white" />
          <Text style={styles.text}>
            Tài khoản:{" "}
            <Text bold style={styles.text}>
              091123431.{" "}
            </Text>
          </Text>
          <Text>
            <Text style={styles.text}>Trạng thái: </Text>
            <Text style={{ color: "#FF5151" }} bold>
              Khóa.{" "}
            </Text>
          </Text>
        </Box>
        <Divider marginTop={3} />
        <Box marginTop={3} alignItems="baseline" flexDirection="row">
          <Text>Liên hệ hỗi trợ: </Text>
          <TouchableOpacity onPress={onPressCallHandler}>
            <Text underline>+084123123</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  );
};
export default BanNoticeScreen;
