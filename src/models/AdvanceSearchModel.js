import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const DEFAULT_STATE = {
  input: "",
  provinceIdList: [],
  fishingMethodIdList: [],
  fishSpeciesIdList: [],
  score: 0,
};

const model = {
  prevStateData: {
    ...DEFAULT_STATE,
  },
  totaListLocationPage: 0,
  listLocationResult: [],
  pageNo: 1,

  /**
   * Save previous user's input
   */
  setPrevStateData: action((state, payload) => {
    state.prevStateData = payload.submitData;
  }),

  /**
   * Set listLocationResult state with set mode
   * @param {String} [payload.type] type of set case
   * @param {Array} [payload.items] data to set listLocationResult
   */
  setListLocationResult: action((state, payload) => {
    const { setMode, items } = payload;
    if (setMode === "APPEND") {
      state.listLocationResult = state.listLocationResult.concat(items);
    } else if (setMode === "NEW") {
      state.listLocationResult = items;
    }
  }),
  /**
   * Set new totalPage
   */
  setTotalPage: action((state, payload) => {
    state.totaListLocationPage = payload.totalPage;
  }),

  /**
   * Set new pageNo state
   * Use to set increment pageNo
   * Due to synchronous behaviour,
   * do increment outside and pass value to action payload
   * @param {Number} [payload] incremented value for pageNo
   */
  setPageNo: action((state, payload) => {
    state.pageNo = payload;
  }),

  /**
   * Reset previous stored state except input field
   */
  resetPrevStateData: action((state) => {
    state.prevStateData = { ...DEFAULT_STATE };
  }),

  /**
   * Reset pageNo to 1
   */
  resetPageNo: action((state) => {
    state.pageNo = 1;
  }),

  /**
   * Call search location api method
   * @param {Object} [payload.submitData] body's data for post method
   */
  searchFishingLocation: thunk(async (actions, payload) => {
    const { submitData } = payload;
    try {
      const { data } = await http.post(
        API_URL.LOCATION_ADVANCED_SEARCH,
        submitData,
        {
          params: { pageNo: 1 },
        },
      );
      const { totalPage, items } = data;
      actions.resetPageNo();
      actions.setPrevStateData({ submitData });
      actions.setTotalPage({ totalPage });
      actions.setListLocationResult({ setMode: "NEW", items });
    } catch (error) {
      throw new Error();
    }
  }),

  /**
   * Get list location next page
   */
  getListLocationNextPage: thunk(async (actions, payload, { getState }) => {
    const { prevStateData, pageNo } = getState();
    try {
      const { data } = await http.post(
        API_URL.LOCATION_ADVANCED_SEARCH,
        prevStateData,
        {
          params: { pageNo },
        },
      );
      const { totalPage, items } = data;
      actions.setTotalPage({ totalPage });
      actions.setListLocationResult({ setMode: "APPEND", items });
    } catch (error) {
      throw new Error();
    }
  }),
};

export default model;
