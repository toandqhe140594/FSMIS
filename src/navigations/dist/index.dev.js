"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToWriteReviewScreen = exports.goToWriteReportScreen = exports.goToScreen = exports.goToRegisterScreen = exports.goToRegisterInformationScreen = exports.goToPostEditScreen = exports.goToPostCreateScreen = exports.goToOTPScreen = exports.goToMediaSelectScreen = exports.goToLogoScreen = exports.goToLoginScreen = exports.goToLakeDetailScreen = exports.goToForgotPasswordScreen = exports.goToFManageVerifyCheckinScreen = exports.goToFManageSuggestScreen = exports.goToFManageStaffDetailScreen = exports.goToFManageSelectScreen = exports.goToFManagePostScreen = exports.goToFManageMainScreen = exports.goToFManageLocationPickScreen = exports.goToFManageLakeProfileScreen = exports.goToFManageLakeEditScreen = exports.goToFManageLakeAddNewScreen = exports.goToFManageFishAddScreen = exports.goToFManageEditProfileScreen = exports.goToFManageAddStaffScreen = exports.goToFManageAddNewScreen = exports.goToFishingLocationOverviewScreen = exports.goToChangePasswordScreen = exports.goToCatchReportVerifyDetailScreen = exports.goToCatchReportFormScreen = exports.goToCatchReportDetailScreen = exports.goToAdminReviewReportDetailScreen = exports.goToAdminPostReportDetailScreen = exports.goToAdminFLocationReportDetailScreen = exports.goToAdminFLocationOverviewScreen = exports.goToAdminFishManagementScreen = exports.goToAdminFishingMethodManagementScreen = exports.goToAdminFishingMethodEditScreen = exports.goToAdminFishEditScreen = exports.goToAdminAccountManagementScreen = exports.goToAdminAccountManagementDetailScreen = exports.goBack = void 0;

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var goBack = function goBack(navigation, params) {
  navigation.goBack(_objectSpread({}, params));
};

exports.goBack = goBack;

var goToScreen = function goToScreen(navigation, route, params) {
  navigation.navigate(route, _objectSpread({}, params));
};

exports.goToScreen = goToScreen;

var goToLogoScreen = function goToLogoScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.LOGO);
};

exports.goToLogoScreen = goToLogoScreen;

var goToLoginScreen = function goToLoginScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.LOGIN);
};

exports.goToLoginScreen = goToLoginScreen;

var goToRegisterScreen = function goToRegisterScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.REGISTER);
};

exports.goToRegisterScreen = goToRegisterScreen;

var goToRegisterInformationScreen = function goToRegisterInformationScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.REGISTER_INFORMATION);
};

exports.goToRegisterInformationScreen = goToRegisterInformationScreen;

var goToForgotPasswordScreen = function goToForgotPasswordScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.PASSWORD_FORGOT);
};

exports.goToForgotPasswordScreen = goToForgotPasswordScreen;

var goToChangePasswordScreen = function goToChangePasswordScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.PASSWORD_CHANGE);
};

exports.goToChangePasswordScreen = goToChangePasswordScreen;

var goToOTPScreen = function goToOTPScreen(navigation) {
  navigation.navigate(_constants.ROUTE_NAMES.OTP_SCREEN);
};

exports.goToOTPScreen = goToOTPScreen;

var goToLakeDetailScreen = function goToLakeDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.LAKE_DETAIL, _objectSpread({}, params));
};

exports.goToLakeDetailScreen = goToLakeDetailScreen;

var goToFishingLocationOverviewScreen = function goToFishingLocationOverviewScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FLOCATION_OVERVIEW, _objectSpread({}, params));
};

exports.goToFishingLocationOverviewScreen = goToFishingLocationOverviewScreen;

var goToWriteReportScreen = function goToWriteReportScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.WRITE_REPORT, _objectSpread({}, params));
};

exports.goToWriteReportScreen = goToWriteReportScreen;

var goToWriteReviewScreen = function goToWriteReviewScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.WRITE_REVIEW, _objectSpread({}, params));
};

exports.goToWriteReviewScreen = goToWriteReviewScreen;

var goToCatchReportDetailScreen = function goToCatchReportDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.CATCHES_REPORT_DETAIL, _objectSpread({}, params));
};

exports.goToCatchReportDetailScreen = goToCatchReportDetailScreen;

var goToCatchReportFormScreen = function goToCatchReportFormScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.CATCHES_REPORT_FORM, _objectSpread({}, params));
};

exports.goToCatchReportFormScreen = goToCatchReportFormScreen;

var goToFManageSelectScreen = function goToFManageSelectScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_SELECTOR, _objectSpread({}, params));
};

exports.goToFManageSelectScreen = goToFManageSelectScreen;

var goToFManageMainScreen = function goToFManageMainScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_MAIN, _objectSpread({}, params));
};

exports.goToFManageMainScreen = goToFManageMainScreen;

var goToFManageAddNewScreen = function goToFManageAddNewScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW, _objectSpread({}, params));
};

exports.goToFManageAddNewScreen = goToFManageAddNewScreen;

var goToFManageEditProfileScreen = function goToFManageEditProfileScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_PROFILE_EDIT, _objectSpread({}, params));
};

exports.goToFManageEditProfileScreen = goToFManageEditProfileScreen;

var goToFManageLocationPickScreen = function goToFManageLocationPickScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_LOCATION_PICK, _objectSpread({}, params));
};

