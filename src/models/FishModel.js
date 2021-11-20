import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  fishList: [],
  adminFishList: [],

  /**
   * Set working fish list ready
   */
  setFishList: action((state, payload) => {
    state.fishList = payload;
  }),

  /**
   * Get fish list from api call
   * Only list of active fish is returned
   */
  getFishList: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.ADMIN_FISH_LIST}`);
    actions.setFishList(data);
  }),

  /**
   * Populates admin fish list or replace an item in the list
   * @param {String} payload.type type for setting fishList
   * @param {(Object|Object[])} payload.data data for setting
   */
  setAdminFishList: action((state, payload) => {
    const { type, data } = payload;
    switch (type) {
      case "DEFAULT":
        state.adminFishList = data;
        break;
      case "SELECTIVE": {
        const index = state.adminFishList.findIndex(
          (item) => item.id === data.id,
        );
        state.adminFishList[index] = data;
        break;
      }
      default:
    }
  }),

  /**
   * Update fish status in admin fish list
   * @param {Number} payload.id the fish's id
   * @param {Boolean} payload.status the fish's new status
   */
  setFishStatusInAdminList: action((state, payload) => {
    const { id, status } = payload;
    const index = state.adminFishList.findIndex((item) => item.id === id);
    const data = state.adminFishList[index];
    state.adminFishList[index] = { ...data, active: status };
  }),

  /**
   * Get admin fish list from api call
   * Returns both active and inactive fish in list
   */
  getAdminFishList: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.ADMIN_FISH_LIST_FULL}`);
    actions.setAdminFishList({ type: "DEFAULT", data });
  }),

  /**
   * Admin update a fish species in admin fish list
   * If its id is available, perform edit
   * Else add new
   * @param {Object} payload.submitData updated data of the fish species
   * @param {Function} payload.setSubmitStatus function to set update status
   * @param {Number} [payload.id] id of the fish
   * @param {Boolean} [payload.active] activation status of the fish
   */
  updateFish: thunk(async (actions, payload) => {
    const { id, submitData, setSubmitStatus, active } = payload;
    try {
      if (id) {
        await http.put(`${API_URL.ADMIN_FISH_EDIT}/${id}`, submitData);
        // id and active is required together
        const data = { ...submitData, id, active };
        actions.setAdminFishList({ type: "SELECTIVE", data });
      } else {
        await http.post(`${API_URL.ADMIN_FISH_ADD}`, submitData);
      }
      setSubmitStatus("SUCCESS");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
  }),

  /**
   * Update fish species status active or inactive in admin fish list
   * @param {Number} payload.id the fish's id
   * @param {Boolean} payload.active the fish's current status
   * @param {Function} payload.setSubmitStatus function to set update status
   */
  updateFishStatus: thunk(async (actions, payload) => {
    const { id, setSubmitStatus, active } = payload;
    try {
      await http.patch(`${API_URL.ADMIN_FISH_UPDATE_STATUS}/${id}`);
      actions.setFishStatusInAdminList({ id, status: !active });
      setSubmitStatus("PATCHED");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
  }),
};
export default model;
