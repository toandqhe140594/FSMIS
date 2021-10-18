import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Menu, Pressable, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Badge, Card, Divider, Text } from "react-native-elements";

import AvatarCard from "./AvatarCard";

const EventPostCard = ({
  postStyle,
  angler,
  lakePost,
  iconName,
  iconEvent,
}) => {
  // Thu gon angler, lakePost thanh 1
  const image = "https://picsum.photos/500";
  return (
    <Box mt="1" px="1.4">
      {postStyle === "LAKE_POST" && (
        <>
          <HStack px="2" mb={3} mt={4} justifyContent="space-between">
            <Box flexDirection="row" justifyContent="flex-start">
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
              <Text>{lakePost.message}</Text>
            </Box>
          </VStack>
        </>
      )}

      {postStyle === "ANGLER_POST" && (
        <VStack pb="1" mb={2} px="2">
          <AvatarCard avatarSize="md" name={angler.name} />
          <Box mt={2}>
            <Text italic>{angler.message}</Text>
            <Text>
              <Text bold>Đã câu được :</Text>
              {angler.caches}
            </Text>
          </Box>
        </VStack>
      )}

      <VStack pb={1}>
        <Card.Image source={{ uri: `${image}` }} style={{ height: 300 }} />
      </VStack>
      <Divider />
    </Box>
  );
};
EventPostCard.defaultProps = {
  angler: { name: "Dat", message: "Ngôi cả sáng", caches: " cá chép, cá quả" },
  lakePost: {
    badge: "Bồi cá",
    message:
      "Trắm đen - Chép khủng bồi hồ vip cho ae câu thứ 3-5, Lorem ipsum dolor, sit amet consectetur adipisicing elit",
  },
  postStyle: "LAKE_POST",
  iconName: "flag",
  iconEvent: [],
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
};

export default EventPostCard;
