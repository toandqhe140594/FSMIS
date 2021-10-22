import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  userInfo: {
    id: "1",
    name: "dat",
    gender: "male",
    address: "ha dong-ha noi",
    city: "Ha Noi",
    district: "Ha Dong",
    wards: "none",
  },
  savedLocationList: [],
  catchReportHistory: [],
  checkinHistoryList: [],
  catchReportDetail: {
    userId: "1",
    message: "Ngồi cả sáng",
    location: "Ho thuan viet",
    listImages: [
      "https://i.pinimg.com/originals/c4/6f/e1/c46fe1237fa5a04a2a2d6f127f191412.jpg",
      "https://everythingisviral.com/wp-content/uploads/2020/10/polite-cat.png",
    ],
    listCatch: [
      { id: "1", fishType: "Chep", quantity: "4", totalWeight: "8" },
      { id: "2", fishType: "Ro", quantity: "15", totalWeight: "1" },
      { id: "3", fishType: "Lang", quantity: "1", totalWeight: "8" },
    ],
  },
  catchHistoryCurrentPage: 1,
  catchHistoryTotalPage: 1,
  checkinHistoryCurrentPage: 1,
  checkinHistoryTotalPage: 1,
  savedLocationCurrentPage: 1,
  savedLocationTotalPage: 1,

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
  setCatchHistoryCurrentPage: action((state, payload) => {
    state.catchHistoryCurrentPage = payload;
  }),
  setCatchHistoryTotalPage: action((state, payload) => {
    state.catchHistoryTotalPage = payload;
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
    const { totalPage, items } = data;
    actions.setCatchHistoryCurrentPage(catchHistoryCurrentPage + 1);
    actions.setCatchHistoryTotalPage(totalPage);
    actions.setCatchReportHistory(items);
  }),
  // End of catch report history

  // Start of checkin history
  setCheckinHistoryList: action((state, payload) => {
    state.checkinHistoryList = state.checkinHistoryList.concat(payload);
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
  // End of checkin history

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),
  getCatchReportDetailById: thunk(async (actions, payload) => {
    const { data } = await http.get(
      `${API_URL.PERSONAL_CATCH_REPORT}/${payload.id}`,
    );

    actions.setCatchReportDetail(data);
  }),

  setSavedLocationCurrentPage: action((state, payload) => {
    state.savedLocationCurrentPage = payload;
  }),
  setSavedLocationTotalPage: action((state, payload) => {
    state.savedLocationTotalPage = payload;
  }),
  setSavedLocationList: action((state, payload) => {
    state.savedLocationList = state.savedLocationList.concat(payload);
  }),
  getSavedLocationList: thunk(async (actions, payload, { getState }) => {
    const { savedLocationCurrentPage: pageNo, savedLocationTotalPage } =
      getState();

    // If current page is smaller than 0 or larger than maximum page then return
    if (pageNo <= 0 || pageNo > savedLocationTotalPage) return;
    const { data } = await http.get(`${API_URL.PERSONAL_SAVED_LOCATION}`, {
      params: { pageNo },
    });

    const { totalPage, items } = data;
    actions.setSavedLocationCurrentPage(pageNo + 1);
    actions.setSavedLocationTotalPage(totalPage);
    actions.setSavedLocationList(items);
  }),
};
export default model;
