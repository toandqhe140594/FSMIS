import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  prevStateData: {
    provinceIdList: [],
    fishingMethodIdList: [],
    fishSpeciesIdList: [],
  },
  totaListLocationPage: 0,
  listLocationResult: [],
  pageNo: 1,

  /**
   * Set previous selected user's option to store in one of three state
   * @param {String} [payload.type] type of set case
   * @param {Array} [payload.prevState] previous state selected to store
   */
  setPrevIdList: action((state, payload) => {
    const { type, prevState } = payload;
    switch (type) {
      case "PROVINCE_ID_LIST":
        state.prevStateData.provinceIdList = prevState;
        break;
      case "FISHING_METHOD_ID_LIST":
        state.prevStateData.fishingMethodIdList = prevState;
        break;
      case "FISH_SPECIES_ID_LIST":
        state.prevStateData.fishSpeciesIdList = prevState;
        break;
      default:
    }
  }),

  /**
   * @param {String} [payload.type] type of set case
   * @param {Array} [payload.items] data to set listLocationResult
   */
  setListLocationResult: action((state, payload) => {
    const { type, items } = payload;
    if (type === "APPEND") {
      state.listLocationResult = state.listLocationResult.concat(items);
    } else if (type === "NEW") {
      state.listLocationResult = [].concat(items);
    }
  }),
  /**
   *
   */
  setTotalPage: action((state, payload) => {
    state.totaListLocationPage = payload.totalpage;
  }),

  /**
   *
   */
  incrementPageNo: action((state) => {
    state.pageNo += 1;
  }),

  /**
   * Reset previous stored state
   */
  resetAllPrevState: action((state) => {
    state.prevProvinceIdList = [];
    state.prevFishingMethodIdList = [];
    state.prevFishSpeciesIdList = [];
  }),

  /**
   * Reset pageNo to 1
   */
  resetPageNo: action((state) => {
    state.pageNo = 1;
  }),

  /**
   *
   */
  searchFishingLocation: thunk(async (actions, payload) => {
    const { submitData, setSubmitStatus } = payload;
    try {
      const { data } = await http.post(API_URL.LOCATION_ADVANCED_SEARCH, {
        params: { ...submitData, pageNo: 1 },
      });
      const { totalPage, items } = data;
      actions.resetPageNo();
      actions.setTotalPage({ totalPage });
      actions.setListLocationResult({ type: "NEW", items });
      setSubmitStatus("SUCCESS");
    } catch (error) {
      setSubmitStatus("FAILED");
      // handle error
    }
  }),

  getListLocationNextPage: thunk(async (actions, payload, { getState }) => {
    const { setGetStatus } = payload;
    const { prevStateData, pageNo, totaListLocationPage } = getState();
    try {
      if (pageNo < totaListLocationPage) {
        const { data } = await http.post(API_URL.LOCATION_ADVANCED_SEARCH, {
          params: { ...prevStateData, pageNo: pageNo + 1 },
        });
        const { totalPage, items } = data;
        actions.incrementPageNo();
        actions.setTotalPage({ totalPage });
        actions.setListLocationResult({ type: "APPEND", items });
      }
      setGetStatus("SUCCESS");
    } catch (error) {
      setGetStatus("FAILED");
      // handle error
    }
  }),
};

export default model;
