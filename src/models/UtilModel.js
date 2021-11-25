import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  fishingMethodList: [],
  addressList: [],
  provinceList: [],
  districtList: [],
  wardList: [],
  setDistrictList: action((state, payload = {}) => {
    const { provinceId } = payload;
    const foundIndex = state.addressList.findIndex(
      (address) => address.id === provinceId,
    );
    state.districtList = state.addressList[foundIndex].districtDtoOutList;
    state.wardList = [];
  }),
  setWardList: action((state, payload = {}) => {
    const { districtId } = payload;
    const foundIndex = state.districtList.findIndex(
      (address) => address.id === districtId,
    );
    state.wardList = state.districtList[foundIndex].wardDtoOutList;
  }),
  setAddressList: action((state, payload) => {
    state.addressList = payload;
    const provinceArr = [];
    payload.map((address) =>
      provinceArr.push({
        id: address.id,
        name: address.name,
      }),
    );
    state.provinceList = provinceArr;
  }),
  resetAddressData: action((state) => {
    state.districtList = [];
    state.wardList = [];
  }),
  getAllAddress: thunk(async (actions) => {
    try {
      const { data } = await http.get(`${API_URL.ADDRESS_ALL}`);
      actions.setAddressList(data);
    } catch (error) {
      actions.setAddressList([]);
    }
  }),
  getDistrictList: thunk(async (actions, payload) => {
    const { provinceId } = payload;
    actions.setDistrictList({ provinceId });
  }),
  getWardList: thunk(async (actions, payload) => {
    const { districtId } = payload;
    actions.setWardList({ districtId });
  }),
  /**
   * Send otp to any phone number
   * @param {object} payload - params pass to function
   * @param {string} payload.phone - phone number that need to receive otp
   * @param {string} [payload.existedStatus] - status indicate send otp to existed or non existed phone in the system
   */
  sendOtp: thunk(async (actions, payload = {}) => {
    const { phone, existedStatus } = payload;
    let requestUrl = API_URL.OTP_SEND_ANY;
    // Change request url base on existed status string
    if (existedStatus === "EXISTED") requestUrl = API_URL.OTP_SEND_EXISTED;
    else if (existedStatus === "NONEXISTED")
      requestUrl = API_URL.OTP_SEND_NONEXISTED;
    try {
      // await http.post(`${requestUrl}`, null, {
      //   params: {
      //     phone,
      //   },
      // });
    } catch (error) {
      throw new Error();
    }
  }),
  /**
   * Validate the otp corresponding with the phone number
   * @param {object} payload - params pass to function
   * @param {string} payload.phone - the corresponding phone number
   * @param {string} payload.otp - the otp that need to be validate with corresponding phone number
   */
  validateOtp: thunk(async (actions, payload) => {
    const { phone, otp } = payload;
    try {
      // await http.post(`${API_URL.OTP_VALIDATE}`, {
      //   phone,
      //   otp,
      // });
    } catch (error) {
      throw new Error();
    }
  }),
  /**
   * Reset password of a phone number
   * @param {object} payload - params pass to function
   * @param {string} payload.phone - the corresponding phone number
   * @param {string} payload.password - new password
   * @param {Function} [payload.setSuccess] - function indicate reset success
   */
  resetPassword: thunk(async (actions, payload) => {
    const { phone, password } = payload;
    const setSuccess = payload.setSuccess || (() => {});
    try {
      await http.post(`${API_URL.AUTHENTICATION_PASSWORD_RESET}`, {
        phone,
        password,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Call API to register new account
   */
  register: thunk(async (actions, payload) => {
    const { registerData } = payload;
    const setSuccess = payload.setSuccess || (() => {});
    try {
      await http.post(`${API_URL.AUTHENTICATION_REGISTER}`, registerData);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Set data for list of fishing methods
   */
  setFishingMethodList: action((state, payload) => {
    state.fishingMethodList = payload;
  }),
  /**
   * Get all fishing methods from API
   * @param {Function} [payload.setGetStatus] function to set get status
   */
  getFishingMethodList: thunk(async (actions, payload = {}) => {
    const setGetStatus = payload.setGetStatus || (() => {});
    try {
      const { data } = await http.get(API_URL.ADMIN_FISHING_METHOD_LIST);
      actions.setFishingMethodList(data);
      setGetStatus("SUCCESS");
    } catch (error) {
      // handler
      setGetStatus("FAILED");
    }
  }),
};
export default model;
