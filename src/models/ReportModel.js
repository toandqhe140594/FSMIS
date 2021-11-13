import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const listLocationReport = [
  {
    id: "1",
    name: "Hồ Câu Thuần Việt",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "2",
    name: "Hồ Câu Thuần Việt",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "3",
    name: "Hồ Câu Thuần Việt",
    active: false,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "4",
    name: "Hồ Câu Thuần Việt",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "5",
    name: "Hồ Câu Thuần Việt",
    active: false,
    time: "10/11/2021 22:04:08",
  },
];
const listPostReport = [
  {
    id: "1",
    name: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "2",
    name: "Hồ câu Thuần Việt",
    postType: "Thông báo",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "3",
    name: "Hồ câu Thuần Việt",
    postType: "Bồi cá",
    active: false,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "4",
    name: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "5",
    name: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    active: false,
    time: "10/11/2021 22:04:08",
  },
];

const listReviewReport = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "2",
    name: "Nguyễn Văn A",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "3",
    name: "Nguyễn Văn A",
    active: false,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "4",
    name: "Nguyễn Văn A",
    active: true,
    time: "10/11/2021 22:04:08",
  },
  {
    id: "5",
    name: "Nguyễn Văn A",
    active: false,
    time: "10/11/2021 22:04:08",
  },
];

const listCatchReport = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    active: true,
  },
  {
    id: "2",
    name: "Nguyễn Văn A",
    active: true,
  },
  {
    id: "3",
    name: "Nguyễn Văn A",
    active: false,
  },
  {
    id: "4",
    name: "Nguyễn Văn A",
    active: true,
  },
  {
    id: "5",
    name: "Nguyễn Văn A",
    active: false,
  },
];

const model = {
  listLocationReport: [],
  listPostReport: [],
  listReviewReport: [],
  listCatchReport: [],
  totalLocationReportPage: 0,
  totalPostReportPage: 0,
  totalReviewReportPage: 0,
  totalCatchReportPage: 0,

  /**
   * Append new location report list to current list
   * @param {String} [payload.type] type of the report
   * @param {Array} [payload.list] new array to append to current list
   */
  setReportList: action((state, payload) => {
    const { type, items } = payload;
    switch (type) {
      case "LOCATION":
        state.listLocationReport.push(...items);
        break;
      case "POST":
        state.listPostReport.push(...items);
        break;
      case "REVIEW":
        state.listReviewReport.push(...items);
        break;
      case "CATCH":
        state.listCatchReport.push(...items);
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
   * Get location report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListLocationReportLocation: thunk(async (actions, payload) => {
    const { pageNo, setIsLoading } = payload;
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_LOCATION_LIST, {
        params: { pageNo },
      });
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "LOCATION", totalPage });
      actions.setReportList({ type: "LOCATION", items });
      // }
      setIsLoading(false);
    } catch (error) {
      // handle error
      setIsLoading(false);
    }
  }),

  /**
   * Get catch report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListReportCatch: thunk(async (actions, payload) => {
    const { pageNo, setIsLoading } = payload;
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_CATCH_LIST, {
        params: { pageNo },
      });
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "CATCH", totalPage });
      actions.setReportList({ type: "CATCH", items });
      setIsLoading(false);
    } catch (error) {
      // handle error
      setIsLoading(false);
    }
  }),
  /**
   * Get post report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListPostReport: thunk(async (actions, payload) => {
    const { pageNo, setIsLoading } = payload;
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_POST_LIST, {
        params: { pageNo },
      });
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "POST", totalPage });
      actions.setReportList({ type: "POST", items });
      setIsLoading(false);
    } catch (error) {
      // handle error
      setIsLoading(false);
    }
  }),
  /**
   * Get review report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListReviewReport: thunk(async (actions, payload) => {
    const { pageNo, setIsLoading } = payload;
    try {
      const { data } = await http.get(API_URL.ADMIN_REPORT_REVIEW_LIST, {
        params: { pageNo },
      });
      const { totalPage, items } = data;
      actions.setTotalReportPage({ type: "REVIEW", totalPage });
      actions.setReportList({ type: "REVIEW", items });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // handle error
    }
  }),
};

export default model;
