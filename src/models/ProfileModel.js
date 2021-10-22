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
  savedLocationList: [
    {
      address: "140 Láng hòa lạc",
      name: "Hồ Câu Đầm Sòi",
      rate: 3.5,
      id: 2,
      image: "https://picsum.photos/500",
    },
    {
      address: "398 nhà thu minh",
      name: "Thu Lê Fishing Club",
      rate: 2.5,
      id: 10,
      image: "https://picsum.photos/500",
    },
    {
      address: "Hồ Phương Liệt",
      name: "Khu câu cá Hồ Phương Liệt",
      rate: 1.3,
      id: 9,
      image: "https://picsum.photos/500",
    },
  ],
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

  setSavedLocationList: action((state, payload) => {
    state.savedLocationList = payload;
  }),
  getSavedLocationList: thunk(async (actions, payload) => {
    // const { data } = await http.get(`location/nearby`, {
    //   params: { ...payload },
    // });
    // actions.setSavedLocationList(data);
  }),
};
export default model;
