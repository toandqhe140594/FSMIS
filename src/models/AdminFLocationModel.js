import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  suggestedLocationList: [],
  fishingLocationList: [], // Data of fishing locations
  currentPage: 1, // Current page of data
  totalPage: 1, // Maximum page of data
  totalItem: 0, // Total items of fishing locations

  setFishingLocationList: action((state, payload) => {
    const { data, isOverwrite } = payload;
    if (isOverwrite) state.fishingLocationList = data;
    else state.fishingLocationList = state.fishingLocationList.concat(data);
  }),
  setCurrentPage: action((state, payload) => {
    state.currentPage = payload < 1 ? 1 : payload;
  }),
  setTotalPage: action((state, payload) => {
    state.totalPage = payload < 1 ? 1 : payload;
  }),
  setTotalItem: action((state, payload) => {
    state.totalItem = payload;
  }),
  /**
   * Get fishing location list data
   * @param {string} [payload.filterType] type of filter for data
   * @param {string} [payload.keyword] keyword to search
   * @param {Function} [payload.setSuccess] indicate call api success
   */
  getFishingLocationList: thunk(async (actions, payload = {}, { getState }) => {
    const filterType = payload.filterType ? payload.filterType : "all";
    const keyword = payload.keyword ? payload.keyword : "";
    const setSuccess = payload.setSuccess || (() => {});
    const { currentPage: pageNo, totalPage: currentTotalPage } = getState();
    // If the page is invalid
    if (pageNo < 1 || pageNo > currentTotalPage) return;
    try {
      const {
        data: { totalPage, totalItem, items },
      } = await http.get(`${API_URL.ADMIN_FISHING_LOCATION_LIST}`, {
        params: {
          pageNo,
          filterType,
          keyword,
        },
      });
      actions.setFishingLocationList({
        data: items,
        isOverwrite: pageNo === 1,
      });
      actions.setCurrentPage(pageNo + 1);
      actions.setTotalPage(totalPage);
      actions.setTotalItem(totalItem);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Get fishing location list data from page 1 and overwrite the current list
   * @param {string} [payload.filterType] type of filter for data
   * @param {string} [payload.keyword] keyword to search
   * @param {Function} [payload.setSuccess] indicate call api success
   */
  getFishingLocationListOverwrite: thunk(async (actions, payload = {}) => {
    const filterType = payload.filterType ? payload.filterType : "all";
    const keyword = payload.keyword || "";
    const setSuccess = payload.setSuccess || (() => {});
    try {
      const {
        data: { totalPage, totalItem, items },
      } = await http.get(`${API_URL.ADMIN_FISHING_LOCATION_LIST}`, {
        params: {
          pageNo: 1,
          filterType,
          keyword,
        },
      });
      actions.setFishingLocationList({
        data: items,
        isOverwrite: true,
      });
      actions.setCurrentPage(2);
      actions.setTotalPage(totalPage);
      actions.setTotalItem(totalItem);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),

  /**
   * Change verify state of a fishing location in list data
   */
  changeVerifyState: action((state, payload) => {
    const foundIndex = state.fishingLocationList.findIndex(
      (location) => location.id === payload.id,
    );
    state.fishingLocationList[foundIndex].verified =
      !state.fishingLocationList[foundIndex].verified;
  }),
  /**
   * Change active state of a fishing location in list data
   */
  changeActiveState: action((state, payload) => {
    const foundIndex = state.fishingLocationList.findIndex(
      (location) => location.id === payload.id,
    );
    state.fishingLocationList[foundIndex].active =
      !state.fishingLocationList[foundIndex].active;
  }),
  /**
   * Call API to change verify state of a fishing location
   * @param {Object} payload - params pass to function
   * @param {number} payload.id - id of the fishing location
   * @param {Function} [payload.setLoading] - set loading state
   * @param {Function} [payload.setSuccess] - function indicate action success
   */
  verifyFishingLocation: thunk(async (actions, payload) => {
    const { id } = payload;
    const setLoading = payload.setLoading || (() => {});
    const setSuccess = payload.setSuccess || (() => {});
    try {
      await http.post(`${API_URL.ADMIN_FISHING_LOCATION_VERIFY}/${id}`);
      actions.changeVerifyState({ id });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    }
  }),
  /**
   * Call API to change active state of a fishing location
   * @param {Object} payload - params pass to function
   * @param {number} payload.id - id of the fishing location
   * @param {Function} [payload.setLoading] - set loading state
   * @param {Function} [payload.setSuccess] - function indicate action success
   */
  activateFishingLocation: thunk(async (actions, payload) => {
    const { id } = payload;
    const setLoading = payload.setLoading || (() => {});
    const setSuccess = payload.setSuccess || (() => {});
    try {
      await http.post(`${API_URL.ADMIN_FISHING_LOCATION_ACTIVATE}/${id}`);
      actions.changeActiveState({ id });
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
    }
  }),

  setSuggestedLocationList: action((state, payload) => {
    state.suggestedLocationList = payload;
  }),

  getSuggestedLocationList: thunk(async (actions) => {
    try {
      const { data } = await http.get(
        `${API_URL.ADMIN_FISHING_LOCATION_SUGGEST_LIST}`,
      );
      actions.setSuggestedLocationList(data);
    } catch (error) {
      actions.setSuggestedLocationList(null);
    }
  }),

  removeSuggestedLocation: thunk(async (actions, payload) => {
    const { setSuccess, id } = payload;
    try {
      await http.delete(
        `${API_URL.ADMIN_FISHING_LOCATION_SUGGEST_REMOVE}/${id}`,
      );
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
};

export default model;
