/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Menu, Pressable, VStack } from "native-base";
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

      <VStack backgroundColor="gray.100">
        {typeUri === "IMAGE" && uri !== null && uri.length > 10 && (
          <ImageResizeMode imgUri={uri} height={400} />
        )}
        {typeUri === "VIDEO" && uri !== null ? (
          <Box
            style={{
              height: 500,
              width: 400,
              flex: 0,
              justifyContent: "center",
              position: "relative",
              right: 10,
              bottom: 5,
              overflow: "hidden",
            }}
          >
            <WebView
              overScrollMode="never"
              showsHorizontalScrollIndicator={false}
              originWhitelist={["https://*"]}
              automaticallyAdjustContentInsets={false}
              scalesPageToFit={false}
              containerStyle={{
                flex: 0,
                height: 490,
                width: "100%",
              }}
              style={{ flex: 0, height: 490 }}
              allowsFullscreenVideo
              source={{
                html: `
            <html>
            <head>
               <style>
                  body{
                 
                  width: 900px;
                  height: 900px; 
                
                 }  
                  .container {
                  width: inherit;
                  height: inherit;
                  overflow: hidden;
                  border-style: solid;
                 
                  }          
                  iframe {
                  display : block;
                  width: 100%;
                  height: 100%;
                  overflow: hidden;
                  background-color:transparent;  
                }
               </style>
            </head>
            <body>
               <div class="container">
                  ${uri}
               </div>
               <script>
                  var elements = document.getElementsByTagName("iframe");
                  var container = document.getElementsByClassName("container");
                  var body = document.getElementsByTagName("body");
                   if(elements[0].width < elements[0].height){
                    body[0].style.width= 300 + "px" ;
              
                    body[0].style.margin= "0 auto"
                  }
                  if(elements[0].width >= elements[0].height){
                    body[0].style.width= "100%";
                    body[0].style.height= "100%";
                    body[0].style.margin= "0 auto"
                    body[0].style.paddingTop= 25;                   
                  }  
               </script>
            </body>
         </html>
          `,
              }}
            />
          </Box>
        ) : null}
      </VStack>
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
