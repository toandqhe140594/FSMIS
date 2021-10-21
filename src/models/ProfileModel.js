import { action, thunk } from "easy-peasy";

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
  checkInHistoryList: [
    {
      id: "1",
      timeIn: "0/0/0",
      timeOut: "0/0/0",
      location: "Ho thuan viet",
    },
    {
      id: "1",
      timeIn: "0/0/0",
      timeOut: "0/0/0",
      location: "Ho thuan viet",
    },
  ],
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

  setUserInfo: action((state, payload) => {
    state.userInfo = payload;
  }),
  getUserInfo: thunk(async (actions) => {
    const { data } = await http.get(`personal`);
    actions.setUserInfo(data);
  }),
  setCatchReportHistory: action((state, payload) => {
    state.catchReportHistory = state.catchReportHistory.concat(payload);
  }),
  getCatchReportHistory: thunk(async (actions) => {
    const { data } = await http.get(`personal/catch`);
    actions.setCatchReportHistory(data);
  }),

  setCheckInHistoryList: action((state, payload) => {
    state.catchReportHistory = [
      ...state.catchReportHistoryList,
      ...payload.data,
    ];
  }),
  getCheckInHistoryList: action((state, payload) => {}),

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),
  getCatchReportDetailById: thunk(async (actions, payload) => {
    const { data } = await http.get(`personal/catch/${payload.id}`);

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
