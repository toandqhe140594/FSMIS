import { Box, VStack } from "native-base";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";

const menuCategory = [
  { id: 1, title: "Lịch sử Báo cá", icon: "set-meal" },
  { id: 2, title: "Lịch sử Check-in", icon: "check" },
  { id: 3, title: "Chỉnh sửa thông tin cá nhân", icon: "person" },
  { id: 4, title: "Thay đổi số điện thoại", icon: "call" },
  { id: 5, title: "Thay đổi mật khẩu", icon: "lock" },
  { id: 6, title: `Chuyển sang "Chế độ Quản lý"`, icon: "av-timer" },
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

      <VStack mt="4">
        <MenuScreen menuListItem={menuCategory} />
        <MenuScreen menuListItem={logOut} />
      </VStack>
    </Box>
  );
};

export default AnglerProfileScreen;
