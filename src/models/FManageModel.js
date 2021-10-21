import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";
const model = {
  managementID: 1,
  listOfFishingLocations: [],
  locationDetails: {
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
  listOfLake: [],
  lakeDetail: {},
  listOfStaff: [],
  staffDetail: {},
  catchReportList: [],
  catchReportDetail: {},
  catchReportHistory: [],
  checkInHistoryList: [],
  eventPostList: [],
  eventPostDetail: {},
};
export default model;
