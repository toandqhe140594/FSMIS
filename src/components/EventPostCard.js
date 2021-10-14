/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, VStack } from "native-base";
import React from "react";
import { Badge, Card, Divider, Text } from "react-native-elements";

import AvatarCard from "./AvatarCard";

const EventPostCard = ({ postStyle, angler, lakePost, ...props }) => {
  // Thu gon angler, lakePost thanh 1
  const image = "https://picsum.photos/200";
  return (
    <>
      {postStyle === "LAKE_POST" && (
        <>
          <HStack px="2" mb={3} mt={5} justifyContent="space-between">
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
            <Ionicons name="flag" size={20} color="black" />
          </HStack>

          <VStack pb="1" mb={3}>
            <Box mb={2} w="100%" px="2">
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

      <VStack pb="1" mb={2}>
        <Card.Image source={{ uri: `${image}` }} />
      </VStack>
      <Divider />
    </>
  );
};
EventPostCard.defaultProps = {
  angler: { name: "Dat", message: "Ngôi cả sáng", caches: " cá chép, cá quả" },
  lakePost: {
    badge: "Bồi cá",
    message:
      "Trắm đen - Chép khủng bồi hồ vip cho ae câu thứ 3-5, Lorem ipsum dolor, sit amet consectetur adipisicing elit",
  },
};
export default EventPostCard;
