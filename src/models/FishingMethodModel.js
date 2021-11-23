import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  // State contains list of fishing method
  fishingMethodList: [],
  adminFishingMethodList: [],
  /**
   * Set data for list of fishing methods
   */
  setFishingMethodList: action((state, payload) => {
    state.fishingMethodList = payload;
  }),
  // /**
  //  * Clear fishing method list for next get
  //  */
  // clearFishingMethodList: action((state) => {
  //   state.fishingMethodList = null;
  // }),
  /**
   * Get all fishing methods from API
   * @param {Function} [payload.setGetStatus] function to set get status
   */
  getFishingMethodList: thunk(async (actions, payload = {}, { getState }) => {
    const setGetStatus = payload.setGetStatus || (() => {});
    const { fishingMethodList } = getState();
    try {
      const { data } = await http.get(API_URL.ADMIN_FISHING_METHOD_LIST);
      if (fishingMethodList.length !== data.length) {
        actions.setFishingMethodList(data);
      }
      setGetStatus("SUCCESS");
    } catch (error) {
      // handler
      setGetStatus("FAILED");
    }
  }),

  /**
   * Populates admin fishing method list or replace an item in the list
   * @param {String} payload.type type for setting fishing method list
   * @param {(Object|Object[])} payload.data data for setting
   */
  setAdminFishingMethodList: action((state, payload) => {
    const { type, data } = payload;
    switch (type) {
      case "DEFAULT":
        state.adminFishingMethodList = data;
        break;
      case "SELECTIVE": {
        const index = state.adminFishingMethodList.findIndex(
          (item) => item.id === data.id,
        );
        state.adminFishingMethodList[index] = data;
        break;
      }
      default:
    }
  }),

  /**
   * Update fishing method's status in admin fish list
   * @param {Number} payload.id the fish's id
   * @param {Boolean} payload.status the fish's new status
   */
  setMethodStatusInAdminList: action((state, payload) => {
    const { id, status } = payload;
    const index = state.adminFishingMethodList.findIndex(
      (item) => item.id === id,
    );
    const data = state.adminFishingMethodList[index];
    state.adminFishingMethodList[index] = { ...data, active: status };
  }),

  /**
   * Get admin fishing method list from api call
   * Returns both active and inactive methods in list
   */
  getAdminFishingMethodList: thunk(async (actions) => {
    const { data } = await http.get(
      `${API_URL.ADMIN_FISHING_METHOD_LIST_FULL}`,
    );
    actions.setAdminFishingMethodList({ type: "DEFAULT", data });
  }),

  /**
   * Admin update a fishing method in admin fishing method list
   * If its id is available, perform edit
   * Else add new
   * @param {Object} payload.submitData updated data of the fishing method
   * @param {Function} payload.setSubmitStatus function to set update status
   * @param {Number} [payload.id] id of the method
   * @param {Boolean} [payload.active] activation status of the method
   */
  updateFishingMethod: thunk(async (actions, payload) => {
    const { id, active, submitData, setSubmitStatus } = payload;
    try {
      if (id) {
        await http.put(
          `${API_URL.ADMIN_FISHING_METHOD_EDIT}/${id}`,
          submitData,
        );
        // id and active is required together
        const data = { ...submitData, id, active };
        actions.setAdminFishingMethodList({ type: "SELECTIVE", data });
      } else {
        await http.post(`${API_URL.ADMIN_FISHING_METHOD_ADD}`, submitData);
      }
      setSubmitStatus("SUCCESS");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
  }),

  /**
   * Update fishing method status to active or inactive in admin fishing method list
   * @param {Number} payload.id the method's id
   * @param {Boolean} payload.active the method's current status
   * @param {Function} payload.setSubmitStatus function to set update status
   */
  updateFishingMethodStatus: thunk(async (actions, payload) => {
    const { id, active, setSubmitStatus } = payload;
    try {
      await http.patch(`${API_URL.ADMIN_FISHING_METHOD_UPDATE_STATUS}/${id}`);
      actions.setMethodStatusInAdminList({ id, status: !active });
      setSubmitStatus("PATCHED");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
  }),
};
export default model;
