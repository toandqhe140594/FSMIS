// import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Divider,
  HStack,
  Image,
  Select,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
// import { Controller, useForm } from "react-hook-form";
import { ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CatchReportCard from "../components/CatchReport/CatchReportCard";
// import * as yup from "yup";

const AnglerCatchReportScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <VStack flex={1} mx={4} my={3} justifyContent="center" space={2}>
          <HStack space={3} mb={2} alignItem="center">
            {/* Holds maximum 3 images */}
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Alternate Text"
              size="xl"
            />
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Alternate Text"
              size="xl"
            />
            <Image
              source={{
                uri: "https://wallpaperaccess.com/full/317501.jpg",
              }}
              alt="Alternate Text"
              size="xl"
            />
          </HStack>
          {/* Textarea input field */}
          <TextInput
            multiline
            numberOfLines={6}
            maxLength={1000}
            placeholder="Mô tả ngày câu của bạn"
            style={{
              borderWidth: 1,
              textAlignVertical: "top",
              padding: 5,
            }}
          />
        </VStack>

        <Divider />

        <Box flex={1} my={3} mx={4} w={{ md: "50%" }}>
          <Box
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            // style={{ borderColor: "blue", borderWidth: 1 }}
          >
            {/* Select lake type */}
            <Text bold fontSize="md">
              Vị trí câu
            </Text>
            <Select
              w="75%"
              // style={{ borderColor: "red", borderWidth: 1 }}
              accessibilityLabel="Chọn hồ câu"
              fontSize="md"
              placeholder="Chọn hồ câu"
            >
              <Select.Item label="Hồ thường" value={1} />
              <Select.Item label="Hồ VIP" value={2} />
              <Select.Item label="Hồ VIP" value={3} />
            </Select>
          </Box>
        </Box>

        <Divider />
        <Box flex={1} my={3} mx={4} w={{ md: "50%", lg: "30%" }}>
          <Text bold fontSize="md" mb={3}>
            Thông tin cá
          </Text>
          <VStack space={2}>
            <CatchReportCard />
            <CatchReportCard />
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnglerCatchReportScreen;
