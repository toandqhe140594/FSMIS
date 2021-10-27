import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  fishingMethodList: [
    {
      id: 1,
      name: "Câu đơn",
    },
    {
      id: 2,
      name: "Câu đài",
    },
    {
      id: 3,
      name: "Câu lăng xê",
    },
  ],
  setFishingMethodList: action((state, payload) => {
    state.fishingMethodList = payload;
  }),
  getFishingMethodList: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.ADMIN_FISHING_METHOD_LIST}`);
    actions.setFishingMethodList(data);
  }),
};
export default model;
