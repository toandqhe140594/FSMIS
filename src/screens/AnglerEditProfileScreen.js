import { Entypo } from "@expo/vector-icons";
import { Avatar, Button, Center, Icon, Input, Text, VStack } from "native-base";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import InputComponent from "../components/common/InputComponent";
import SelectComponent from "../components/common/SelectComponent";
import HeaderTab from "../components/HeaderTab";

const EditProfileScreen = () => {
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Center flex={1} minHeight={Math.round(useWindowDimensions().height)}>
          <HeaderTab name="Thông tin cá nhân" />
          <VStack
            flex={1}
            justifyContent="center"
            mt={3}
            mb={5}
            space={4}
            w={{ base: "70%", md: "50%", lg: "30%" }}
          >
            {/* Avatar image */}
            <Center mb={2}>
              <Avatar
                bg="pink.600"
                size="2xl"
                source={{
                  uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                }}
              />
            </Center>
            <InputComponent
              label="Họ và tên"
              isTitle
              placeholder="Thay đổi họ và tên"
              type="text"
              hasAsterisk
            />

            {/* Date picker field */}
            <Text bold fontSize="md">
              Ngày sinh<Text color="danger.500">*</Text>
            </Text>
            <TouchableOpacity>
              <Input
                InputRightElement={
                  <Icon
                    as={<Entypo name="calendar" />}
                    size={5}
                    mr={1}
                    color="muted.500"
                  />
                }
                placeholder="Ngày sinh*"
                size="lg"
                isDisabled
              />
            </TouchableOpacity>

            {/* Gender select box */}
            <SelectComponent
              label="Giới tính"
              isTitle
              hasAsterisk
              placeholder="Chọn giới tính"
              data={["Nam", "Nữ", "Không muốn nói"]}
            />

            {/* Address input field */}
            <InputComponent
              label="Địa chỉ"
              isTitle
              leftIcon={
                <Icon
                  as={<Entypo name="address" />}
                  size={5}
                  ml={3}
                  color="muted.500"
                />
              }
              placeholder="Nhập địa chỉ"
            />

            {/* City select box */}
            <SelectComponent
              label="Tỉnh/Thành phố"
              isTitle
              placeholder="Chọn tỉnh/thành phố"
              data={["Hồ Chí Minh", "Hà Nội"]}
            />

            {/* District select box */}
            <SelectComponent
              label="Quận/Huyện"
              isTitle
              placeholder="Chọn quận/huyện"
              data={["Hai Bà Trưng, Hoàng Mai"]}
            />

            {/* Commune select box */}
            <SelectComponent
              label="Phường/Xã"
              isTitle
              placeholder="Chọn phường/xã"
              data={["Vĩnh Hưng", "Thanh Lương"]}
            />

            {/* Save changes button */}
            <Button mt={2} size="lg">
              Lưu thay đổi
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
