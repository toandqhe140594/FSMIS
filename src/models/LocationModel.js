import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
  currentId: 1,
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
  setCurrentId: action((state, payload) => {
    state.currentId = payload;
  }),
  setLocationOverview: action((state, payload) => {
    state.locationOverview = payload;
  }),
  setLakeList: action((state, payload) => {
    state.lakeList = payload;
  }),
  getLocationOverview: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(`location/${getState().currentId}`);
    console.log("get overview data success"); // Test only
    actions.setLocationOverview(data);
  }),
  getLocationOverviewById: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/${payload.id}`);
    actions.setLocationOverview(data);
  }),
};
export default model;
