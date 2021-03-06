import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const initialState = {
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
};

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
  /**
   * Set personal catch report history
   * @param {Boolean} payload.nextPage whether items from payload is the next page
   * @param {Array} payload.items items of catch report history for setting
   */
  setCatchReportHistory: action((state, payload) => {
    const { nextPage, items } = payload;
    if (nextPage) {
      state.catchReportHistory = state.catchReportHistory.concat(items);
    } else state.catchReportHistory = items;
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
  /**
   * Get personal catch report history list by pagination
   * @param {Boolean} payload.nextPage should function get next page or get the first page, default is false
   */
  getCatchReportHistory: thunk(async (actions, payload, { getState }) => {
    const { nextPage } = payload;
    const { catchHistoryCurrentPage, catchHistoryTotalPage } = getState();
    let index = 1;
    if (nextPage) {
      if (
        catchHistoryCurrentPage <= 0 ||
        catchHistoryCurrentPage > catchHistoryTotalPage
      ) {
        return;
      }
      index = catchHistoryCurrentPage;
    }
    const { data } = await http.get(`${API_URL.PERSONAL_CATCH_REPORT}`, {
      params: { pageNo: index },
    });
    const { totalPage, items, totalItem } = data;
    actions.setTotalCatchesCount(totalItem);
    actions.setCatchHistoryTotalPage(totalPage);
    actions.setCatchHistoryCurrentPage(index + 1);
    actions.setCatchReportHistory({ items, nextPage });
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
    state.savedLocationTotalPage = payload < 1 ? 1 : payload;
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
  setNotificationListOverwrite: action((state, payload) => {
    state.notificationList = payload;
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
   * Get notification list from page 1 and overwrite the current notifications list
   */
  getNotificationListOverwrite: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.PERSONAL_NOTIFICATION}`, {
      params: { pageNo: 1 },
    });

    const { totalPage, items } = data;
    actions.setNotificationCurrentPage(2);
    actions.setNotificationTotalPage(totalPage);
    actions.setNotificationListOverwrite(items);
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
   */
  editPersonalInformation: thunk(async (actions, payload) => {
    const { updateData } = payload;
    try {
      await http.post(API_URL.PERSONAL_EDIT_PROFILE, updateData);
      actions.getUserInfo();
    } catch (error) {
      throw new Error("");
    }
  }),

  /**
   * Change personal password
   * @param {object} [payload] params pass to function
   * @param {object} [payload.updateData] object body pass to api
   * @param {string} [updateData.oldPassword] user old password
   * @param {string} [updateData.newPassword] new password
   */
  changePassword: thunk(async (actions, payload = {}) => {
    const updateData = payload.updateData || {
      newPassword: "",
      oldPassword: "",
    };
    try {
      await http.post(API_URL.PERSONAL_PASSWORD_CHANGE, updateData);
    } catch (error) {
      throw new Error();
    }
  }),

  /**
   * Change personal account phone number
   * @param {object} [payload] params pass to function
   * @param {string} [payload.newPhone] new phone number
   * @param {string} [payload.password] current account password
   */
  changePhoneNumber: thunk(async (actions, payload = {}) => {
    const { phone: newPhone, password } = payload;
    try {
      await http.post(API_URL.PERSONAL_PHONE_CHANGE, {
        newPhone,
        password,
      });
    } catch (error) {
      throw new Error();
    }
  }),

  /**
   * Reset all state of model to default value
   */
  reset: action(() => ({
    ...initialState,
  })),
};

export default model;
