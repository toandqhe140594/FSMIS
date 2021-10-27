import { Box, VStack } from "native-base";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import { ROUTE_NAMES } from "../constants";

const menuCategory = [
  {
    id: 1,
    title: "Quản lý các tài khoản",
    icon: "person",
    route: ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT,
  },
  {
    id: 2,
    title: "Quản lý các điểm câu",
    icon: "place",
    route: ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT,
  },
  {
    id: 3,
    title: "Quản lý báo cáo",
    icon: "report",
    route: ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT,
  },
  {
    id: 4,
    title: "Quản lý các loại cá",
    icon: "fish",
    type: "material-community",
    route: ROUTE_NAMES.ADMIN_FISH_MANAGEMENT,
  },
  {
    id: 5,
    title: "Quản lý các loại hình câu",
    icon: "list",
    route: ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT,
  },
];
const logOut = [
  {
    id: 1,
    title: "Đăng xuất",
    icon: "exit-to-app",
    route: ROUTE_NAMES.PROFILE_LOGOUT,
  },
];

const AdminMainScreen = () => {
  return (
    <Box>
      <VStack
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        pt="2"
      >
        <AvatarCard avatarSize="xl" nameFontSize="21" nameUser="Admin" />
      </VStack>
      <Box maxHeight="80%">
        <VStack mt="4">
          <MenuScreen menuListItem={menuCategory} />
          <MenuScreen menuListItem={logOut} />
        </VStack>
      </Box>
    </Box>
  );
};

export default AdminMainScreen;
