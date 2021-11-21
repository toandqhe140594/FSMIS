import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  listLocationReport: [],
  listPostReport: [],
  listReviewReport: [],
  listCatchReport: [],
  totalLocationReportPage: 0,
  totalPostReportPage: 0,
  totalReviewReportPage: 0,
  totalCatchReportPage: 0,
  locationReportCurrentType: true,
  postReportCurrentType: true,
  reviewReportCurrentType: true,
  catchReportCurrentType: true,

  /**
   * Append new location report list to current list
   * @param {String} [payload.type] type of the report
   * @param {Array} [payload.items] new array to append to current list
   * @param {String} [payload.setMode] decide to append to current list or create new list
   */
  setReportList: action((state, payload) => {
    const { type, items, setMode } = payload;
    switch (type) {
      case "LOCATION":
        state.listLocationReport =
          setMode === "NEW" ? items : state.listLocationReport.concat(items);
        break;
      case "POST":
        state.listPostReport =
          setMode === "NEW" ? items : state.listPostReport.concat(items);
        break;
      case "REVIEW":
        state.listReviewReport =
          setMode === "NEW" ? items : state.listReviewReport.concat(items);
        break;
      case "CATCH":
        state.listCatchReport =
          setMode === "NEW" ? items : state.listCatchReport.concat(items);
        break;
      default:
    }
  }),

  /**
   * Reset list of of a report type
   * @param {String} [payload.type] type of the report
   */
  resetReportList: action((state, payload) => {
    switch (payload.type) {
      case "LOCATION":
        state.listLocationReport = [];
        break;
      case "POST":
        state.listPostReport = [];
        break;
      case "REVIEW":
        state.listReviewReport = [];
        break;
      case "CATCH":
        state.listCatchReport = [];
        break;
      default:
    }
  }),

  /**
   * Set total page of each report list
   * @param {String} [payload.type] type of the report
   * @param {Number} [payload.totalPage] total page of list report
   */
  setTotalReportPage: action((state, payload) => {
    const { type, totalPage } = payload;
    switch (type) {
      case "LOCATION":
        state.totalLocationReportPage = totalPage;
        break;
      case "REVIEW":
        state.totalReviewReportPage = totalPage;
        break;
      case "POST":
        state.totalPostReportPage = totalPage;
        break;
      case "CATCH":
        state.totalCatchReportPage = totalPage;
        break;
      default:
    }
  }),

  /**
   * Set current flag for report type of a list
   * Use to switch and reset list when the user filter the list
   * by active or inactive
   * @param {String} [payload.type] type of the report
   * @param {Boolean} [payload.active] flag indicate list is active type
   */
  setCurrentReportType: action((state, payload) => {
    const { active, type } = payload;
    switch (type) {
      case "LOCATION":
        state.locationReportCurrentType = active;
        break;
      case "POST":
        break;
      case "REVIEW":
        break;
      case "CATCH":
        break;
      default:
    }
  }),

  /**
   * Get location report list by page number
   * @param {Number} [payload.pageNo] current page number
   * @param {Boolean} [payload.active] the list's filter for proccessed and unprocessed
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListLocationReportLocation: thunk(
    async (actions, payload, { getState }) => {
      const { pageNo, setGetStatus, active } = payload;
      const { locationReportCurrentType } = getState();
      try {
        const { data } = await http.get(API_URL.ADMIN_REPORT_LOCATION_LIST, {
          params: { pageNo, active },
        });
        // Nếu kiểu biến cờ active trong state khác với active truyền vào
        // thì reset lại list và set lại cờ active
        let setMode = "DEFAULT";
        if (locationReportCurrentType !== active) {
          actions.setCurrentReportType({ type: "LOCATION", active });
          setMode = "NEW";
        }
        const { totalPage, items } = data;
        actions.setTotalReportPage({ type: "LOCATION", totalPage });
        actions.setReportList({ type: "LOCATION", items, setMode });
        setGetStatus("SUCCESS");
      } catch (error) {
        // handle error
        setGetStatus("FAILED");
      }
    },
  ),

  /**
   * Get catch report list by page number
   * @param {Number} [payload.pageNo] current page number
   * @param {Boolean} [payload.active] the list's filter for proccessed and unprocessed
   * @param {Function} [payload.setGetStatus] function to set loading state
   */
  getListReportCatch: thunk(async (actions, payload, { getState }) => {
    const { pageNo, active, setGetStatus } = payload;
    const { catchReportCurrentType } = getState();
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_CATCH_LIST, {
        params: { pageNo, active },
      });
      let setMode = "DEFAULT";
      if (catchReportCurrentType !== active) {
        actions.setCurrentReportType({ type: "CATCH", active });
        setMode = "NEW";
      }
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "CATCH", totalPage });
      actions.setReportList({ type: "CATCH", items, setMode });
      setGetStatus("SUCCESS");
    } catch (error) {
      // handle error
      setGetStatus("FAILED");
    }
  }),
  /**
   * Get post report list by page number
   * @param {Number} [payload.pageNo] current page number
   * @param {Boolean} [payload.active] the list's filter for proccessed and unprocessed
   * @param {Function} [payload.setGetStatus] function to set loading state
   */
  getListPostReport: thunk(async (actions, payload, { getState }) => {
    const { pageNo, active, setGetStatus } = payload;
    const { postReportCurrentType } = getState();
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_POST_LIST, {
        params: { pageNo, active },
      });
      let setMode = "DEFAULT";
      if (postReportCurrentType !== active) {
        actions.setCurrentReportType({ type: "POST", active });
        setMode = "NEW";
      }
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "POST", totalPage });
      actions.setReportList({ type: "POST", items, setMode });
      setGetStatus("SUCCESS");
    } catch (error) {
      // handle error
      setGetStatus("FAILED");
    }
  }),
  /**
   * Get review report list by page number
   * @param {Number} [payload.pageNo] current page number
   * @param {Boolean} [payload.active] the list's filter for proccessed and unprocessed
   * @param {Function} [payload.setGetStatus] function to set loading state
   */
  getListReviewReport: thunk(async (actions, payload, { getState }) => {
    const { pageNo, active, setGetStatus } = payload;
    const { reviewReportCurrentType } = getState();
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_REVIEW_LIST, {
        params: { pageNo, active },
      });
      let setMode = "DEFAULT";
      if (reviewReportCurrentType !== active) {
        actions.setCurrentReportType({ type: "REVIEW", action });
        setMode = "NEW";
      }
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "REVIEW", totalPage });
      actions.setReportList({ type: "REVIEW", items, setMode });
      setGetStatus("SUCCESS");
    } catch (error) {
      setGetStatus("FAILED");
      // handle error
    }
  }),
  // SEND REPORT
  sendReport: thunk(async (actions, payload) => {
    const { id, reportDtoIn, type, setSendStatus } = payload;
    let requestAPI = "";
    switch (type) {
      case "POST":
        requestAPI = `/location/post/report/${id}`;
        break;

      case "REVIEW": {
        requestAPI = `/location/review/report/${id}`;
        break;
      }
      case "LOCATION": {
        requestAPI = `/location/report/${id}`;
        break;
      }
      case "CATCH":
        requestAPI = `/catches/report-improper/${id}`;
        break;
      default:
        break;
    }
    try {
      const { status } = await http.post(requestAPI, reportDtoIn);
      if (status === 200) {
        setSendStatus(true);
      }
    } catch (error) {
      setSendStatus(false);
    }
  }),

  // GET REPORT DETAIL
  locationReportDetail: {},
  reviewReportDetail: {},
  postReportDetail: {},
  catchReportDetail: {},

  setLocationReportDetail: action((state, payload) => {
    state.locationReportDetail = payload;
  }),
  getLocationReportDetail: thunk(async (actions, payload) => {
    const { id, setIsSuccess } = payload;
    try {
      const { status, data } = await http.get(`/admin/report/location/${id}`);
      actions.setLocationReportDetail(data);
      if (status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(false);
    }
  }),

  setReviewReportDetail: action((state, payload) => {
    state.reviewReportDetail = payload;
  }),
  getReviewReportDetail: thunk(async (actions, payload) => {
    const { id, setIsSuccess } = payload;
    try {
      const { status, data } = await http.get(
        `${API_URL.ADMIN_REPORT_REVIEW_LIST}/${id}`,
      );
      if (status === 200) {
        actions.setReviewReportDetail(data);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsSuccess(false);
    }
  }),

  setPostReportDetail: action((state, payload) => {
    state.postReportDetail = payload;
  }),
  getPostReportDetail: thunk(async (actions, payload) => {
    const { id, setIsSuccess } = payload;
    try {
      const { status, data } = await http.get(
        `${API_URL.ADMIN_REPORT_POST_LIST}/${id}`,
      );
      if (status === 200) {
        actions.setPostReportDetail(data);
        setIsSuccess(true);
      }
    } catch (error) {
      // handle error
      setIsSuccess(false);
    }
  }),

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),
  getCatchReportDetail: thunk(async (actions, payload) => {
    const { id, setIsSuccess } = payload;
    try {
      const { status, data } = await http.get(
        `${API_URL.ADMIN_REPORT_CATCH_LIST}/${id}`,
      );
      if (status === 200) {
        actions.setCatchReportDetail(data);
        setIsSuccess(true);
      }
    } catch (error) {
      // handle error
      setIsSuccess(false);
    }
  }),

  solvedReport: thunk(async (actions, payload) => {
    const { id, setIsSuccess } = payload;
    try {
      const { status } = await http.post(`/admin/report/solved/${id}`);
      if (status === 200) {
        setIsSuccess(true);
      }
    } catch (error) {
      // handle error
      setIsSuccess(false);
    }
  }),
};

export default model;
