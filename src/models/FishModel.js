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
    const { id, setDeleteSuccess } = payload;
    try {
      // await http.delete(`${API_URL.ADMIN_FISH_DELETE}/${id}`);
      setDeleteSuccess(true);
      actions.removeFishFromList(id);
    } catch (error) {
      setDeleteSuccess(false);
    }
  }),
  addNewFish: thunk(async (actions, payload) => {
    // const { data } = await http.post(`${API_URL.ADMIN_FISH_ADD}`);
    // actions.setFishList(data);
    alert("fish added", payload);
  }),
  editFish: thunk(async (actions, payload) => {
    // const { id, setDeleteSuccess } = payload;
    // try {
    //   await http.delete(`${API_URL.ADMIN_FISH_EDIT}/${id}`);
    //   await setDeleteSuccess(true);
    //   actions.removeFishFromList(id);
    // } catch (error) {
    //   setDeleteSuccess(false);
    // }
  }),
  /**
   * Remove fish from the list data
   * @param {number} payload id of the fish
   */
  removeFishFromList: action((state, payload) => {
    state.fishList = state.fishList.filter((fish) => fish.id !== payload);
  }),
};
export default model;
