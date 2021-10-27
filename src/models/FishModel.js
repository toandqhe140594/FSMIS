import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  fishList: [],
  setFishList: action((state, payload) => {
    state.fishList = payload;
  }),
  getFishList: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.ADMIN_FISH_LIST}`);
    actions.setFishList(data);
  }),
};
export default model;
