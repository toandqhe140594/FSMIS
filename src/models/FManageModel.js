import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  locationLatLng: {},
  currentId: 2,
  listOfFishingLocations: [],
  locationDetails: {
    id: 1,
    role: "ROLE_MANAGER",
    name: "placeholderdata",
    longitude: 20.65606,
    latitude: 106.096535,
    address: "Gần Chùa Núi Lá, Tiên Lữ, Hưng Yên 160000",
    addressFromWard: {
      ward: "Phúc Xá",
      wardId: 1,
      district: "Ba Đình",
      districtId: 1,
      province: "Hà Nội",
      provinceId: 1,
    },
    phone: "0123456789",
    description: "Hồ câu đơn đài Thuần Việt - nơi giải trí cho anh em cần thủ",
    service: "Ăn uống\nChụp ảnh\nBao móm",
    timetable: "Từ 8h đến 22h hàng ngày, trừ thứ 3 và thứ 6",
    rule: "Cần <5.4M",
    active: true,
    verify: false,
  },

  listOfLake: [],
  lakeDetail: {},
  listOfStaff: [],
  staffDetail: {},
  catchReportDetail: {},
  catchReportHistory: [
    {
      id: 4,
      userId: 2,
      userFullName: "Lê Test",
      avatar: "https://picsum.photos/200/300",
      locationId: 8,
      locationName: "Hồ Câu Thiên Đường",
      description: "Mẻ này ngon",
      time: "20/10/2020 00:00:00",
      fishes: ["Cá chày"],
    },
    {
      id: 2,
      userId: 2,
      userFullName: "Lê Test",
      avatar: "https://picsum.photos/200/300",
      locationId: 8,
      locationName: "Hồ Câu Thiên Đường",
      description: "Mẻ này ngon",
      time: "20/10/2020 00:00:00",
      fishes: ["Cá chày"],
    },
  ],
  catchReportCurrentPage: 1,
  catchTotalPage: 1,
  checkInHistoryList: [],
  locationPostList: [],
  locationPostPageNumber: 0,
  totalPostPage: 1,
  postDetail: {},

  setLocationLatLng: action((state, payload) => {
    state.locationLatLng = payload;
  }),
  setListOfFishingLocations: action((state, payload) => {
    state.listOfFishingLocations = payload;
  }),
  getListOfFishingLocations: thunk(
    async (actions, payload, { getState }) => {},
  ),

  setLocationDetails: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getLocationDetails: thunk(async (actions, payload, { getState }) => {}),

  setListOfLake: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getListOfLake: thunk(async (actions, payload, { getState }) => {}),

  setLakeDetail: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getLakeDetail: thunk(async (actions, payload, { getState }) => {}),

  setCatchReportList: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getCatchReportList: thunk(async (actions, payload, { getState }) => {}),

  setCatchReportDetail: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getCatchReportDetail: thunk(async (actions, payload, { getState }) => {}),

  setCheckInHistoryList: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getCheckInHistoryList: thunk(async (actions, payload, { getState }) => {}),

  setTotalPostPage: action((state, payload) => {
    state.totalPostPage = payload < 1 ? 1 : payload;
  }),
  setLocationPostList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationPostList = payload.data;
    else state.locationPostList = state.locationPostList.concat(payload.data);
  }),
  getLocationPostListByPage: thunk(async (actions, payload, { getState }) => {
    const { pageNo } = payload;
    const { currentId, totalPostPage } = getState();
    if (pageNo > totalPostPage || pageNo <= 0) return;
    const { data } = await http.get(`location/${currentId}/post`, {
      params: { pageNo },
    });
    actions.setTotalPostPage(data.totalPage);
    actions.setLocationPostList({
      data: data.items,
      status: pageNo === 1 ? "Overwrite" : "Append",
    });
  }),
};
export default model;