exports.goToFManageLocationPickScreen = goToFManageLocationPickScreen;

var goToFManageSuggestScreen = function goToFManageSuggestScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_LOCATION_SUGGEST, _objectSpread({}, params));
};

exports.goToFManageSuggestScreen = goToFManageSuggestScreen;

var goToFManageAddStaffScreen = function goToFManageAddStaffScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_STAFF_ADD, _objectSpread({}, params));
};

exports.goToFManageAddStaffScreen = goToFManageAddStaffScreen;

var goToFManageStaffDetailScreen = function goToFManageStaffDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_STAFF_DETAIL, _objectSpread({}, params));
};

exports.goToFManageStaffDetailScreen = goToFManageStaffDetailScreen;

var goToFManageVerifyCheckinScreen = function goToFManageVerifyCheckinScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_CHECKIN_VERIFY, _objectSpread({}, params));
};

exports.goToFManageVerifyCheckinScreen = goToFManageVerifyCheckinScreen;

var goToFManageLakeProfileScreen = function goToFManageLakeProfileScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_LAKE_PROFILE, _objectSpread({}, params));
};

exports.goToFManageLakeProfileScreen = goToFManageLakeProfileScreen;

var goToFManageLakeAddNewScreen = function goToFManageLakeAddNewScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_LAKE_ADD, _objectSpread({}, params));
};

exports.goToFManageLakeAddNewScreen = goToFManageLakeAddNewScreen;

var goToFManageLakeEditScreen = function goToFManageLakeEditScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_LAKE_EDIT, _objectSpread({}, params));
};

exports.goToFManageLakeEditScreen = goToFManageLakeEditScreen;

var goToFManageFishAddScreen = function goToFManageFishAddScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_LAKE_FISH_ADD, _objectSpread({}, params));
};

exports.goToFManageFishAddScreen = goToFManageFishAddScreen;

var goToPostEditScreen = function goToPostEditScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_POST_EDIT, _objectSpread({}, params));
};

exports.goToPostEditScreen = goToPostEditScreen;

var goToPostCreateScreen = function goToPostCreateScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_POST_CREATE, _objectSpread({}, params));
};

exports.goToPostCreateScreen = goToPostCreateScreen;

var goToCatchReportVerifyDetailScreen = function goToCatchReportVerifyDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_CATCH_DETAIL, _objectSpread({}, params));
};

exports.goToCatchReportVerifyDetailScreen = goToCatchReportVerifyDetailScreen;

var goToMediaSelectScreen = function goToMediaSelectScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.MEDIA_SELECTOR, _objectSpread({}, params));
};

exports.goToMediaSelectScreen = goToMediaSelectScreen;

var goToAdminAccountManagementScreen = function goToAdminAccountManagementScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT, _objectSpread({}, params));
};

exports.goToAdminAccountManagementScreen = goToAdminAccountManagementScreen;

var goToAdminAccountManagementDetailScreen = function goToAdminAccountManagementDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT_DETAIL, _objectSpread({}, params));
};

exports.goToAdminAccountManagementDetailScreen = goToAdminAccountManagementDetailScreen;

var goToAdminFishManagementScreen = function goToAdminFishManagementScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_FISH_MANAGEMENT, _objectSpread({}, params));
};

exports.goToAdminFishManagementScreen = goToAdminFishManagementScreen;

var goToAdminFishEditScreen = function goToAdminFishEditScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_FISH_MANAGEMENT_EDIT, _objectSpread({}, params));
};

exports.goToAdminFishEditScreen = goToAdminFishEditScreen;

var goToAdminFishingMethodManagementScreen = function goToAdminFishingMethodManagementScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT, _objectSpread({}, params));
};

exports.goToAdminFishingMethodManagementScreen = goToAdminFishingMethodManagementScreen;

var goToAdminFishingMethodEditScreen = function goToAdminFishingMethodEditScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_FISHING_METHOD_MANAGEMENT_EDIT, _objectSpread({}, params));
};

exports.goToAdminFishingMethodEditScreen = goToAdminFishingMethodEditScreen;

var goToAdminFLocationOverviewScreen = function goToAdminFLocationOverviewScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_LOCATION_MANAGEMENT_OVERVIEW, _objectSpread({}, params));
};

exports.goToAdminFLocationOverviewScreen = goToAdminFLocationOverviewScreen;

var goToFManagePostScreen = function goToFManagePostScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.FMANAGE_POST_MANAGEMENT, _objectSpread({}, params));
};

exports.goToFManagePostScreen = goToFManagePostScreen;

var goToAdminFLocationReportDetailScreen = function goToAdminFLocationReportDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_LOCATION_DETAIL, _objectSpread({}, params));
};

exports.goToAdminFLocationReportDetailScreen = goToAdminFLocationReportDetailScreen;

var goToAdminReviewReportDetailScreen = function goToAdminReviewReportDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_REVIEW_DETAIL, _objectSpread({}, params));
};

exports.goToAdminReviewReportDetailScreen = goToAdminReviewReportDetailScreen;

var goToAdminPostReportDetailScreen = function goToAdminPostReportDetailScreen(navigation, params) {
  navigation.navigate(_constants.ROUTE_NAMES.ADMIN_REPORT_MANAGEMENT_POST_DETAIL, _objectSpread({}, params));
};

exports.goToAdminPostReportDetailScreen = goToAdminPostReportDetailScreen;