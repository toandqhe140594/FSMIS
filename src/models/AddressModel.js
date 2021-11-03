import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  provinceList: [],
  districtList: [],
  wardList: [],
  prevSelectedProvinceId: 0,
  prevSelectedDistrictId: 0,

  /*
   * Clear district and ward list
   */
  resetDataList: action((state) => {
    state.districtList = [];
    state.wardList = [];
    state.prevSelectedProvinceId = 0;
    state.prevSelectedDistrictId = 0;
  }),

  /**
   * Set province list
   * Payload @param {Array} provinceData: array of {id, name, type}
   */
  setProvinceList: action((state, payload) => {
    state.provinceList = payload.provinceData;
  }),

  /**
   * Set district list of of current province
   * Payload @param {Array} districtData: array of {id, name, type}
   */
  setDistrictListByProvinceId: action((state, payload) => {
    state.districtList = payload.districtData;
  }),

  /**
   * Set district list of of current province
   * Payload @param {Array} wardData: array of {id, name, type}
   */
  setWardListByDistrictId: action((state, payload) => {
    state.wardList = payload.wardData;
  }),

  /**
   * Reset ward list
   */
  resetWardList: action((state) => {
    if (state.wardList) {
      state.wardList = [];
    }
  }),

  /**
   * Reset ward list
   */
  resetDistrictList: action((state) => {
    if (state.districtList) {
      state.districtList = [];
    }
  }),

  /**
   * Set previous selected province ID from the user
   * Payload @param {Number} id: province
   */
  setPrevSelectedProvinceId: action((state, payload) => {
    state.prevSelectedProvinceId = payload.id;
  }),

  /**
   * Set previous selected province ID from the user
   * Payload @param {Number} id: district id
   */
  setPrevSelectedDistrictId: action((state, payload) => {
    state.prevSelectedDistrictId = payload.id;
  }),

  /**
   * Get all provinces from api
   */
  getAllProvince: thunk(async (actions, payload, { getState }) => {
    const { provinceList } = getState();
    // Get province list if it is empty
    if (!provinceList.length) {
      const { data: provinceData } = await http.get(
        `${API_URL.ADDRESS_ALL_PROVINCE}`,
      );
      actions.setProvinceList({ provinceData });
    }
  }),

  /**
   * Get all districts by province ID from api
   * Payload @param {Number} id: province id
   */
  getDisctrictByProvinceId: thunk(async (actions, payload, { getState }) => {
    const { prevSelectedProvinceId } = getState();
    if (prevSelectedProvinceId !== payload.id) {
      actions.resetDistrictList();
      actions.resetWardList();
      const { data: districtData } = await http.get(
        `${API_URL.ADDRESS_PROVINCE_DISTRICT}`,
        {
          params: { provinceId: payload.id },
        },
      );
      // Shape of data: {id: 1, name: "Hà Nội", type: "Quận/Huyện"}
      actions.setDistrictListByProvinceId({ districtData });
      actions.setPrevSelectedProvinceId({ id: payload.id });
    }
  }),

  /**
   * Get all wards by district ID from api
   * Payload @param {Number} id: district id
   */
  getWardByDistrictId: thunk(async (actions, payload, { getState }) => {
    const { prevSelectedDistrictId } = getState();
    if (prevSelectedDistrictId !== payload.id) {
      actions.resetWardList();
      const { data: wardData } = await http.get(
        `${API_URL.ADDRESS_DISTRICT_WARD}`,
        {
          params: { districtId: payload.id },
        },
      );
      actions.setWardListByDistrictId({ wardData });
      actions.setPrevSelectedDistrictId({ id: payload.id });
    }
  }),
};

export default model;
