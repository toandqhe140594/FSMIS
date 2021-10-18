import { action, thunk } from "easy-peasy";

import http from "../utilities/Http";

const model = {
  currentLocation: {},
  locationList: [],
  setCurrentLocation: action((state, payload) => {
    state.currentLocation = payload;
  }),
  setLocationList: action((state, payload) => {
    state.locationList = payload;
  }),
  getLocationList: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/`, {
      params: {},
    });
    actions.setLocationList(data);
  }),
};
export default model;
