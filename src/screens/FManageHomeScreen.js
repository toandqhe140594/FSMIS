import { Box, ScrollView, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";

const menuCategoryForOwner = [
  { id: 1, title: "Xem trang điểm câu của bạn" },
  { id: 2, title: "Chỉnh sửa thông tin điểm câu" },
  { id: 3, title: "Quản lý hồ câu" },
  { id: 4, title: "Quản lý nhân viên" },
  { id: 5, title: "Xác nhận báo cá" },
  { id: 6, title: `Lịch sử báo cá` },
  { id: 7, title: `Quét mã QR` },
  { id: 8, title: `Lịch sử Check-in` },
  { id: 9, title: `Quản lý bài đăng` },
  { id: 10, title: `Đóng cửa khu hồ` },
];
const menuCategoryForStaff = [
  { id: 1, title: "Xem trang điểm câu của bạn" },
  { id: 2, title: "Xác nhận báo cá" },
  { id: 3, title: `Lịch sử báo cá` },
  { id: 4, title: `Quét mã QR` },
  { id: 5, title: `Lịch sử Check-in` },
  { id: 6, title: `Quản lý bài đăng` },
];

const logOut = [{ id: 1, title: "Đóng cửa hồ" }];
const FLocationHomeManagementScreen = ({ typeString }) => {
  const fishingLocationName = "Hồ Thuần Việt";
  let menuCategory;

  if (typeString === "OWNER") {
    menuCategory = [...menuCategoryForOwner];
  }
  if (typeString === "STAFF") {
    menuCategory = [...menuCategoryForStaff];
  }
  console.log(typeString);
  return (
    <Box>
      <HeaderTab name={fishingLocationName} isVerified />

      <VStack mt="4">
        <ScrollView>
          <MenuScreen menuListItem={menuCategory} />
          <MenuScreen menuListItem={logOut} />
        </ScrollView>
      </VStack>
    </Box>
  );
};
FLocationHomeManagementScreen.defaultProps = { typeString: "OWNER" };
FLocationHomeManagementScreen.propTypes = { typeString: PropTypes.string };
export default FLocationHomeManagementScreen;
