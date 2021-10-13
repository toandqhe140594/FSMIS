import { MaterialIcons } from "@expo/vector-icons";
// import { yupResolver } from "@hookform/resolvers/yup";
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
// import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, useWindowDimensions } from "react-native";
// import * as yup from "yup";

// import { phoneRegExp } from "../config/constants";

const ChangePhoneNumberScreen = () => {
  return (
    <KeyboardAvoidingView>
      <Center
        flex={1}
        minHeight={Math.round(useWindowDimensions().height)}
        safeArea
      >
        <VStack
          flex={1}
          justifyContent="center"
          space={3}
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
    </KeyboardAvoidingView>
  );
};

export default ChangePhoneNumberScreen;
