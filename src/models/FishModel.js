import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  fishList: [],
  setFishList: action((state, payload) => {
    state.fishList = payload;
  }),
  /**
   * Get fish list from api call
   */
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
  /**
   * Admin update a fish species
   * If its id is available, perform edit
   * Else add new
   * @param {Object} payload.submitData updated data of the fish species
   * @param {Function} payload.setSubmitStatus function to set update status
   */
  updateFish: thunk(async (actions, payload) => {
    const { id, submitData, setSubmitStatus } = payload;
    try {
      if (id) {
        await http.put(`${API_URL.ADMIN_FISH_EDIT}/${id}`, submitData);
      } else {
        await http.post(`${API_URL.ADMIN_FISH_ADD}`, submitData);
      }
      setSubmitStatus("SUCCESS");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
  }),

  /**
   * Update fish species status active or inactive
   * @param {Number} payload.id the fish's id
   * @param {Function} payload.setSubmitStatus function to set update status
   */
  updateFishStatus: thunk(async (actions, payload) => {
    const { id, setSubmitStatus } = payload;
    try {
      await http.patch(`${API_URL.ADMIN_FISH_UPDATE_STATUS}/${id}`);
      setSubmitStatus("SUCCESS");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
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
