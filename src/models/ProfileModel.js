import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
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
  catchReportHistoryList: [
    {
      id: "1",
      name: "Đạt căng cực",
      message: "Ngồi cả sáng",
      catch: "Ro dong, Diec",
    },
    {
      id: "2",
      name: "Đạt căng cực",
      message: "Ngồi cả sáng",
      catch: "Diec",
    },
  ],
  checkInHistoryList: [
    {
      id: "1",
      timeIn: "0/0/0",
      timeOut: "0/0/0",
    },
    {
      id: "1",
      timeIn: "0/0/0",
      timeOut: "0/0/0",
    },
  ],
  

  setCatchReportHistoryList: action((state, payload) => {
    state.catchReportHistory = [
      ...state.catchReportHistoryList,
      ...payload.data,
    ];
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
