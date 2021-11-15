import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  // Shape of useInfo from api return
  userInfo: {
    id: 1,
    fullName: "Người dùng",
    avatarUrl: "",
    catchesCount: 0,
  },
  savedLocationList: [],
  notificationList: [],
  catchReportHistory: [],
  checkinHistoryList: [],
  catchReportDetail: {},
  catchHistoryCurrentPage: 1,
  catchHistoryTotalPage: 1,
  checkinHistoryCurrentPage: 1,
  checkinHistoryTotalPage: 1,
  savedLocationCurrentPage: 1,
  savedLocationTotalPage: 1,
  notificationCurrentPage: 1,
  notificationTotalPage: 1,

  setUserInfo: action((state, payload) => {
    state.userInfo = payload;
  }),
  getUserInfo: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.PERSONAL_INFORMATION}`);
    actions.setUserInfo(data);
  }),

  // Start of catch report history
  setCatchReportHistory: action((state, payload) => {
    state.catchReportHistory = state.catchReportHistory.concat(payload);
  }),
  rewriteCatchReportHistory: action((state, payload) => {
    state.catchReportHistory = payload;
  }),
  setCatchHistoryCurrentPage: action((state, payload) => {
    state.catchHistoryCurrentPage = payload;
  }),
  setCatchHistoryTotalPage: action((state, payload) => {
    state.catchHistoryTotalPage = payload;
  }),
  setTotalCatchesCount: action((state, payload) => {
    state.userInfo.catchesCount = payload;
  }),
  increaseCatchesCount: action((state) => {
    state.userInfo.catchesCount += 1;
  }),
  getCatchReportHistory: thunk(async (actions, payload, { getState }) => {
    const { catchHistoryCurrentPage, catchHistoryTotalPage } = getState();
    // If current page is smaller than 0 or larger than maximum page then return
    if (
      catchHistoryCurrentPage <= 0 ||
      catchHistoryCurrentPage > catchHistoryTotalPage
    )
      return;

    const { data } = await http.get(`${API_URL.PERSONAL_CATCH_REPORT}`, {
      params: { pageNo: catchHistoryCurrentPage },
    });
    const { totalPage, items, totalItem } = data;
    actions.setCatchHistoryCurrentPage(catchHistoryCurrentPage + 1);
    actions.setCatchHistoryTotalPage(totalPage);
    actions.setCatchReportHistory(items);
    actions.setTotalCatchesCount(totalItem);
  }),
  /**
   * Remove catch report history data
   */
  resetCatchReportHistory: thunk(async (actions) => {
    actions.setCatchHistoryCurrentPage(1);
    actions.setCatchHistoryTotalPage(1);
    actions.rewriteCatchReportHistory([]);
  }),
  // End of catch report history

  // Start of checkin history
  setCheckinHistoryList: action((state, payload) => {
    state.checkinHistoryList = state.checkinHistoryList.concat(payload);
  }),
  rewriteCheckinHistory: action((state, payload) => {
    state.checkinHistoryList = payload;
  }),
  setCheckinHistoryCurrentPage: action((state, payload) => {
    state.checkinHistoryCurrentPage = payload;
  }),
  setCheckinHistoryTotalPage: action((state, payload) => {
    state.checkinHistoryTotalPage = payload;
  }),
  getCheckinHistoryList: thunk(async (actions, payload, { getState }) => {
    const { checkinHistoryCurrentPage, checkinHistoryTotalPage } = getState();

    // If current page is smaller than 0 or larger than maximum page then return
    if (
      checkinHistoryCurrentPage <= 0 ||
      checkinHistoryCurrentPage > checkinHistoryTotalPage
    )
      return;

    const { data } = await http.get(`${API_URL.PERSONAL_CHECKIN}`, {
      params: { pageNo: checkinHistoryCurrentPage },
    });
    const { totalPage, items } = data;
    actions.setCheckinHistoryCurrentPage(checkinHistoryCurrentPage + 1);
    actions.setCheckinHistoryTotalPage(totalPage);
    actions.setCheckinHistoryList(items);
  }),
  /**
   * Remove catch report history data
   */
  resetCheckinHistory: thunk(async (actions) => {
    actions.setCheckinHistoryCurrentPage(1);
    actions.setCheckinHistoryTotalPage(1);
    actions.rewriteCheckinHistory([]);
  }),
  // End of checkin history

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),

  /**
   * Get catch report detail information by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.id] id of the catch report
   * @param {Function} [payload.setIsLoading] function indicate stop loading for data
   */
  getCatchReportDetailById: thunk(async (actions, payload) => {
    try {
      const { data, status } = await http.get(
        `${API_URL.PERSONAL_CATCH_REPORT_DETAIL}/${payload.id}`,
      );
      if (status === 200) {
        actions.setCatchReportDetail(data);
        payload.setIsLoading(false);
      }
    } catch (error) {
      actions.setCatchReportDetail({});
      payload.setIsLoading(false);
    }
  }),

  // Start of saved location list
  setSavedLocationCurrentPage: action((state, payload) => {
    state.savedLocationCurrentPage = payload;
  }),
  setSavedLocationTotalPage: action((state, payload) => {
    state.savedLocationTotalPage = payload;
  }),
  setSavedLocationList: action((state, payload) => {
    // If mode is overwrite then overwrite the list, else append the list with new data
    if (payload.mode === "Overwrite") state.savedLocationList = payload.data;
    else state.savedLocationList = state.savedLocationList.concat(payload.data);
  }),
  getSavedLocationList: thunk(async (actions, payload, { getState }) => {
    const { savedLocationCurrentPage, savedLocationTotalPage } = getState();
    let pageNo = savedLocationCurrentPage;
    // If user pull to refresh the list, then load data only from page 1
    if (payload && payload.mode && payload.mode === "refresh") pageNo = 1;
    // If current page is smaller than 0 or larger than maximum page then return
    if (pageNo <= 0 || pageNo > savedLocationTotalPage) return;
    const { data } = await http.get(`${API_URL.PERSONAL_SAVED_LOCATION}`, {
      params: { pageNo },
    });

    const { totalPage, items } = data;
    actions.setSavedLocationCurrentPage(pageNo + 1);
    actions.setSavedLocationTotalPage(totalPage);
    actions.setSavedLocationList({
      data: items,
      mode: pageNo === 1 ? "Overwrite" : "Append", // If page = 1 then overwrite the list
    });
  }),
  // End of saved location list

  setNotificationCurrentPage: action((state, payload) => {
    state.notificationCurrentPage = payload;
  }),
  setNotificationTotalPage: action((state, payload) => {
    state.notificationTotalPage = payload;
  }),
  setNotificationList: action((state, payload) => {
    state.notificationList = state.notificationList.concat(payload);
  }),
  getNotificationList: thunk(async (actions, payload, { getState }) => {
    const { notificationCurrentPage: pageNo, notificationTotalPage } =
      getState();

    // If current page is smaller than 0 or larger than maximum page then return
    if (pageNo <= 0 || pageNo > notificationTotalPage) return;
    const { data } = await http.get(`${API_URL.PERSONAL_NOTIFICATION}`, {
      params: { pageNo },
    });

    const { totalPage, items } = data;
    actions.setNotificationCurrentPage(pageNo + 1);
    actions.setNotificationTotalPage(totalPage);
    actions.setNotificationList(items);
  }),

  /**
   * Submit new report to server
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.id] the id of the element that is reported
   * @param {String} [payload.type] the type of the report
   * @param {String} [payload.content] the content of the report
   * @param {Function} [payload.setSuccess] the function to indicate success after request
   */
  writeNewReport: thunk(async (actions, payload) => {
    const { id, type, content, setSuccess } = payload;
    try {
      const { status } = await http.post(`${API_URL.REPORT_WRITE}`, {
        id,
        type,
        content,
      });
      if (status === 200) setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Update new edit to personal profile information
   * @param {Object} [payload.updateData] body of the post request
   * @param {Function} [payload.setUpdateStatus] set edit status back to the screen
   */
  editPersonalInformation: thunk(async (actions, payload) => {
    const { updateData, setUpdateStatus } = payload;
    try {
      await http.post(API_URL.PERSONAL_EDIT_PROFILE, updateData);
      actions.getUserInfo();
      setUpdateStatus("SUCCESS");
    } catch (error) {
      setUpdateStatus("FAILED");
    }
  }),

  /**
   * Change personal password
   * @param {object} [payload] params pass to function
   * @param {Function} [payload.setUpdateStatus] set status after request api
   * @param {object} [payload.updateData] object body pass to api
   * @param {string} [updateData.oldPassword] user old password
   * @param {string} [updateData.newPassword] new password
   */
  changePassword: thunk(async (actions, payload = {}) => {
    const updateData = payload.updateData || {
      newPassword: "",
      oldPassword: "",
    };
    const setUpdateStatus = payload.setUpdateStatus || (() => {});
    try {
      await http.post(API_URL.PERSONAL_PASSWORD_CHANGE, updateData);
      setUpdateStatus("SUCCESS");
    } catch (error) {
      setUpdateStatus("FAILED");
    }
  }),
};
export default model;
