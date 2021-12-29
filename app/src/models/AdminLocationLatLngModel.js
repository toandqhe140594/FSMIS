import { action } from "easy-peasy";

const model = {
  locationLatLng: {},
  setLocationLatLng: action((state, payload) => {
    state.locationLatLng = payload;
  }),
  resetLocationLatLng: action((state) => {
    state.locationLatLng = {};
  }),
};

export default model;
