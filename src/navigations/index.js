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

const goToPostEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_POST_EDIT, { ...params });
};

const goToCatchReportVerifyDetailScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_CATCH_DETAIL, { ...params });
};

const goToLakeEditScreen = (navigation, params) => {
  navigation.navigate(ROUTE_NAMES.FMANAGE_LAKE_EDIT, { ...params });
};

export {
  goBack,
  goToCatchReportDetailScreen,
  goToCatchReportFormScreen,
  goToCatchReportVerifyDetailScreen,
  goToFishingLocationOverviewScreen,
  goToFManageMainScreen,
  goToFManageSelectScreen,
  goToLakeDetailScreen,
  goToLakeEditScreen,
  goToLogoScreen,
  goToPostEditScreen,
  goToScreen,
  goToWriteReportScreen,
  goToWriteReviewScreen,
};
