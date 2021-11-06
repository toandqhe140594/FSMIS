import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  // State contains list of fishing method
  fishingMethodList: [],
  /**
   * Set data for list of fishing methods
   */
  setFishingMethodList: action((state, payload) => {
    state.fishingMethodList = payload;
  }),
  /**
   * Get all fishing methods from APi
   */
  getFishingMethodList: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.ADMIN_FISHING_METHOD_LIST}`);
    actions.setFishingMethodList(data);
  }),
};
export default model;
