/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  Menu,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Divider } from "react-native-elements";
import { WebView } from "react-native-webview";

import styles from "../config/styles";
import AvatarCard from "./AvatarCard";
import ImageResizeMode from "./ImageResizeMode";

const uriExtract = (uri) => {
  let srcUri = [];
  let widthUri;
  let heightUri;
  let widthVideo = 400;
  let heightVideo = 320;
  let heightPage = 340;
  let isAllowsFullscreen = true;

  uri = uri.replace("fb.gg/v/", "fb.watch/"); // Convert fb.gg link to fb.watch link

  try {
    const regexIframe = new RegExp("<iframe", "g");
    const regexYouTubeIframe = new RegExp(
      '<iframe[^>]*srcs*=s*"?https?://[^s"/]*youtube.com(?:/[^s"]*)?"?[^>]*>.*?</iframe>',
      "",
    );
    const regexYouTubeLink =
      /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/g;
    const regexYouTubeID =
      /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
    const regexFacebookFWacth = /https:\/\/fb\.(?:watch|gg)\//;
    const regexFacebookLink =
      /^https:\/\/www\.facebook\.com\/([^\/?].+\/)?video(s|\.php)[\/?].*$/;
    if (regexYouTubeIframe.test(uri)) {
      isAllowsFullscreen = false;
    }
    if (regexIframe.test(uri)) {
      const regExGetSrc = /<iframe ?.* src="([^"]+)" ?.*>/i;
      const regExGetWidth = /<iframe ?.* width="([^"]+)" ?.*>/i;
      const regExGetHeight = /<iframe ?.* height="([^"]+)" ?.*>/i;

      srcUri = uri.match(regExGetSrc);
      widthUri = uri.match(regExGetWidth);
      heightUri = uri.match(regExGetHeight);

      if (widthUri[1] + 50 < heightUri[1]) {
        heightVideo = 500;
        widthVideo = 0.56 * heightVideo;
        heightPage = heightVideo + 10;
      }
      if (widthUri[1] >= heightUri[1]) {
        widthVideo = 400;
        heightVideo = Number(heightUri[1] / widthUri[1]) * widthVideo;
        heightPage = heightVideo + 10;
      }
    } else if (regexYouTubeLink.test(uri)) {
      const idArray = uri.split(regexYouTubeID);
      srcUri[1] = `https://www.youtube.com/embed/${idArray[1]}`;
      widthVideo = 410;
      heightVideo = widthVideo * 0.85;
      heightPage = heightVideo + 10;
      isAllowsFullscreen = false;
    } else if (regexFacebookFWacth.test(uri) || regexFacebookLink.test(uri)) {
      const mapObj = {
        ":": "%3A",
        "/": "%2F",
      };
      uri = uri.replace(/(?:\:|\/|\/\/)/gi, (matched) => mapObj[matched]);
      srcUri[1] = `https://www.facebook.com/plugins/video.php?href=${uri}&width=${widthVideo}&show_text=false&height=${heightVideo}`;
      widthVideo = 400;
      heightVideo = widthVideo * 0.8;
      heightPage = heightVideo + 10;
    } else {
      srcUri[1] = uri;
      heightVideo = 700;
    }
  } catch (err) {
    srcUri[1] = uri;
  }
  const videoInfo = {
    uri: srcUri[1],
    videoHeight: heightVideo,
    videoWidth: widthVideo,
    pageHeight: heightPage,
    allowFullscreen: isAllowsFullscreen,
  };

  return videoInfo;
};
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
  let srcUri;
  let widthVideo = 400;
  let heightVideo = 400;
  let heightPage = 410;
  let typeBadge = "";
  let isAllowsFullscreen;
  let badgeColor = "primary";
  switch (lakePost.badge) {
    case "STOCKING":
      typeBadge = "Bồi cá";
      badgeColor = "success";
      break;
    case "REPORTING":
      typeBadge = "Báo cá";
      badgeColor = "warning";
      break;
    case "ANNOUNCING":
      typeBadge = "Thông báo";
      badgeColor = "primary";
      break;
    default:
      typeBadge = lakePost.badge;
  }
  switch (typeBadge) {
    case "Bồi cá":
      badgeColor = "success";
      break;
    case "Báo cá":
      badgeColor = "warning";
      break;
    case "Thông báo":
      badgeColor = "primary";
      break;
    default:
      badgeColor = "primary";
  }

  if (typeUri === "VIDEO") {
    const videoInfo = uriExtract(uri);
    widthVideo = videoInfo.videoWidth;
    heightVideo = videoInfo.videoHeight;
    heightPage = videoInfo.pageHeight;
    srcUri = videoInfo.uri;
    isAllowsFullscreen = videoInfo.allowFullscreen;
  }
  return (
    <Box mt="1" px="1.4">
      {postStyle === "LAKE_POST" && (
        <>
          <HStack px="2" space={2} mt={4} pb={3} justifyContent="space-between">
            <HStack alignItems="center" space={1}>
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
                status={badgeColor}
                value={typeBadge}
              />
              <VStack>
                {postTime !== undefined && (
                  <Text style={styles.ml1} bold position="relative" top={1}>
                    {postTime}
                  </Text>
                )}
                {lakePost.posterName !== undefined &&
                lakePost.posterName.length > 0 ? (
                  <Text
                    style={{
                      fontSize: 11,
                      textAlign: "left",
                      marginLeft: 6,
                    }}
                    position="relative"
                    top={-1}
                  >
                    {lakePost.posterName}
                  </Text>
                ) : null}
              </VStack>
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
                allowsFullscreenVideo={isAllowsFullscreen}
                overScrollMode="content"
                originWhitelist={["https://*"]}
                scalesPageToFit={false}
                domStorageEnabled
                // injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                style={{
                  flex: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  height: heightVideo,
                  width: widthVideo,
                  opacity: 0.99,
                }}
                source={{
                  // uri: `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Ffb.watch%2F9Ai9dhzAct%2F&width=${widthVideo}&show_text=false&height=${heightVideo}`,
                  uri: srcUri,
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
  uri: PropTypes.string,
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
  uri: "",
  edited: false,
  postTime: "",
  isApproved: undefined,
};

export default EventPostCard;
