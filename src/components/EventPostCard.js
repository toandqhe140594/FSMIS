/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Menu, Pressable, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Card, Divider, Text } from "react-native-elements";

import styles from "../config/styles";
import AvatarCard from "./AvatarCard";

const EventPostCard = ({
  postStyle,
  anglerName,
  anglerContent,
  numberOfImages,
  lakePost,
  iconName,
  iconEvent,
  image,
  edited,
  postTime,
  fishList,
  imageAvatar,
  id,
}) => {
  return (
    <Box mt="1" px="1.4">
      {postStyle === "LAKE_POST" && (
        <>
          <HStack px="2" space={2} mt={4} pb={3} justifyContent="space-between">
            <Box justifyContent="flex-start" alignItems="flex-start">
              <Badge
                badgeStyle={{
                  borderRadius: 7,
                  paddingHorizontal: 1,
                  width: "auto",
                  height: 30,
                  marginBottom: 2,
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
                <Text style={styles.ml1}>
                  {postTime} {edited && "(Đã chỉnh sửa)"}
                </Text>
              )}
            </Box>

            <Menu
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps}>
                    <Ionicons name={iconName} size={22} color="black" />
                  </Pressable>
                );
              }}
            >
              {iconEvent.map((item) => (
                <Menu.Item onPress={() => item.onPress(id)} key={item.name}>
                  {item.name}
                </Menu.Item>
              ))}
            </Menu>
          </HStack>

          <VStack>
            <Box mb={2} w="100%" px="2" pl="3">
              <Text>{lakePost.content && lakePost.content.trim()}</Text>
            </Box>
          </VStack>
        </>
      )}

      {postStyle === "ANGLER_POST" && (
        <VStack pb="1" mb={2} px="2">
          <AvatarCard
            avatarSize="lg"
            nameUser={anglerName}
            subText={postTime}
            image={imageAvatar}
          />
          <Box mt={2}>
            <Text italic>{anglerContent}</Text>
            <Text>
              <Text bold>Đã câu được : </Text>
              {fishList.map((item) => {
                return <Text key={item}>{item}. </Text>;
              })}

              {numberOfImages > 1 && `___ còn ${numberOfImages} ảnh.... `}
            </Text>
          </Box>
        </VStack>
      )}

      <VStack pb={1}>
        <Card.Image
          source={
            image !== undefined
              ? { uri: image }
              : { uri: "https://picsum.photos/500" }
          }
          style={{ height: 290 }}
        />
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
};

export default EventPostCard;
