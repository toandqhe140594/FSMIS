import { Entypo } from "@expo/vector-icons";
import { useStoreState } from "easy-peasy";
import {
  Avatar,
  Button,
  Center,
  Icon,
  Input,
  Select,
  Text,
  VStack,
} from "native-base";
import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import HeaderTab from "../components/HeaderTab";

const EditProfileScreen = () => {
  const userInfo = useStoreState((state) => state.ProfileModel.userInfo);
  const checkGender = (state) => {
    if (state === null) {
      return "Không muốn nói";
    }
    if (state) {
      return "Nam";
    }
    return "Nữ";
  };
  // const [ward, wardId, district, districtId, province, provinceId] =
  //   userInfo.addressFromWard;
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Center flex={1} minHeight={Math.round(useWindowDimensions().height)}>
          <HeaderTab name="Thông tin cá nhân" />
          <VStack
            flex={1}
            justifyContent="center"
            mt={3}
            mb={1}
            space={2}
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
            {/* Name input field */}
            <Text bold fontSize="md" mt={3}>
              Họ và tên<Text color="danger.500">*</Text>
            </Text>
            <Input placeholder={userInfo.fullName} size="lg" type="text" />

            {/* Date picker field */}
            <Text bold fontSize="md" mt={3}>
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
                placeholder={userInfo.dob}
                size="lg"
                isDisabled
              />
            </TouchableOpacity>

            {/* Gender select box */}
            <Text bold fontSize="md" mt={3}>
              Giới tính<Text color="danger.500">*</Text>
            </Text>
            <Select
              accessibilityLabel="Chọn giới tính"
              fontSize="md"
              placeholder={checkGender(userInfo.gender)}
            >
              {/* Hard code this place */}
              <Select.Item label="Nam" value={1} />
              <Select.Item label="Nữ" value={0} />
              <Select.Item label="Không muốn nói" value={-1} />
            </Select>

            {/* Address input field */}
            <Text bold fontSize="md" mt={3}>
              Địa chỉ
            </Text>
            <Input
              InputLeftElement={
                <Icon
                  as={<Entypo name="address" />}
                  size={5}
                  ml={3}
                  color="muted.500"
                />
              }
              paddingLeft={0}
              placeholder={userInfo.address}
              size="lg"
              type="text"
            />

            {/* City select box */}
            <Text bold fontSize="md" mt={3}>
              Tỉnh/ Thành phố
            </Text>
            <Select
              accessibilityLabel="Chọn tỉnh, thành phố"
              fontSize="md"
              placeholder={userInfo.addressFromWard.province}
            >
              {/* Hard code this place */}
              <Select.Item label="Hà Nội" value={1} />
              <Select.Item label="Hồ Chí Minh" value={2} />
            </Select>

            {/* District select box */}
            <Text bold fontSize="md" mt={3}>
              Quận/huyện
            </Text>
            <Select
              accessibilityLabel="Chọn quận, huyện"
              fontSize="md"
              placeholder={userInfo.addressFromWard.district}
            >
              {/* Hard code this place */}
              <Select.Item label="Hai Bà Trưng" value={1} />
              <Select.Item label="Hoàng Mai" value={2} />
            </Select>

            {/* Commune select box */}
            <Text bold fontSize="md" mt={3}>
              Phường/xã
            </Text>
            <Select
              accessibilityLabel="Chọn phường, xã"
              fontSize="md"
              placeholder={userInfo.addressFromWard.ward}
            >
              {/* Hard code this place */}
              <Select.Item label="Vĩnh Hưng" value={1} />
              <Select.Item label="Thanh Lương" value={2} />
            </Select>

            {/* Save changes button */}
            <Button mt={3} size="lg">
              Lưu thay đổi
            </Button>
          </VStack>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
