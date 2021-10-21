import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
  currentId: 1,
  locationPostPageNumber: 0,
  locationShortInformation: {},
  locationOverview: {
    id: 1,
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
  lakeList: [],
  lakeDetail: {},
  locationPostList: [
    {
      id: 1,
      name: "Hồ thuần việt",
      content: "Trắm đen - Chép khủng bồi hồ vip cho ae câu thứ 3-5",
      postTime: "2021-10-16T17:03:43.618",
      postType: "STOCKING",
      url: "https://a-static.besthdwallpaper.com/2021-yae-miko-electro-character-genshin-impact-anime-video-game-hinh-nen-2880x1620-74983_52.jpg",
      edited: true,
      active: true,
    },
  ],
  totalPostPage: 1,
  setCurrentId: action((state, payload) => {
    state.currentId = payload;
  }),
  setLocationPostPageNumber: action((state, payload) => {
    state.locationPostPageNumber = payload;
  }),
  setLocationShortInformation: action((state, payload) => {
    state.locationShortInformation = payload;
  }),
  setLocationOverview: action((state, payload) => {
    state.locationOverview = payload;
  }),
  setLakeList: action((state, payload) => {
    state.lakeList = payload;
  }),
  setLakeDetail: action((state, payload) => {
    state.lakeDetail = payload;
  }),
  setLocationPostList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationPostList = payload.data;
    else state.locationPostList = [...state.locationPostList, ...payload.data];
  }),
  setTotalPostPage: action((state, payload) => {
    state.totalPostPage = payload;
  }),
  getLocationOverview: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(`location/${getState().currentId}`);
    actions.setLocationOverview(data);
    actions.setLocationShortInformation({
      name: data.name,
      isVerified: data.verify,
      id: data.id,
      type: "location",
    });
  }),
  getLocationOverviewById: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/${payload.id}`);
    actions.setLocationOverview(data);
    actions.setLocationShortInformation({
      name: data.name,
      isVerified: data.verify,
      id: data.id,
      type: "location",
    });
  }),
  getLakeList: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/lake/all`,
    );
    actions.setLakeList(data);
  }),
  getLakeListByLocationId: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/${payload.id}/lake/all`);
    actions.setLakeList(data);
  }),
  getLakeDetailByLakeId: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/lake/${payload.id}`,
    );
    actions.setLakeDetail(data);
  }),
  getLocationPostListByPage: thunk(async (actions, payload, { getState }) => {
    const { pageNo } = payload;
    const { currentId, totalPostPage } = getState();
    if (pageNo > totalPostPage || pageNo <= 0) return;
    const { data } = await http.get(`location/${currentId}/post`, {
      params: { pageNo },
    });
    actions.setTotalPostPage(data.totalPage);
    if (data.items.length > 0)
      actions.setLocationPostList({
        data: data.items,
        status: pageNo === 1 ? "Overwrite" : "Append",
      });
  }),
};
export default model;
