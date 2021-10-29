import { useStoreActions } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";
import { ROUTE_NAMES } from "../constants";
import FManageModel from "../models/FManageModel";
import store from "../utilities/Store";

store.addModel("FManageModel", FManageModel);

const menuCategoryForOwner = [
  {
    id: 1,
    category: [
      {
        id: 1,
        title: "Xem trang điểm câu của bạn",
        route: ROUTE_NAMES.FLOCATION_OVERVIEW,
        icon: "waves",
      },
      {
        id: 2,
        title: "Chỉnh sửa thông tin điểm câu",
        route: ROUTE_NAMES.FMANAGE_PROFILE_EDIT,
        icon: "edit",
      },
      {
        id: 3,
        title: "Quản lý hồ câu",
        route: ROUTE_NAMES.FMANAGE_LAKE_MANAGEMENT,
        icon: "group-work",
      },
      {
        id: 4,
        title: "Quản lý nhân viên",
        route: ROUTE_NAMES.FMANAGE_STAFF_MANAGEMENT,
        icon: "people-alt",
      },
    ],
  },
  {
    id: 2,
    category: [
      {
        id: 7,
        title: `Quét mã QR`,
        route: ROUTE_NAMES.FMANAGE_QR_SCAN,
        icon: "qr-code",
      },
      {
        id: 8,
        title: `Lịch sử Check-in`,
        route: ROUTE_NAMES.FMANAGE_CHECKIN_HISTORY,
        icon: "how-to-reg",
      },
    ],
  },

  {
    id: 3,
    category: [
      {
        id: 5,
        title: "Xác nhận báo cá",
        route: ROUTE_NAMES.FMANAGE_CATCH_VERIFY,
        icon: "fish",
        type: "material-community",
      },
      {
        id: 6,
        title: `Lịch sử báo cá`,
        route: ROUTE_NAMES.FMANAGE_CATCH_HISTORY,
        icon: "done",
      },
    ],
  },

  {
    id: 4,
    category: [
      {
        id: 9,
        title: `Quản lý bài đăng`,
        route: ROUTE_NAMES.FMANAGE_POST_MANAGEMENT,
        icon: "post-add",
      },
    ],
  },

  {
    id: 5,
    category: [
      {
        id: 10,
        title: `Đóng cửa khu hồ`,
        route: ROUTE_NAMES.FLOCATION_CLOSE_FISHING_LOCATION,
        icon: "cancel",
      },
    ],
  },
];
const menuCategoryForStaff = [
  {
    id: 1,
    title: "Xem trang điểm câu của bạn",
    route: ROUTE_NAMES.FLOCATION_OVERVIEW,
    icon: "waves",
  },

  {
    id: 7,
    title: `Quét mã QR`,
    route: ROUTE_NAMES.FMANAGE_QR_SCAN,
    icon: "qr-code",
  },
  {
    id: 5,
    title: "Xác nhận báo cá",
    route: ROUTE_NAMES.FMANAGE_CATCH_VERIFY,
    icon: "fish",
    type: "material-community",
  },
  {
    id: 9,
    title: `Quản lý bài đăng`,
    route: ROUTE_NAMES.FMANAGE_POST_MANAGEMENT,
    icon: "post-add",
  },
  {
    id: 3,
    title: `Lịch sử báo cá`,
    route: ROUTE_NAMES.FMANAGE_CATCH_HISTORY,
    icon: "check",
  },
  {
    id: 8,
    title: `Lịch sử Check-in`,
    route: ROUTE_NAMES.FMANAGE_CHECKIN_HISTORY,
    icon: "how-to-reg",
  },
];

const FManageHomeScreen = ({ typeString }) => {
  const fishingLocationName = "Hồ Thuần Việt";
  let menuCategory;
  if (typeString === "OWNER") {
    menuCategory = [...menuCategoryForOwner];
  }
  if (typeString === "STAFF") {
    menuCategory = [...menuCategoryForStaff];
  }
  const setCurrentId = useStoreActions(
    (actions) => actions.LocationModel.setCurrentId,
  );
  const getLocationOverviewById = useStoreActions(
    (actions) => actions.LocationModel.getLocationOverviewById,
  );

  useEffect(() => {
    setCurrentId("1");
    getLocationOverviewById({ id: "1" });
  }, []);

  return (
    <Box>
      <HeaderTab name={fishingLocationName} isVerified />

      <ScrollView maxHeight="97%">
        <VStack mt="1" mb="2">
          {menuCategory.map((item) => {
            return <MenuScreen menuListItem={item.category} key={item.id} />;
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};
FManageHomeScreen.defaultProps = { typeString: "OWNER" };
FManageHomeScreen.propTypes = { typeString: PropTypes.string };
export default FManageHomeScreen;
