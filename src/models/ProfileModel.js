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
