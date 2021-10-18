import { Box, ScrollView, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";
import * as ROUTE_NAMES from "../config/routeNames";

const menuCategoryForOwner = [
  {
    id: 1,
    title: "Xem trang điểm câu của bạn",
    route: ROUTE_NAMES.FLOCATION_OVERVIEW,
  },
  {
    id: 2,
    title: "Chỉnh sửa thông tin điểm câu",
    route: ROUTE_NAMES.FMANAGE_PROFILE_EDIT,
  },
  {
    id: 3,
    title: "Quản lý hồ câu",
    route: ROUTE_NAMES.FMANAGE_LAKE_MANAGEMENT,
  },
  {
    id: 4,
    title: "Quản lý nhân viên",
    route: ROUTE_NAMES.FMANAGE_STAFF_MANAGEMENT,
  },
  {
    id: 5,
    title: "Xác nhận báo cá",
    route: ROUTE_NAMES.FMANAGE_CATCH_VERIFY,
  },
  {
    id: 6,
    title: `Lịch sử báo cá`,
    route: ROUTE_NAMES.FMANAGE_CATCH_HISTORY,
  },
  {
    id: 7,
    title: `Quét mã QR`,
    route: ROUTE_NAMES.FMANAGE_QR_SCAN,
  },
  {
    id: 8,
    title: `Lịch sử Check-in`,
    route: ROUTE_NAMES.FMANAGE_CATCH_HISTORY,
  },
  {
    id: 9,
    title: `Quản lý bài đăng`,
    route: ROUTE_NAMES.FMANAGE_POST_MANAGEMENT,
  },
  {
    id: 10,
    title: `Đóng cửa khu hồ`,
    route: ROUTE_NAMES.FLOCATION_CLOSE_FISHING_LOCATION,
  },
];
const menuCategoryForStaff = [
  {
    id: 1,
    title: "Xem trang điểm câu của bạn",
    route: ROUTE_NAMES.FLOCATION_OVERVIEW,
  },

  {
    id: 2,
    title: "Xác nhận báo cá",
    route: ROUTE_NAMES.FMANAGE_CATCH_VERIFY,
  },
  {
    id: 3,
    title: `Lịch sử báo cá`,
    route: ROUTE_NAMES.FMANAGE_CATCH_HISTORY,
  },
  {
    id: 4,
    title: `Quét mã QR`,
    route: ROUTE_NAMES.FMANAGE_QR_SCAN,
  },
  {
    id: 5,
    title: `Lịch sử Check-in`,
    route: ROUTE_NAMES.FMANAGE_CHECKIN_HISTORY,
  },
  {
    id: 6,
    title: `Quản lý bài đăng`,
    route: ROUTE_NAMES.FMANAGE_POST_MANAGEMENT,
  },
];

const logOut = [{ id: 1, title: "Đóng cửa hồ" }];
const FManageHomeScreen = ({ typeString }) => {
  const fishingLocationName = "Hồ Thuần Việt";
  let menuCategory;

  if (typeString === "OWNER") {
    menuCategory = [...menuCategoryForOwner];
  }
  if (typeString === "STAFF") {
    menuCategory = [...menuCategoryForStaff];
  }

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
FManageHomeScreen.defaultProps = { typeString: "OWNER" };
FManageHomeScreen.propTypes = { typeString: PropTypes.string };
export default FManageHomeScreen;
