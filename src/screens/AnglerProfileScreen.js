
import { Box, ScrollView, VStack } from "native-base";
import React from "react";
import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import * as ROUTE_NAMES from "../config/routeNames";

const menuCategory = [
  {
    id: 1,
    title: "Lịch sử Báo cá",
    icon: "set-meal",
    route: ROUTE_NAMES.PROFILE_CATCHES_REPORT_HISTORY,
  },
  {
    id: 2,
    title: "Lịch sử Check-in",
    icon: "check",
    route: ROUTE_NAMES.PROFILE_CHECKIN_REPORT_HISTORY,
  },
  {
    id: 3,
    title: "Chỉnh sửa thông tin cá nhân",
    icon: "person",
    route: ROUTE_NAMES.PROFILE_CHANGE_INFORMATION,
  },
  {
    id: 4,
    title: "Thay đổi số điện thoại",
    icon: "call",
    route: ROUTE_NAMES.PROFILE_CHANGE_PHONE_NUMBER,
  },
  {
    id: 5,
    title: "Thay đổi mật khẩu",
    icon: "lock",
    route: ROUTE_NAMES.PROFILE_CHANGE_PASSWORD,
  },
  {
    id: 6,
    title: `Chuyển sang "Chế độ Quản lý"`,
    icon: "av-timer",
    route: ROUTE_NAMES.MANAGEMENT_MODE,
  },
];
const logOut = [{ id: 1, title: "Đăng xuất", icon: "exit-to-app" }];
const AnglerProfileScreen = () => {
  return (
    <Box>
      <VStack
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2"
      >
        <AvatarCard
          avatarSize="xl"
          nameFontSize="21"
          subText="Lên cần : 69 lần"
        />
      </VStack>
      <ScrollView maxHeight="80%">
        <VStack mt="4">
          <MenuScreen menuListItem={menuCategory} />
          <MenuScreen menuListItem={logOut} />
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default AnglerProfileScreen;
