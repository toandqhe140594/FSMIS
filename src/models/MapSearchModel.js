import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
  currentLocation: null,
  locationList: [],
  setCurrentLocation: action((state, payload) => {
    state.currentLocation = payload;
  }),
  setLocationList: action((state, payload) => {
    state.locationList = payload;
  }),
  getLocationListNearby: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/nearby`, {
      params: { ...payload },
    });
    actions.setLocationList(data);
  }),
};
export default model;
