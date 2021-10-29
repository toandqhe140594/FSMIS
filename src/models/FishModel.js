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
  deleteFish: thunk(async (actions, payload) => {
    // const { data } = await http.delete(`${API_URL.ADMIN_FISH_DELETE}`);
    // actions.setFishList(data);
    alert("fish deleted", payload.id);
  }),
  addNewFish: thunk(async (actions, payload) => {
    // const { data } = await http.post(`${API_URL.ADMIN_FISH_ADD}`);
    // actions.setFishList(data);
    alert("fish added", payload);
  }),
  editFish: thunk(async (actions, payload) => {
    // const { data } = await http.post(`${API_URL.ADMIN_FISH_EDIT}`);
    // actions.setFishList(data);
    alert("fish edit", payload.id);
  }),
};
export default model;
