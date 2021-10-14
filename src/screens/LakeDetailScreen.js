import { Box, Text, VStack } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { Card, Divider } from "react-native-elements";

import FishInformationCard from "../components/FishInformationCard";
import HeaderTab from "../components/HeaderTab";

const LakeDetailScreen = () => {
  return (
    <ScrollView>
      <Box>
        <HeaderTab name="Hồ vip" />
        <Card containerStyle={{ width: "100%", margin: 0, padding: 0 }}>
          <Card.Image source={{ uri: "https://picsum.photos/200" }} />
          <Divider />
          <Box m={3}>
            <Text>
              <Text bold fontSize="md">
                Cập nhật lần cuối:{" "}
              </Text>
              01/10/2021
            </Text>
          </Box>
          <Divider />
          <Box m={3}>
            <Text>
              <Text bold fontSize="md">
                Loại hình:{" "}
              </Text>
              Câu đơn, câu đài
            </Text>
          </Box>
          <Divider />
          <Box m={3}>
            <Text bold fontSize="md">
              Giá vé
            </Text>
            <Box flexDirection="row">
              &#8226;
              <Text>200k/ca 3h (Không bao móm)</Text>
            </Box>
            <Box flexDirection="row">
              &#8226;
              <Text>350k/ca 5h (Không bao móm)</Text>
            </Box>
            <Box flexDirection="row">
              &#8226;
              <Text>500k/ca 7h (Bao móm)</Text>
            </Box>
          </Box>
          <Divider />
          <Box m={3}>
            <Text bold fontSize="md">
              Thông số
            </Text>
            <Box flexDirection="row">
              &#8226;
              <Text>Diện tích: 70m2</Text>
            </Box>
            <Box flexDirection="row">
              &#8226;
              <Text>Độ sâu: 2m</Text>
            </Box>
            <Box flexDirection="row">
              &#8226;
              <Text>Chiều dài: 10m</Text>
            </Box>
            <Box flexDirection="row">
              &#8226;
              <Text>Chiều rộng: 5m</Text>
            </Box>
          </Box>
          <Divider />
          <Box m={3}>
            <Text bold fontSize="md">
              Các loại cá
            </Text>
            <VStack space={2}>
              <FishInformationCard
                currentAmount={200}
                currentWeight={800}
                name="Cá chép"
                overview
                weightRange="4-5"
              />
              <FishInformationCard
                currentAmount={200}
                currentWeight={800}
                name="Cá chép"
                overview
                weightRange="4-5"
              />
            </VStack>
          </Box>
        </Card>
      </Box>
    </ScrollView>
  );
};

export default LakeDetailScreen;
