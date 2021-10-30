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

const goToPostEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_POST_EDIT, { ...params });
};

const goToCatchReportVerifyDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_CATCH_DETAIL, { ...params });
};

const goToLakeEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LAKE_EDIT, { ...params });
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

const goToFManageAddStaff = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_STAFF_ADD, {
    ...params,
  });
};
const goToFManageStaffDetail = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_STAFF_DETAIL, {
    ...params,
  });
};
const goToFManageStaffManagement = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_STAFF_MANAGEMENT, {
    ...params,
  });
};

export {
  goBack,
  goToAdminAccountManagementDetailScreen,
  goToAdminAccountManagementScreen,
  goToAdminFishEditScreen,
  goToAdminFishingMethodEditScreen,
  goToAdminFishingMethodManagementScreen,
  goToAdminFishManagementScreen,
  goToAdminFLocationOverviewScreen,
  goToCatchReportDetailScreen,
  goToCatchReportFormScreen,
  goToCatchReportVerifyDetailScreen,
  goToFishingLocationOverviewScreen,
  goToFManageAddStaff,
  goToFManageEditProfileScreen,
  goToFManageLocationPickScreen,
  goToFManageMainScreen,
  goToFManageSelectScreen,
  goToFManageStaffDetail,
  goToFManageStaffManagement,
  goToLakeDetailScreen,
  goToLakeEditScreen,
  goToLogoScreen,
  goToMediaSelectScreen,
  goToPostEditScreen,
  goToScreen,
  goToWriteReportScreen,
  goToWriteReviewScreen,
};
