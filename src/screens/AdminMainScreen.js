import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import React, { useEffect } from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import * as ROUTE_NAMES from "../config/routeNames";

const menuCategory = [
  {
    id: 1,
    title: "Quản lý các tài khoản",
    icon: "set-meal",
    route: ROUTE_NAMES.PROFILE_CATCHES_REPORT_HISTORY,
  },
  {
    id: 2,
    title: "Quản lý các điểm câu",
    icon: "check",
    route: ROUTE_NAMES.PROFILE_CHECKIN_REPORT_HISTORY,
  },
  {
    id: 3,
    title: "Quản lý báo cá",
    icon: "person",
    route: ROUTE_NAMES.PROFILE_CHANGE_INFORMATION,
  },
  {
    id: 4,
    title: "Quản lý các loại cá",
    icon: "call",
    route: ROUTE_NAMES.PROFILE_CHANGE_PHONE_NUMBER,
  },
  {
    id: 5,
    title: "Quản lý các loại hình câu",
    icon: "lock",
    route: ROUTE_NAMES.PROFILE_CHANGE_PASSWORD,
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

export default AdminMainScreen;
