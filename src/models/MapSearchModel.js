import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
  currentLocation: null,
  locationList: [
    {
      id: 1,
      latitude: 21.032609517688147,
      longitude: 105.82812336296172,
      name: "Hồ câu oh yeah",
      rate: 1.5,
      isVerified: false,
    },
    {
      id: 2,
      latitude: 21.03517331108639,
      longitude: 105.85090718809838,
      name: "Hồ Ngọc Bích",
      rate: 3.4,
      isVerified: true,
    },
    {
      id: 3,
      latitude: 21.038793470613445,
      longitude: 105.83590283070224,
      name: "Hồ câu thuần việt",
      rate: 4.4,
      isVerified: false,
    },
  ],
  setCurrentLocation: action((state, payload) => {
    state.currentLocation = payload;
  }),
  setLocationList: action((state, payload) => {
    state.locationList = payload;
  }),
  getLocationListNearby: thunk(async (actions, payload) => {
    console.log(payload);
    // const { data } = await http.get(`location/nearby`, {
    //   params: { ...payload },
    // });
    // actions.setLocationList(data);
  }),
};
export default model;
