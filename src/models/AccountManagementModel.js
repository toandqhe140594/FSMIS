import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

// initial state for test purpose only since there wasnot api for get account information
const initialAccountInformation = {
  id: 9,
  name: "Nguyễn Tài Khoản",
  dob: "01/01/2021",
  phone: "098765433",
  gender: true,
  address: "Số 1 hồ Hoàn Kiếm Việt Nam Hà Nội Châu Đại Dương",
  status: true,
  active: true,
};

const model = {
  accountList: [], // List data of accounts
  accountInformation: {}, // Detail information of an account
  accountTotalPage: 1, // Maximum account page
  accountTotalCounts: null, // Total accounts
  blacklist: null, // Blacklist data

  /**
   * Set data for account list
   * @param {Object} [payload] params pass to function
   * @param {boolean} [payload.isOverwrite] true - overwrite the list data
   * @param {Array} [payload.data] list data of accounts
   */
  setAccountList: action((state, payload) => {
    if (payload.isOverwrite) state.accountList = payload.data;
    else state.accountList = state.accountList.concat(payload.data);
  }),
  /**
   * Set account detail information
   */
  setAccountInformation: action((state, payload) => {
    state.accountInformation = payload;
  }),
  /**
   * Change account active status in state
   * @param {number} payload.id id of the account
   */
  changeAccountActivation: action((state, payload) => {
    const activateStatus = state.accountInformation.active;
    const { id } = payload;
    const foundIndex = state.accountList.findIndex(
      (account) => account.id === id,
    );
    state.accountList[foundIndex].active = !activateStatus;
    state.accountInformation.active = !activateStatus;
  }),
  /**
   * Set account total page
   * @param {number} payload number of pages, if less than 1 then set account total page = 1
   */
  setAccountTotalPage: action((state, payload) => {
    state.accountTotalPage = payload < 1 ? 1 : payload;
  }),
  /**
   * Set total accounts number
   */
  setAccountTotalCounts: action((state, payload) => {
    state.accountTotalCounts = payload;
  }),
  /**
   * Call API to get account list data
   * @param {Object} [payload] params pass to function
   * @param {number} [payload.pageNo] page of the data
   * @param {string} [payload.keyword] search keyword
   * @param {Function} [payload.setIsLoading] function indicates loading state
   */
  getAccountList: thunk(async (actions, payload = {}, { getState }) => {
    const pageNo = payload.pageNo || 1;
    const keyword = payload.keyword || "";
    const setIsLoading = payload.setIsLoading || (() => {});
    const { accountTotalPage } = getState();
    // If page number is invalid
    if (pageNo < 1 || pageNo > accountTotalPage) return;
    try {
      const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_LIST}`, {
        params: {
          pageNo,
          keyword,
        },
      });
      const { totalPage, totalItem, items } = data;
      await actions.setAccountList({ data: items, isOverwrite: pageNo === 1 });
      actions.setAccountTotalCounts(totalItem);
      actions.setAccountTotalPage(totalPage);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      actions.setAccountList({ data: [], isOverwrite: true });
      actions.setAccountTotalCounts(null);
    }
  }),
  // Clear the account list data
  clearAccountList: action((state) => {
    state.accountList = [];
  }),
  getAccountInformation: thunk(async (actions, payload = {}) => {
    const setSuccess = payload.setSuccess || (() => {});
    const setLoading = payload.setLoading || (() => {});
    try {
      // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_INFORMATION}`);
      actions.setAccountInformation({ ...initialAccountInformation });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
    setLoading(false);
  }),
  clearAccountInformation: action((state) => {
    state.accountInformation = {};
  }),
  /**
   * Activate/deactive an account
   */
  activateAccount: thunk(async (actions, payload = {}, { getState }) => {
    const { id } = getState().accountInformation;
    const setSuccess = payload.setSuccess || (() => {});
    try {
      // const { data } = await http.get(`${API_URL.ADMIN_ACCOUNT_INFORMATION}`);
      actions.changeAccountActivation({ id });
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
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
