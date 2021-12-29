import { action, thunk } from "easy-peasy";

import { showToastMessage } from "../utilities";
import http from "../utilities/Http";

/**
 * Create params object from data
 * @param {Object} data - data to create filter params
 * @returns object contains params for search nearby location
 */
const createFilterObject = (data) => {
  const filterObject = data;
  const { methodId, minRating } = filterObject;
  if (methodId === -1) delete filterObject.methodId;
  if (minRating === -1) delete filterObject.minRating;
  return filterObject;
};

const initialState = {
  currentLocation: null,
  locationList: [],
};
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
    const params = createFilterObject(payload);
    const { data } = await http.get(`location/nearby`, {
      params,
    });
    if (data.length === 0) showToastMessage("Không tìm thấy kết quả tương ứng");
    actions.setLocationList(data);
  }),
  /**
   * Reset all state of model to default value
   */
  reset: action(() => ({
    ...initialState,
  })),
};
export default model;
