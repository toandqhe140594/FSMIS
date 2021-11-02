import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import HeaderTab from "../components/HeaderTab";
import MenuScreen from "../components/MenuScreen";
import { ROUTE_NAMES } from "../constants";

const menuCategoryForOwner = [
  {
    id: 1,
    category: [
      {
        id: 1,
        title: "Xem trang điểm câu của bạn",
        route: ROUTE_NAMES.FMANAGE_LOCATION_OVERVIEW,
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
  const route = useRoute();

  const locationDetails = useStoreState(
    (states) => states.FManageModel.locationDetails,
  );
  const setLocationLatLng = useStoreActions(
    (actions) => actions.FManageModel.setLocationLatLng,
  );
  const [shortLocationOverview, setShortLocationOverview] = useState({
    name: "Hồ câu",
    id: 0,
    isVerified: false,
  });

  let menuCategory;
  if (typeString === "OWNER") {
    menuCategory = [...menuCategoryForOwner];
  }
  if (typeString === "STAFF") {
    menuCategory = [...menuCategoryForStaff];
  }

  const { setCurrentId, getLocationDetailsById, getListOfLake } =
    useStoreActions((actions) => actions.FManageModel);

  useEffect(() => {
    if (locationDetails.latitude && locationDetails.longitude) {
      setLocationLatLng({
        latitude: locationDetails.latitude,
        longitude: locationDetails.longitude,
      });
    }
  }, [locationDetails]);

  useEffect(() => {
    if (route.params) {
      const { id, name, isVerified } = route.params;
      setCurrentId(id);
      getLocationDetailsById({ id });
      setShortLocationOverview({ id, name, isVerified });
      getListOfLake({ id });
    }
    return () => {
      setLocationLatLng({ latitude: null, longitude: null });
    };
  }, []);

  const { id, name, isVerified } = shortLocationOverview;

  return (
    <Box>
      <HeaderTab id={id} name={name} isVerified={isVerified} />

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
