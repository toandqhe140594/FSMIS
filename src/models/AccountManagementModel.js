import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  accountList: null, // List data of accounts
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
   * Change account active status in state
   * @param {number} payload.phone phone number of the account
   */
  changeAccountActivationByPhone: action((state, payload) => {
    if (!state.accountInformation.phone) return;
    if (!state.accountList || state.accountList.length < 1) return;
    const activateStatus = state.accountInformation.active;
    const { phone } = payload;
    const foundIndex = state.accountList.findIndex(
      (account) => account.phone === phone,
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
          phone: keyword,
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
    state.accountList = null;
  }),
  /**
   * Get detail information of an account by id
   * @param {Object} payload - params pass to function
   * @param {number} payload.id - id of the account
   * @param {Function} [payload.setSuccess] - function indicate success state of action
   * @param {Function} [payload.setLoading] - function indicate loading state
   */
  getAccountInformation: thunk(async (actions, payload = {}) => {
    const { id } = payload;
    const setSuccess = payload.setSuccess || (() => {});
    const setLoading = payload.setLoading || (() => {});
    try {
      const { data } = await http.get(
        `${API_URL.ADMIN_ACCOUNT_INFORMATION}/${id}`,
      );
      actions.setAccountInformation(data);
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
   * @param {Object} payload - params pass to function
   * @param {number} payload.id - id of the account
   * @param {Function} [payload.setSuccess] - function indicate success state of action
   */
  activateAccount: thunk(async (actions, payload = {}, { getState }) => {
    const { id } = getState().accountInformation;
    const setSuccess = payload.setSuccess || (() => {});
    try {
      await http.post(`${API_URL.ADMIN_ACCOUNT_ACTIVATE}/${id}`);
      actions.changeAccountActivation({ id });
      setSuccess(true);
    } catch (error) {
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
  /**
   * Add object to start of the blacklist array
   * @param {Object} payload - params pass to function
   * @param {Object} payload.blacklistObj - object that need to add to array
   * @param {string} blacklistObj.phone - phone number
   * @param {string} [blacklistObj.description] - description
   */
  addDataToStartOfBlacklist: action((state, payload) => {
    state.blacklist.unshift(payload.blacklistObj);
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
  /**
   * Remove a phone number from blacklist
   * @param {Object} payload = params pass to func
   * @param {string} payload.phone - phone number that need to be whitelisted
   * @param {Function} payload.setSuccess - function indicate success status of api call
   */
  whitelistPhoneNumber: thunk(async (actions, payload) => {
    const { phone, setSuccess } = payload;
    try {
      await http.delete(`${API_URL.ADMIN_ACCOUNT_BANNED_PHONE_REMOVE}`, {
        params: {
          phone,
        },
      });
      setSuccess(true);
      actions.removeElementFromBlacklist({ phone });
      actions.changeAccountActivationByPhone({ phone });
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Add a phone number to blacklist
   * @param {Object} payload - params pass to func
   * @param {Object} payload.blacklistObj - data of phone number that need to be ban
   * @param {Function} payload.setSuccess - function indicate success status of api call
   */
  blacklistPhoneNumber: thunk(async (actions, payload) => {
    const { blacklistObj } = payload;
    try {
      await http.post(
        `${API_URL.ADMIN_ACCOUNT_BANNED_PHONE_ADD}`,
        blacklistObj,
      );
      actions.addDataToStartOfBlacklist({ blacklistObj });
      actions.changeAccountActivationByPhone({ phone: blacklistObj.phone });
    } catch (error) {
      throw new Error();
    }
  }),
  // END OF BLACKLIST RELATED STUFF SECTION
};
export default model;
