import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

/**
 * Create object contains params to pass to search api from keyword and filtertype
 * @param {string} keyword search keyword
 * @param {string} filterType filter type
 * @returns object represent params to pass to search api
 */
const createLocationSearchObject = (keyword, filterType) => {
  const searchObject = {};
  if (keyword) Object.assign(searchObject, { input: keyword });
  if (filterType === "active" || filterType === "inactive")
    Object.assign(searchObject, { active: filterType === "active" });
  else if (filterType === "verified" || filterType === "notverified")
    Object.assign(searchObject, { verified: filterType === "verified" });
  return searchObject;
};

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
    const searchObject = createLocationSearchObject(keyword, filterType);
    const { currentPage: pageNo, totalPage: currentTotalPage } = getState();
    // If the page is invalid
    if (pageNo < 1 || pageNo > currentTotalPage) return;
    try {
      const {
        data: { totalPage, totalItem, items },
      } = await http.get(`${API_URL.ADMIN_FISHING_LOCATION_LIST}`, {
        params: {
          pageNo,
          ...searchObject,
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
    const searchObject = createLocationSearchObject(keyword, filterType);
    const setSuccess = payload.setSuccess || (() => {});
    try {
      const {
        data: { totalPage, totalItem, items },
      } = await http.get(`${API_URL.ADMIN_FISHING_LOCATION_LIST}`, {
        params: {
          pageNo: 1,
          ...searchObject,
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

  removeSuggestedLocationRecordFromList: action((state, payload) => {
    const foundIndex = state.suggestedLocationList.findIndex(
      (record) => record.id === payload.id,
    );
    if (foundIndex !== -1) state.suggestedLocationList.splice(foundIndex, 1);
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
      actions.removeSuggestedLocationRecordFromList({ id });
    } catch (error) {
      setSuccess(false);
    }
  }),

  /**
   * Admin create new location
   * @param {Object} payload.addData data of new location
   * @param {String} payload.addData.address
   * @param {String} payload.addData.description
   * @param {Number} payload.addData.latitude
   * @param {Number} payload.addData.longitude
   * @param {String} payload.addData.name
   * @param {String} payload.addData.phone
   * @param {String} payload.addData.rule
   * @param {String} payload.addData.service
   * @param {String} payload.addData.timetable
   * @param {Number} payload.addData.wardId
   * @param {String} payload.addData.website
   */
  createSuggestedLocation: thunk(async (actions, payload) => {
    const { addData } = payload;
    try {
      await http.post(
        `${API_URL.ADMIN_FISHING_LOCATION_SUGGEST_CREATE}`,
        addData,
      );
    } catch (error) {
      throw new Error();
    }
  }),
};

export default model;
