import { Box, VStack } from "native-base";
import React from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import * as ROUTE_NAMES from "../config/routeNames";

const menuCategory = [
  {
    id: 1,
    title: "Quản lý các tài khoản",
    icon: "set-meal",
    route: ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT_DETAIL,
  },
  {
    id: 2,
    title: "Quản lý các điểm câu",
    icon: "check",
    route: ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT,
  },
  {
    id: 3,
    title: "Quản lý báo cáo",
    icon: "person",
    route: ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT,
  },
  {
    id: 4,
    title: "Quản lý các loại cá",
    icon: "call",
    route: ROUTE_NAMES.ADMIN_FISH_MANAGEMENT,
  },
  {
    id: 5,
    title: "Quản lý các loại hình câu",
    icon: "lock",
    route: ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT,
  },
  {
    id: 6,
    title: `Đăng suất`,
    icon: "av-timer",
    route: ROUTE_NAMES.MANAGEMENT_MODE,
  },
];
const logOut = [{ id: 1, title: "Đăng xuất", icon: "exit-to-app" }];

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
