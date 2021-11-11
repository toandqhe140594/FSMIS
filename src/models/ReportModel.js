import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const listLocationReport = [
  {
    id: "1",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: true,
  },
  {
    id: "2",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: true,
  },
  {
    id: "3",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: false,
  },
  {
    id: "4",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: true,
  },
  {
    id: "5",
    reportTarget: "Hồ Câu Thuần Việt",
    isProcessed: false,
  },
];
const listPostReport = [
  {
    id: "1",
    userName: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    isProcessed: true,
  },
  {
    id: "2",
    userName: "Hồ câu Thuần Việt",
    postType: "Thông báo",
    isProcessed: true,
  },
  {
    id: "3",
    userName: "Hồ câu Thuần Việt",
    postType: "Bồi cá",
    isProcessed: false,
  },
  {
    id: "4",
    userName: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    isProcessed: true,
  },
  {
    id: "5",
    userName: "Hồ câu Thuần Việt",
    postType: "Báo cá",
    isProcessed: false,
  },
];

const listReviewReport = [
  {
    id: "1",
    reportTarget: "Nguyễn Văn A",
    isProcessed: true,
  },
  {
    id: "2",
    reportTarget: "Nguyễn Văn A",
    isProcessed: true,
  },
  {
    id: "3",
    reportTarget: "Nguyễn Văn A",
    isProcessed: false,
  },
  {
    id: "4",
    reportTarget: "Nguyễn Văn A",
    isProcessed: true,
  },
  {
    id: "5",
    reportTarget: "Nguyễn Văn A",
    isProcessed: false,
  },
];

const model = {
  listLocationReport: [...listLocationReport],
  listPostReport: [...listPostReport],
  listReviewReport: [...listReviewReport],

  setListReportLocation: action((state, payload) => {
    state.listReportLocation = payload;
  }),
  getListReportLocation: thunk(async (actions) => {
    actions.setListReportLocation({ ...listLocationReport });
  }),
};

export default model;
