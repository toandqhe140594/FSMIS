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
   * Get all fishing methods from API
   * @param {Function} [payload.setIsLoading] set status after api called
   */
  getFishingMethodList: thunk(async (actions, payload) => {
    const { setIsLoading } = payload;
    const { data } = await http.get(`${API_URL.ADMIN_FISHING_METHOD_LIST}`);
    actions.setFishingMethodList(data);
    setIsLoading(false);
  }),
};
export default model;
