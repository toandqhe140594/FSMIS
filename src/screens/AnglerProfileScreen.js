import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, VStack } from "native-base";
import React, { useEffect } from "react";

import AvatarCard from "../components/AvatarCard";
import MenuScreen from "../components/MenuScreen";
import { ROUTE_NAMES } from "../constants";

const menuCategory = [
  {
    id: 1,
    title: "Lịch sử Báo cá",
    icon: "fish",
    type: "material-community",
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
const logOut = [
  {
    id: 1,
    title: "Đăng xuất",
    icon: "exit-to-app",
    route: ROUTE_NAMES.PROFILE_LOGOUT,
  },
];

const AnglerProfileScreen = () => {
  const getUserInfo = useStoreActions(
    (actions) => actions.ProfileModel.getUserInfo,
  );

  const userInfo = useStoreState((state) => state.ProfileModel.userInfo);

  useEffect(() => {
    getUserInfo();
  }, []);

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
          subText={`Lên cần: ${userInfo.catchesCount} lần`}
          nameUser={userInfo.fullName}
          image={userInfo.avatarUrl}
        />
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

export default AnglerProfileScreen;
