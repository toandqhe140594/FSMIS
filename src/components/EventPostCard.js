/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Menu, Pressable, ScrollView, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Divider, Text } from "react-native-elements";
import { WebView } from "react-native-webview";

import styles from "../config/styles";
import AvatarCard from "./AvatarCard";
import ImageResizeMode from "./ImageResizeMode";

const EventPostCard = ({
  postStyle,
  anglerName,
  anglerContent,
  numberOfImages,
  lakePost,
  iconName,
  iconEvent,
  typeUri,
  uri,
  edited,
  postTime,
  fishList,
  imageAvatar,
  id,
  itemData,
  isApproved,
}) => {
  // Filter unique item for map.
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  let srcUri = [];
  let widthUri;
  let heightUri;
  let widthVideo = 400;
  let heightVideo = 400;
  let heightPage = 410;

  if (typeUri === "VIDEO") {
    try {
      const regexIframe = new RegExp("<iframe", "g");

      if (regexIframe.test(uri)) {
        const regExGetSrc = /<iframe ?.* src="([^"]+)" ?.*>/i;
        const regExGetWidth = /<iframe ?.* width="([^"]+)" ?.*>/i;
        const regExGetHeight = /<iframe ?.* height="([^"]+)" ?.*>/i;

        srcUri = uri.match(regExGetSrc);
        widthUri = uri.match(regExGetWidth);
        heightUri = uri.match(regExGetHeight);
        if (widthUri + 50 < heightUri) {
          widthVideo = 300;
          heightVideo = 500;
          heightPage = 510;
        }
        if (widthUri >= heightUri) {
          widthVideo = 400;
          heightPage = 410;
        }
      } else {
        srcUri[1] = uri;
        heightVideo = 700;
      }
    } catch (err) {
      srcUri[1] = uri;
    }
  }
  return (
    <Box mt="1" px="1.4">
      {postStyle === "LAKE_POST" && (
        <>
          <HStack px="2" space={2} mt={4} pb={3} justifyContent="space-between">
            <HStack alignItems="baseline" space={1}>
              <Badge
                badgeStyle={{
                  borderRadius: 7,
                  paddingHorizontal: 1,
                  width: "auto",
                  height: 30,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 18,
                  paddingBottom: 18,
                }}
                textStyle={{ fontSize: 16, fontWeight: "bold" }}
                status="primary"
                value={lakePost.badge}
              />
              {postTime !== undefined && (
                <Text style={styles.ml1}>{postTime}</Text>
              )}
            </HStack>

            <Menu
              style={{ position: "relative", top: -30, left: -10 }}
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps} hitSlop={10}>
                    <Ionicons name={iconName} size={22} color="black" />
                  </Pressable>
                );
              }}
            >
              <Menu.Group title="Tùy chọn">
                {iconEvent.map((item) => (
                  <Menu.Item
                    onPress={() => item.onPress(id, itemData)}
                    key={item.name}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          </HStack>

          <VStack>
            <Box mb={2} w="100%" px="2" pl="3">
              <Text>
                {lakePost.content && lakePost.content.trim()}{" "}
                {edited && (
                  <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                    {" "}
                    (chỉnh sửa){" "}
                  </Text>
                )}
              </Text>
            </Box>
          </VStack>
        </>
      )}

      {postStyle === "ANGLER_POST" && (
        <VStack pb="1" mb={2} px="1.5">
          <HStack px="2" space={1} mt={4} pb={0} justifyContent="space-between">
            <Box justifyContent="flex-start" alignItems="flex-start" flex={1}>
              <AvatarCard
                avatarSize="lg"
                nameUser={anglerName}
                subText={postTime}
                image={imageAvatar}
                watermarkType={isApproved}
              />
            </Box>

            <Menu
              style={{ position: "relative", top: -70, left: -10 }}
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps} hitSlop={20}>
                    <Ionicons
                      name={iconName}
                      size={22}
                      color="black"
                      style={{ position: "relative", top: 27, left: 10 }}
                    />
                  </Pressable>
                );
              }}
            >
              <Menu.Group title="Tùy chọn">
                {iconEvent.map((item) => (
                  <Menu.Item
                    onPress={() => item.onPress(id, itemData)}
                    key={item.name}
                  >
                    {item.name}
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu>
          </HStack>

          <Box mt={2} ml={1.5}>
            <Text italic>{anglerContent}</Text>
            <Text>
              <Text b>Đã câu được : </Text>
              {fishList !== undefined && fishList !== null ? (
                fishList.filter(onlyUnique).map((item) => {
                  return <Text key={item}>{item}. </Text>;
                })
              ) : (
                <Text>Không có dữ liệu</Text>
              )}

              <Text i>
                {numberOfImages > 1 && `___ còn ${numberOfImages} ảnh.... `}
              </Text>
            </Text>
          </Box>
        </VStack>
      )}

      <Box backgroundColor="gray.100">
        {typeUri === "IMAGE" && uri !== null && uri.length > 10 && (
          <ImageResizeMode imgUri={uri} height={400} />
        )}
        {typeUri === "VIDEO" && uri !== null ? (
          <Box
            style={{
              height: heightPage,
              width: widthVideo,
              flex: 0,
              position: "relative",
              right: 5,
              alignSelf: "center",
            }}
          >
            <ScrollView
              style={{
                flex: 1,
                marginBottom: 4,
              }}
              vertical
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
            >
              <WebView
                originWhitelist={["https://*"]}
                androidHardwareAccelerationDisabled
                scalesPageToFit={false}
                allowsFullscreenVideo
                style={{
                  flex: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  height: heightVideo,
                  width: widthVideo,
                  opacity: 0.99,
                }}
                source={{
                  uri: srcUri[1],
                }}
              />
            </ScrollView>
          </Box>
        ) : null}
      </Box>
      <Divider />
    </Box>
  );
};

EventPostCard.propTypes = {
  angler: PropTypes.objectOf(
    PropTypes.string,
    PropTypes.string,
    PropTypes.string,
  ),
  lakePost: PropTypes.objectOf(PropTypes.string, PropTypes.string),
  postStyle: PropTypes.string,
  iconName: PropTypes.string,
  iconEvent: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, onPress: PropTypes.func }),
  ),
  image: PropTypes.string,
  edited: PropTypes.bool,
  postTime: PropTypes.string,
  id: PropTypes.number.isRequired,
  isApproved: PropTypes.bool,
};

EventPostCard.defaultProps = {
  angler: { name: "Dat", content: "Ngôi cả sáng", caches: " cá chép, cá quả" },
  lakePost: {
    badge: "Bồi cá",
    content:
      "Trắm đen - Chép khủng bồi hồ vip cho ae câu thứ 3-5, Lorem ipsum dolor, sit amet consectetur adipisicing elit",
  },
  postStyle: "LAKE_POST",
  iconName: "",
  iconEvent: [],
  image: "https://picsum.photos/500",
  edited: false,
  postTime: "",
  isApproved: undefined,
};

export default EventPostCard;
