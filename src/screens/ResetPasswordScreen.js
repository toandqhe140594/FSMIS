import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";

import HeaderTab from "../components/HeaderTab";

const ResetPasswordScreen = () => {
  return (
    <Center flex={1} minHeight={Math.round(useWindowDimensions().height)}>
      <HeaderTab name="Thay đổi mật khẩu" />
      <VStack
        flex={1}
        justifyContent="center"
        space={3}
        mb={10}
        w={{ base: "70%", md: "50%", lg: "30%" }}
      >
        {/* Old pass word input field */}
        <Text bold fontSize="md">
          Mật khẩu cũ <Text color="danger.500">*</Text>
        </Text>
        <Box position="relative" justifyContent="center">
          <Input placeholder="Nhập mật khẩu cũ" size="lg" type="password" />
          <IconButton
            h="100%"
            icon={
              <Icon
                alignSelf="flex-end"
                as={<MaterialIcons name="visibility" />}
                color="muted.500"
                mr={2}
                size={5}
              />
            }
            justifyContent="center"
            position="absolute"
            right={0}
            w="20%"
          />
        </Box>

        {/* New Password input field */}
        <Text bold fontSize="md">
          Mật khẩu mới<Text color="danger.500">*</Text>
        </Text>
        <Box position="relative" justifyContent="center">
          <Input placeholder="Nhập mật khẩu mới" size="lg" type="password" />
          <IconButton
            h="100%"
            icon={
              <Icon
                alignSelf="flex-end"
                as={<MaterialIcons name="visibility" />}
                color="muted.500"
                mr={2}
                size={5}
              />
            }
            justifyContent="center"
            position="absolute"
            right={0}
            w="20%"
          />
        </Box>

        {/* Re-enter new Password input field */}
        <Text bold fontSize="md">
          Nhập lại mật khẩu mới<Text color="danger.500">*</Text>
        </Text>
        <Box position="relative" justifyContent="center">
          <Input
            placeholder="Nhập mật lại khẩu mới"
            size="lg"
            type="password"
          />
          <IconButton
            h="100%"
            icon={
              <Icon
                alignSelf="flex-end"
                as={<MaterialIcons name="visibility" />}
                color="muted.500"
                mr={2}
                size={5}
              />
            }
            justifyContent="center"
            position="absolute"
            right={0}
            w="20%"
          />
        </Box>

        {/* Submit button */}
        <Button mt={4}>Lưu thay đổi</Button>
      </VStack>
    </Center>
  );
};

export default ResetPasswordScreen;
