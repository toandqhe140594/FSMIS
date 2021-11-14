import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
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
  verifyFishingLocation: thunk(async () => {}),
};

export default model;
