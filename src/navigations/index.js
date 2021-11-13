import { ROUTE_NAMES } from "../constants";

const goBack = (navigation, params) => {
  navigation.goBack({ ...params });
};
const goToScreen = (navigation, route, params) => {
  navigation.navigate(route, { ...params });
};

const goToLogoScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.LOGO);
};

const goToLoginScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.LOGIN);
};

const goToRegisterScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.REGISTER);
};

const goToRegisterInformationScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.REGISTER_INFORMATION);
};

const goToForgotPasswordScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.PASSWORD_FORGOT);
};

const goToChangePasswordScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.PASSWORD_CHANGE);
};

const goToOTPScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.OTP_SCREEN);
};

const goToLakeDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.LAKE_DETAIL, { ...params });
};

const goToFishingLocationOverviewScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FLOCATION_OVERVIEW, { ...params });
};

const goToWriteReportScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.WRITE_REPORT, { ...params });
};

const goToWriteReviewScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.WRITE_REVIEW, { ...params });
};

const goToCatchReportDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.CATCHES_REPORT_DETAIL, { ...params });
};

const goToCatchReportFormScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.CATCHES_REPORT_FORM, { ...params });
};

const goToFManageSelectScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_SELECTOR, { ...params });
};

const goToFManageMainScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_MAIN, { ...params });
};

const goToFManageAddNewScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW, {
    ...params,
  });
};

const goToFManageEditProfileScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_PROFILE_EDIT, {
    ...params,
  });
};

const goToFManageLocationPickScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LOCATION_PICK, {
    ...params,
  });
};

const goToFManageSuggestScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LOCATION_SUGGEST, {
    ...params,
  });
};

const goToFManageAddStaffScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_STAFF_ADD, {
    ...params,
  });
};

const goToFManageStaffDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_STAFF_DETAIL, {
    ...params,
  });
};

const goToFManageVerifyCheckinScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_CHECKIN_VERIFY, {
    ...params,
  });
};

const goToFManageLakeProfileScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LAKE_PROFILE, {
    ...params,
  });
};

const goToFManageLakeAddNewScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LAKE_ADD, {
    ...params,
  });
};

const goToFManageLakeEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LAKE_EDIT, {
    ...params,
  });
};

const goToFManageFishAddScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LAKE_FISH_ADD, { ...params });
};

const goToPostEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_POST_EDIT, { ...params });
};
const goToPostCreateScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_POST_CREATE, { ...params });
};

const goToCatchReportVerifyDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_CATCH_DETAIL, { ...params });
};

const goToMediaSelectScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.MEDIA_SELECTOR, { ...params });
};

const goToAdminAccountManagementScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT, {
    ...params,
  });
};

const goToAdminAccountManagementDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT_DETAIL, {
    ...params,
  });
};

const goToAdminFishManagementScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_FISH_MANAGEMENT, {
    ...params,
  });
};

const goToAdminFishEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT, {
    ...params,
  });
};

const goToAdminFishingMethodManagementScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT, {
    ...params,
  });
};

const goToAdminFishingMethodEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT_EDIT, {
    ...params,
  });
};

const goToAdminFLocationOverviewScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT_OVERVIEW, {
    ...params,
  });
};

const goToFManagePostScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_POST_MANAGEMENT, {
    ...params,
  });
};

const goToAdminFLocationReportDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_LOCATION_DETAIL, {
    ...params,
  });
};

const goToAdminReviewReportDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_REVIEW_DETAIL, {
    ...params,
  });
};

const goToAdminPostReportDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_POST_DETAIL, {
    ...params,
  });
};

const goToAdminBlacklistPhoneAddScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT_ADD, {
    ...params,
  });
};
const goToAdminCatchReportDetail = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.ADMIN_CATCH_REPORT_DETAIL, {
    ...params,
  });
};

export {
  goBack,
  goToAdminAccountManagementDetailScreen,
  goToAdminAccountManagementScreen,
  goToAdminBlacklistPhoneAddScreen,
  goToAdminCatchReportDetail,
  goToAdminFishEditScreen,
  goToAdminFishingMethodEditScreen,
  goToAdminFishingMethodManagementScreen,
  goToAdminFishManagementScreen,
  goToAdminFLocationOverviewScreen,
  goToAdminFLocationReportDetailScreen,
  goToAdminPostReportDetailScreen,
  goToAdminReviewReportDetailScreen,
  goToCatchReportDetailScreen,
  goToCatchReportFormScreen,
  goToCatchReportVerifyDetailScreen,
  goToChangePasswordScreen,
  goToFishingLocationOverviewScreen,
  goToFManageAddNewScreen,
  goToFManageAddStaffScreen,
  goToFManageEditProfileScreen,
  goToFManageFishAddScreen,
  goToFManageLakeAddNewScreen,
  goToFManageLakeEditScreen,
  goToFManageLakeProfileScreen,
  goToFManageLocationPickScreen,
  goToFManageMainScreen,
  goToFManagePostScreen,
  goToFManageSelectScreen,
  goToFManageStaffDetailScreen,
  goToFManageSuggestScreen,
  goToFManageVerifyCheckinScreen,
  goToForgotPasswordScreen,
  goToLakeDetailScreen,
  goToLoginScreen,
  goToLogoScreen,
  goToMediaSelectScreen,
  goToOTPScreen,
  goToPostCreateScreen,
  goToPostEditScreen,
  goToRegisterInformationScreen,
  goToRegisterScreen,
  goToScreen,
  goToWriteReportScreen,
  goToWriteReviewScreen,
};
