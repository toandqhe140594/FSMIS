import * as API_URL from "./api";
import * as DICTIONARY from "./dictionary";
import * as ROUTE_NAMES from "./route";
import * as SCHEMA from "./validationSchema";

export { ROUTE_NAMES };

export { API_URL };

export { SCHEMA };

export { DICTIONARY };

export const DEFAULT_TIMEOUT = 10000;

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const DEFAULT_LATLNG = {
  latitude: 21.05113180001943,
  longitude: 105.82025917733947,
};
export const AUTH_TOKEN = "AuthToken";
export const USER_PROFILE = "UserProfile";
export const USER_ROLE = "UserRole";

export const ROLE_USER = "ROLE_USER";
export const ROLE_ADMIN = "ROLE_ADMIN";

export const VIEW_ROLE_ANGLER = "ANGLER";
export const VIEW_ROLE_OWNER = "OWNER";
export const VIEW_ROLE_STAFF = "STAFF";

export const MENU_OWNER = [
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
        type: "font-awesome-5",
      },
      {
        id: 6,
        title: `Báo cá đã duyệt`,
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
];
export const MENU_STAFF = [
  {
    id: 1,
    category: [
      {
        id: 1,
        title: "Xem trang điểm câu của bạn",
        route: ROUTE_NAMES.FMANAGE_LOCATION_OVERVIEW,
        icon: "waves",
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
        type: "font-awesome-5",
      },
      {
        id: 6,
        title: `Báo cá đã duyệt`,
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
];
export const MENU_ADMIN = [
  {
    id: 1,
    title: "Quản lý tài khoản",
    icon: "person",
    route: ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT,
  },
  {
    id: 2,
    title: "Quản lý điểm câu",
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
    title: "Quản lý loại cá",
    icon: "fish",
    type: "font-awesome-5",
    route: ROUTE_NAMES.ADMIN_FISH_MANAGEMENT,
  },
  {
    id: 5,
    title: "Quản lý loại hình câu",
    icon: "list",
    route: ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT,
  },
  {
    id: 6,
    title: "Hồ câu gợi ý từ cần thủ",
    icon: "info-outline",
    type: "material",
    route: ROUTE_NAMES.ADMIN_LOCATION_SUGGEST_MANAGEMENT,
  },
  {
    id: 7,
    title: "Danh sách đen",
    icon: "ban",
    type: "font-awesome",
    route: ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT,
  },
];
export const MENU_ANGLER = [
  {
    id: 1,
    title: "Lịch sử Báo cá",
    icon: "fish",
    type: "font-awesome-5",
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
export const MENU_LOGOUT = [
  {
    id: -1,
    title: "Đăng xuất",
    icon: "exit-to-app",
    route: ROUTE_NAMES.PROFILE_LOGOUT,
  },
];
