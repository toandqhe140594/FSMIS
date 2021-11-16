import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  checkInState: null, // State indicate that the user is currently checkin at a fishing location or not
  fishingLocationInfo: {},
  lakeList: [],
  fishList: [],
  currentLakeId: null,
  catchReportDetail: {
    catchesDetailList: [
      {
        fishSpeciesId: 0,
        quantity: 0,
        returnToOwner: true,
        weight: 0,
      },
    ],
    description: "string",
    hidden: true,
    images: ["string"],
    lakeId: 0,
  },

  /**
   * Set data to fishing location short display
   */
  setFishingLocationInfo: action((state, payload) => {
    state.fishingLocationInfo = payload;
  }),

  setLakeList: action((state, payload) => {
    state.lakeList = payload;
  }),
  // /**
  //  * Get all lake in a location by location id
  //  * @param {Function} [payload.setGetStatus] the function to track api get status
  //  */
  // getLakeListByLocationId: thunk(
  //   async (actions, payload = {}, { getState }) => {
  //     const setGetStatus = payload.setGetStatus || (() => {});
  //     const { id } = getState().fishingLocationInfo;
  //     try {
  //       const { data } = await http.get(
  //         `location/${id}/${API_URL.LOCATION_LAKE_ALL}`,
  //       );
  //       actions.setLakeList(data);
  //       setGetStatus("SUCCESS");
  //     } catch (error) {
  //       // handle error
  //       setGetStatus("FAILED");
  //     }
  //   },
  // ),
  setCurrentLakeId: action((state, payload) => {
    state.currentLakeId = payload;
  }),

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),
  /**
   * Submit catch report to server
   * @param {Object} [payload.submitData] data submit
   * @param {Function} [payload.setSubmitStatus] function indicate submit success
   */
  submitCatchReport: thunk(async (actions, payload) => {
    const { submitData, setSubmitStatus } = payload;
    try {
      const { data } = await http.post(
        `${API_URL.SEND_CATCH_REPORT}`,
        submitData,
      );
      actions.setCatchReportDetail({ ...data, id: null });
      actions.setCheckInState(false);
      setSubmitStatus("SUCCESS");
    } catch (error) {
      setSubmitStatus("FAILED");
    }
  }),
  /**
   * Set list of fishes in the current checkin location
   */
  setFishList: action((state, payload) => {
    state.fishList = payload;
  }),

  /**
   * Set fish and lake data of the current checkin location
   * @param {Object} [payload] payload pass to function
   * @param {Array} [payload.fishInLake] array contains data of lakes and fishes of the fishing location
   */
  setFishAndLakeList: action((state, payload) => {
    let lakeList = [];
    let fishList = [];
    // Loop through the array contains fishes and lakes data
    payload.fishInLake.forEach((element) => {
      const { id, name, fishDtoOutList } = element;
      lakeList = lakeList.concat({ id, name });
      fishList = fishList.concat({
        id,
        fishList: fishDtoOutList.map(
          ({
            speciesId: fishId,
            name: fishName,
            quantity,
            id: fishInLakeId,
          }) => ({
            id: fishId,
            name: fishName,
            quantity,
            fishInLakeId,
          }),
        ),
      });
    });
    state.lakeList = lakeList;
    state.fishList = fishList;
  }),
  /**
   * Get all fishes in lakes in fishing location
   */
  getAllFishes: thunk(async (actions, payload, { getState }) => {
    const { id: locationId } = getState().fishingLocationInfo;
    try {
      const { data, status } = await http.get(
        `${API_URL.LOCATION_FISHES_ALL}/${locationId}`,
      );
      if (status === 200) {
        actions.setFishAndLakeList({ fishInLake: data });
      }
    } catch (error) {
      actions.setFishAndLakeList({ fishInLake: [] });
    }
  }),

  // START OF CHECKIN RELATED STUFF

  /**
   * Set checkin status
   */
  setCheckInState: action((state, payload) => {
    state.checkInState = payload;
  }),

  /**
   * Get checkin status
   * @param {Object} [payload] payload pass to action
   * @param {Function} [payload.setLoading] function indicate the request is loading
   */
  getCheckInState: thunk(async (actions, payload) => {
    const { setLoading } = payload;
    try {
      const { data, status } = await http.get(`${API_URL.CHECKIN_STATUS}`);
      if (status === 200) {
        await actions.setFishingLocationInfo(data.fishingLocationItemDtoOut);
        const available = data.available || true;
        actions.setCheckInState(!available);
        setLoading(false);
      }
    } catch (error) {
      actions.setFishingLocationInfo({});
      actions.setCheckInState(false);
      setLoading(false);
    }
  }),

  /**
   * Checkout from fishing location if currently checkin
   */
  personalCheckout: thunk(async (actions) => {
    try {
      const { status } = await http.post(`${API_URL.CHECKOUT}`);
      if (status === 200) {
        actions.setCheckInState(false);
        actions.setFishingLocationInfo({});
      }
    } catch (error) {
      actions.setCheckInState(false);
      actions.setFishingLocationInfo({});
    }
  }),

  // END OF CHECKIN RELATED STUFF
};
export default model;
