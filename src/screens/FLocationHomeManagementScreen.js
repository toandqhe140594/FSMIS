import { Box, VStack } from "native-base";
import React from "react";

import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";

const menuCategory = [
  { id: 1, title: "Lịch sử Báo cá", icon: "set-meal" },
  { id: 2, title: "Lịch sử Check-in", icon: "check" },
  { id: 3, title: "Chỉnh sửa thông tin cá nhân", icon: "person" },
  { id: 4, title: "Thay đổi số điện thoại", icon: "call" },
  { id: 5, title: "Thay đổi mật khẩu", icon: "lock" },
  { id: 6, title: `Chuyển sang "Chế độ Quản lý"`, icon: "av-timer" },
];

const logOut = [{ id: 1, title: "Đóng hồ", icon: "exit-to-app" }];
const OwnerHomeManagementScreen = () => {
  const fishingLocationName = "Hồ Thuần Việt";
  return (
    <Box>
      <HeaderTab name={fishingLocationName} isVerified="true" />

      <VStack mt="4">
        <MenuScreen menuListItem={menuCategory} />
        <MenuScreen menuListItem={logOut} />
      </VStack>
    </Box>
  );
};
export default OwnerHomeManagementScreen;
