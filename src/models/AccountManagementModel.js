import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

// initial state for test purpose only since there wasnot api for get account information
const initialAccountInformation = {
  id: 1,
  name: "Nguyễn Tài Khoản",
  dob: "01/01/2021",
  phone: "098765433",
  gender: true,
  address: "Số 1 hồ Hoàn Kiếm Việt Nam Hà Nội Châu Đại Dương",
  status: true,
};

const model = {
  accountList: [],
  accountInformation: {},
  accountTotalPage: 1,
  accountTotalCounts: null,
  blacklist: null,
  setAccountList: action((state, payload) => {
    state.accountList = state.accountList.concat(payload);
  }),

  setAccountInformation: action((state, payload) => {
    state.accountInformation = payload;
  }),
  setAccountTotalPage: action((state, payload) => {
    state.accountTotalPage = payload < 1 ? 1 : payload;
  }),
  setAccountTotalCounts: action((state, payload) => {
    state.accountTotalCounts = payload;
  }),
  getAccountList: thunk(async (actions, payload, { getState }) => {
    const pageNo = payload.pageNo || 1;
    const setIsLoading = payload.setIsLoading || (() => {});
    const { accountTotalPage } = getState();
    if (pageNo < 1 || pageNo > accountTotalPage) return;
    try {
      const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_LIST}`, {
        params: {
          pageNo,
        },
      });
      const { totalPage, totalItem, items } = data;
      await actions.setAccountList(items);
      actions.setAccountTotalCounts(totalItem);
      actions.setAccountTotalPage(totalPage);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      actions.setAccountList([]);
      actions.setAccountTotalCounts(null);
    }
  }),
  clearAccountList: action((state) => {
    state.accountList = [];
  }),
  getAccountInformation: thunk(async (actions) => {
    // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_INFORMATION}`);
    actions.setAccountInformation({ ...initialAccountInformation });
  }),

  // START OF BLACKLIST RELATED STUFF SECTION

  /**
   * Set list data for blacklist
   */
  setBlacklist: action((state, payload) => {
    state.blacklist = payload;
  }),
  appendDataToBlacklist: action((state, payload) => {
    state.blacklist = [payload, ...state.blacklist];
  }),
  /**
   * Remove an element from blacklist data state
   * @param {Object} [payload] params pass to function
   * @param {string} [payload.phone] the phone of element that need to be remove
   */
  removeElementFromBlacklist: action((state, payload) => {
    state.blacklist = state.blacklist.filter(
      (blacklistObj) => blacklistObj.phone !== payload.phone,
    );
  }),

  /**
   * Get blacklist data
   */
  getBlacklist: thunk(async (actions) => {
    try {
      const { data } = await http.get(
        `${API_URL.ADMIN_ACCOUNT_BANNED_PHONE_LIST}`,
      );
      actions.setBlacklist(data);
    } catch (error) {
      actions.setBlacklist(null);
    }
  }),
  whitelistPhoneNumber: thunk(async (actions, payload) => {
    const { phone, setSuccess } = payload;
    try {
      // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_LIST}`);
      actions.removeElementFromBlacklist({ phone });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  blacklistPhoneNumber: thunk(async (actions, payload) => {
    const { blacklistObj, setSuccess } = payload;
    try {
      // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_LIST}`);
      actions.appendDataToBlacklist({ blacklistObj });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  }),
  // END OF BLACKLIST RELATED STUFF SECTION
};
export default model;
