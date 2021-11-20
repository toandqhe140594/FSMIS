export const AUTHENTICATION_LOGIN = "auth/login";
export const AUTHENTICATION_REGISTER = "auth/register";
export const AUTHENTICATION_PASSWORD_RESET = "auth/forgot";

export const ADMIN_FISH_LIST = "util/fish";
export const ADMIN_FISH_LIST_FULL = "admin/fish";
export const ADMIN_FISH_ADD = "admin/fish/add";
export const ADMIN_FISH_EDIT = "admin/fish/edit";
export const ADMIN_FISH_UPDATE_STATUS = "admin/fish/change-active";
export const ADMIN_FISHING_METHOD_LIST = "util/method";
export const ADMIN_FISHING_METHOD_LIST_FULL = "admin/method";
export const ADMIN_FISHING_METHOD_ADD = "admin/method/add";
export const ADMIN_FISHING_METHOD_EDIT = "admin/method/edit";
export const ADMIN_FISHING_METHOD_UPDATE_STATUS = "admin/method/change-active";
export const ADMIN_ACCOUNT_LIST = "admin/account";
export const ADMIN_ACCOUNT_INFORMATION = "admin/account";
export const ADMIN_ACCOUNT_ACTIVATE = "admin/account/change-active";
export const ADMIN_ACCOUNT_BANNED_PHONE_LIST = "admin/ban";
export const ADMIN_ACCOUNT_BANNED_PHONE_ADD = "admin/ban/add";
export const ADMIN_ACCOUNT_BANNED_PHONE_REMOVE = "admin/ban/remove";
export const ADMIN_REPORT_CATCH_LIST = "admin/report/catch";
export const ADMIN_REPORT_LOCATION_LIST = "admin/report/location";
export const ADMIN_REPORT_POST_LIST = "admin/report/post";
export const ADMIN_REPORT_REVIEW_LIST = "admin/report/review";
export const ADMIN_FISHING_LOCATION_LIST = "admin/location";
export const ADMIN_FISHING_LOCATION_ACTIVATE = "admin/location/active";
export const ADMIN_FISHING_LOCATION_VERIFY = "admin/location/verify";
export const ADMIN_FISHING_LOCATION_SUGGEST_LIST = "admin/location/suggested";
export const ADMIN_FISHING_LOCATION_SUGGEST_REMOVE =
  "admin/location/suggested/remove";

export const STAFF_FIND_BY_PHONE = "findUserByPhone";
export const STAFF_ADD = "staff/add";
export const STAFF_DELETE = "staff/delete";

export const PERSONAL_CHECKIN = "personal/checkin";
export const PERSONAL_CATCH_REPORT = "personal/catch";
export const PERSONAL_CATCH_REPORT_DETAIL = "catches";
export const PERSONAL_SAVED_LOCATION = "personal/save";
export const PERSONAL_NOTIFICATION = "personal/notification";
export const PERSONAL_INFORMATION = "personal";
export const PERSONAL_OWNED_LOCATION = "location/manager";
export const PERSONAL_EDIT_PROFILE = "personal/edit";
export const PERSONAL_PASSWORD_CHANGE = "personal/changepassword";
export const PERSONAL_PHONE_CHANGE = "personal/changephone";

export const LOCATION_OVERVIEW = "location";
export const LOCATION_CHECKIN_STATUS = "checkin/status";
export const LOCATION_FISHES_ALL = "location/fishes";
export const LOCATION_CLOSE = "location/close";
export const LOCATION_CLOSE_TEMPORARY = "location/switch-state";
export const LOCATION_NEARBY = "location/nearby";
export const LOCATION_LAKE_ALL = "lake";
export const LOCATION_LAKE_CLOSE = "lake/close";
export const LOCATION_REVIEW_SCORE = "review/score";
export const LOCATION_REVIEW_PERSONAL = "review/me";
export const LOCATION_REVIEW_PERSONAL_DELETE = "review/me/delete";
export const LOCATION_REVIEW_PERSONAL_POST = "review/me/post";
export const LOCATION_ADD = "location/add";
export const LOCATION_SUGGEST = "location/suggest";
export const LOCATION_CATCH_REPORT_UNRESOLVED = "catch/pending";
export const LOCATION_CATCH_REPORT_APPROVE = "catches/approve";
export const LOCATION_CATCH_REPORT_PUBLIC = "catch/public";
export const LOCATION_CATCH_REPORT_RESOLVED = "catch/history";
export const LOCATION_ADVANCED_SEARCH = "location/search";

export const ADDRESS_ALL_PROVINCE = "address/province";
export const ADDRESS_PROVINCE_DISTRICT = "address/district";
export const ADDRESS_DISTRICT_WARD = "address/ward";

export const SEND_CATCH_REPORT = "catches/report";
export const REPORT_WRITE = "report/add";
export const CHECKIN = "checkin";
export const CHECKIN_STATUS = "personal/availability";
export const CHECKOUT = "location/checkout";

export const OTP_SEND_ANY = "util/otp/any";
export const OTP_SEND_EXISTED = "util/otp/existed";
export const OTP_SEND_NONEXISTED = "util/otp/nonexisted";
export const OTP_VALIDATE = "util/otp/validate";
