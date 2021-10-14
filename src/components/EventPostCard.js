import { Ionicons } from "@expo/vector-icons";
import { Box, HStack,Image, VStack } from "native-base";
import React from "react";
import { Badge, Card, Divider, Text } from "react-native-elements";

import AvatarCard from "./AvatarCard";

// eslint-disable-next-line react/prop-types
const EventPostCard = ({ postStyle }) => {
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
                value="Bồi cá"
              />
            </Box>
            <Ionicons name="flag" size={20} color="black" />
          </HStack>

          <VStack pb="1" mb={3}>
            <Box mb={2} w="100%" px="2">
              <Text>
                Trắm đen - Chép khủng bồi hồ vip cho ae câu thứ 3-5, Lorem ipsum
                dolor, sit amet consectetur adipisicing elit{" "}
              </Text>
            </Box>
          </VStack>
        </>
      )}
      {postStyle === "ANGLER_POST" && (
        <VStack pb="1" mb={2} px="2">
          <AvatarCard avatarSize="md" name={"Dat"} />
          <Box mt={2}>
            <Text italic>"Ngôi cả sáng"</Text>
            <Text>
              <Text bold>Đã câu được :</Text>
              cá chép, cá quả
            </Text>
          </Box>
        </VStack>
      )}

      <VStack pb="1" mb={2}>
        <Card.Image source={{ uri: "https://picsum.photos/200" }} />
      </VStack>
      <Divider />
    </>
  );
};

export default EventPostCard;
