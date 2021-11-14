import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
  currentLocation: null,
  locationList: [],
  advancedLocationList: [
    {
      id: 25,
      name: "Hồ câu Ông Ngọ - Vạn Phúc",
      image: "https://picsum.photos/200",
      verify: false,
      score: 2.5,
      address: "Thôn Vạn Phúc, Thanh Trì, Hà Nội, Vạn Phúc, Thanh Trì, Hà Nội",
      role: null,
      closed: false,
    },
    {
      id: 3,
      name: "Hồ Câu Định Công",
      image: "https://cdn.kinhtedothi.vn/545/2020/11/23/hodinhcong1.JPG",
      verify: true,
      score: 0.0,
      address: "Hồ Định Công, Định Công, Hoàng Mai, Hà Nội",
      role: null,
      closed: false,
    },
    {
      id: 11,
      name: "Hồ Câu Ninh Đen",
      image:
        "http://media.baophutho.vn/dataimages/2018/09/28/t8-9-4mau01-1538117590.jpg",
      verify: false,
      score: 0.0,
      address: "An Hạ, An Thượng, Hoài Đức, Hà Nội",
      role: null,
      closed: false,
    },
    {
      id: 1,
      name: "Hồ Câu Thuần Việt",
      image: "https://picsum.photos/200",
      verify: false,
      score: 3.2,
      address: "Gần Chùa Núi Lá, Thủ Sỹ, Tiên Lữ, Hưng Yên",
      role: null,
      closed: true,
    },
  ],
  setCurrentLocation: action((state, payload) => {
    state.currentLocation = payload;
  }),
  setLocationList: action((state, payload) => {
    state.locationList = payload;
  }),
  setAdvancedLocationList: action((state, payload) => {
    state.advancedLocationList = payload;
  }),
  getLocationListNearby: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/nearby`, {
      params: { ...payload },
    });
    actions.setLocationList(data);
  }),
};
export default model;
