import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Menu, Pressable, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Card, Divider, Text } from "react-native-elements";

import styles from "../config/styles";
import AvatarCard from "./AvatarCard";

const EventPostCard = ({
  postStyle,
  angler,
  lakePost,
  iconName,
  iconEvent,
  image,
  edited,
  postTime,
}) => {
  // Thu gon angler, lakePost thanh 1
  return (
    <Box mt="1" px="1.4">
      {postStyle === "LAKE_POST" && (
        <>
          <HStack px="2" mb={3} mt={4} justifyContent="space-between">
            <Box justifyContent="flex-start" alignItems="flex-start">
              <Badge
                badgeStyle={{
                  borderRadius: 0,
                  paddingHorizontal: 4,
                  width: "auto",
                  height: 25,
                }}
                textStyle={{ fontSize: 15 }}
                status="primary"
                value={lakePost.badge}
              />
              <Text style={styles.ml1}>
                {postTime} {edited && "(Đã chỉnh sửa)"}
              </Text>
            </Box>

            <Menu
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps}>
                    <Ionicons name={iconName} size={24} color="black" />
                  </Pressable>
                );
              }}
            >
              {iconEvent.map((item) => (
                <Menu.Item onPress={item.onPress}>{item.name}</Menu.Item>
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
          <AvatarCard avatarSize="md" name={angler.name} />
          <Box mt={2}>
            <Text italic>{angler.content}</Text>
            <Text>
              <Text bold>Đã câu được :</Text>
              {angler.caches}
            </Text>
          </Box>
        </VStack>
      )}

      <VStack pb={1}>
        <Card.Image source={{ uri: image }} style={{ height: 250 }} />
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
    PropTypes.objectOf(PropTypes.string, PropTypes.func),
  ),
  image: PropTypes.string,
  edited: PropTypes.bool,
  postTime: PropTypes.string,
};

EventPostCard.defaultProps = {
  angler: { name: "Dat", content: "Ngôi cả sáng", caches: " cá chép, cá quả" },
  lakePost: {
    badge: "Bồi cá",
    content:
      "Trắm đen - Chép khủng bồi hồ vip cho ae câu thứ 3-5, Lorem ipsum dolor, sit amet consectetur adipisicing elit",
  },
  postStyle: "LAKE_POST",
  iconName: "flag",
  iconEvent: [],
  image: "https://picsum.photos/500",
  edited: false,
  postTime: "",
};

export default EventPostCard;
