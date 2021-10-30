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
   * Payload shape: <object>{provinceData<array>,}
   */
  setProvinceList: action((state, payload) => {
    state.provinceList = payload.provinceData;
  }),

  /**
   * Set district list of of current province
   * Payload shape: <object>{districtData<array>,}
   */
  setDistrictListByProvinceId: action((state, payload) => {
    state.districtList = payload.districtData;
  }),

  /**
   * Set district list of of current province
   * Payload shape: <object>{wardData<array>,}
   */
  setWardListByDistrictId: action((state, payload) => {
    state.wardList = payload.wardData;
  }),

  resetWardList: action((state) => {
    if (state.wardList.length !== 0) state.wardList = [];
  }),
  /**
   * Set previous selected province ID from the user
   * Payload shape: <object>{id<number>: // province id here}
   */
  setPrevSelectedProvinceId: action((state, payload) => {
    state.prevSelectedProvinceId = payload.id;
  }),

  /**
   * Set previous selected province ID from the user
   * Payload shape: <object>{id<number>: // district id here}
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
    if (provinceList.length === 0) {
      const { data } = await http.get(`${API_URL.ADDRESS_ALL_PROVINCE}`);
      // Shape of data: {id: 1, name: "Hà Nội", type: "Tỉnh/Thành phố"}
      actions.setProvinceList({ provinceData: data });
    }
  }),

  /**
   * Get all districts by province ID from api
   * Payload shape: <object>{id <number>: // province id here}
   */
  getDisctrictByProvinceId: thunk(async (actions, payload, { getState }) => {
    const { prevSelectedProvinceId } = getState();
    if (prevSelectedProvinceId !== payload.id) {
      const { data } = await http.get(`${API_URL.ADDRESS_PROVINCE_DISTRICT}`, {
        params: { provinceId: payload.id },
      });
      // Shape of data: {id: 1, name: "Hà Nội", type: "Quận/Huyện"}
      actions.setDistrictListByProvinceId({ districtData: data });
      actions.setPrevSelectedProvinceId({ id: payload.id });
      actions.resetWardList();
    }
  }),

  /**
   * Get all wards by district ID from api
   * Payload shape: <object>{id <number>: // district id here}
   */
  getWardByDistrictId: thunk(async (actions, payload, { getState }) => {
    const { prevSelectedDistrictId } = getState();
    if (prevSelectedDistrictId !== payload.id) {
      const { data } = await http.get(`${API_URL.ADDRESS_DISTRICT_WARD}`, {
        params: { districtId: payload.id },
      });
      // Shape of data: {id: 1, name: "Hà Nội", type: "Phường/Xã"}
      actions.setWardListByDistrictId({ wardData: data });
      actions.setPrevSelectedDistrictId({ id: payload.id });
    }
  }),
};

export default model;
