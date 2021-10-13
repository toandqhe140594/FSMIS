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
          {/* Phone number input field */}
          <Text bold fontSize="md">
            Nhập số điện thoại mới <Text color="danger.500">*</Text>
          </Text>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="phone-iphone" />}
                size={5}
                ml={2}
                color="muted.500"
              />
            }
            keyboardType="phone-pad"
            maxLength={13}
            paddingLeft={0}
            placeholder="Số điện thoại"
            size="lg"
          />

          {/* Password input field */}
          <Text bold fontSize="md">
            Mật khẩu<Text color="danger.500">*</Text>
          </Text>
          <Box position="relative" justifyContent="center">
            <Input placeholder="Mật khẩu" size="lg" type="password" />
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

          {/* Continue/Submit button */}
          <Button mt={4}>Tiếp tục</Button>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default ChangePhoneNumberScreen;
