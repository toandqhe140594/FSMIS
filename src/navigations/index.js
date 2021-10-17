import * as ROUTE_NAMES from "../config/routeNames";

const goBack = (navigation) => {
  navigation.goBack();
};

const goToLogoScreen = (navigation) => {
  navigation.navigate(ROUTE_NAMES.LOGO);
};

// const goToLakeDetailScreen = (navigation, params) => {
//   navigation.navigate(LAKE_DETAIL, { ...params });
// };

// const goToFishingLocationOverviewScreen = (navigation, params) => {
//   navigation.navigate(FLOCATION_OVERVIEW, { ...params });
// };

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

export {
  goBack,
  goToCatchReportDetailScreen,
  goToCatchReportFormScreen,
  goToLogoScreen,
  goToWriteReportScreen,
  goToWriteReviewScreen,
};
