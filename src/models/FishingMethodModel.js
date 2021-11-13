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
   * Clear fishing method list for next get
   */
  clearFishingMethodList: action((state) => {
    state.fishingMethodList = null;
  }),
  /**
   * Get all fishing methods from API
   * @param {Function} [payload.setGetStatus] function to set get status
   */
  getFishingMethodList: thunk(async (actions, payload) => {
    const setGetStatus = payload.setGetStatus || (() => {});
    try {
      const { data } = await http.get(API_URL.ADMIN_FISHING_METHOD_LIST);
      actions.setFishingMethodList(data);
      setGetStatus("SUCCESS");
    } catch (error) {
      // handler
      setGetStatus("FAILED");
    }
  }),
};
export default model;
