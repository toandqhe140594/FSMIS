import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const model = {
  locationLatLng: {},
  currentId: 2,
  listOfFishingLocations: [],
  locationDetails: {},

  listOfLake: [],
  lakeDetail: {},

  staffManagementErrorMsg: "",
  listOfStaff: [],
  staffOverview: {},
  staffDetail: {
    id: 3,
    name: "Đào Quốc Toản",
    dob: "15/10/2021",
    phoneNumber: "098764434",
    gender: true,
    address: "Số 1 hồ Hoàng Kiếm Việt Nam Hà Nội Châu Á",
  },

  catchReportDetail: {},
  unresolvedCatchReportList: [],
  unresolvedCatchReportTotalPage: 1,
  unresolvedCatchReportCurrentPage: 1,
  catchReportHistory: [
    {
      id: 4,
      userId: 2,
      userFullName: "Lê Test",
      avatar: "https://picsum.photos/200/300",
      locationId: 8,
      locationName: "Hồ Câu Thiên Đường",
      description: "Mẻ này ngon",
      time: "20/10/2020 00:00:00",
      fishes: ["Cá chày"],
    },
    {
      id: 2,
      userId: 2,
      userFullName: "Lê Test",
      avatar: "https://picsum.photos/200/300",
      locationId: 8,
      locationName: "Hồ Câu Thiên Đường",
      description: "Mẻ này ngon",
      time: "20/10/2020 00:00:00",
      fishes: ["Cá chày"],
    },
  ],
  catchReportCurrentPage: 1,
  catchTotalPage: 1,

  checkInHistoryList: [
    {
      id: 8,
      name: "Dat Test",
      locationId: 3,
      locationName: "Hồ Câu Định Công",
      checkInTime: "26/01/2021 06:30:00",
      checkOutTime: "26/01/2021 11:00:00",
    },
    {
      id: 7,
      name: "Dat",
      locationId: 3,
      locationName: "Hồ Câu Định Công",
      checkInTime: "25/01/2021 06:30:00",
      checkOutTime: "26/01/2021 11:00:00",
    },
  ],

  locationReviewScore: {
    score: null,
    totalReviews: null,
  },
  locationReviewList: [],
  totalReviewPage: 1,

  locationPostList: [],
  totalPostPage: 1,

  locationCatchList: [], // List of public catch report to display on overview screen
  totalCatchPage: 1,

  postDetail: {},

  setCurrentId: action((state, payload) => {
    state.currentId = payload;
  }),
  setLocationLatLng: action((state, payload) => {
    state.locationLatLng = payload;
  }),
  setListOfFishingLocations: action((state, payload) => {
    state.listOfFishingLocations = payload;
  }),
  getListOfFishingLocations: thunk(async (actions) => {
    const { data } = await http.get(`${API_URL.PERSONAL_OWNED_LOCATION}`);
    actions.setListOfFishingLocations(data);
  }),

  setLocationDetails: action((state, payload) => {
    state.locationDetails = payload;
  }),
  getLocationDetailsById: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/${payload.id}`);
    actions.setLocationDetails(data);
  }),

  setListOfLake: action((state, payload) => {
    state.listOfLake = payload;
  }),
  getListOfLake: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${payload.id ? payload.id : getState().currentId}/${
        API_URL.LOCATION_LAKE_ALL
      }`,
    );
    actions.setListOfLake(data);
  }),
  setLakeDetail: action((state, payload) => {
    state.lakeDetail = payload;
  }),
  getLakeDetailByLakeId: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/lake/${payload.id}`,
    );
    actions.setLakeDetail(data);
  }),

  // START OF REVIEW RELATED SECTION

  /**
   * Set data for locationReviewList
   * If status = Overwrite then overwrite all the list, else append new data to list
   */
  setLocationReviewList: action((state, payload) => {
    // If status indicated that the list need to be overwritten
    if (payload.status === "Overwrite") state.locationReviewList = payload.data;
    else
      state.locationReviewList = state.locationReviewList.concat(payload.data);
  }),
  /**
   * Set total page of reviews
   * The total page can not be lower than 1
   */
  setTotalReviewPage: action((state, payload) => {
    state.totalReviewPage = payload < 1 ? 1 : payload;
  }),
  /**
   * Set data for locationReviewScore
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.score] average review score of location
   * @param {Number} [payload.totalReviews] total numbers of reviews
   */
  setLocationReviewScore: action((state, payload) => {
    state.locationReviewScore = payload;
  }),
  /**
   * Get the average review score and the number of review of the location
   */
  getLocationReviewScore: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/${API_URL.LOCATION_REVIEW_SCORE}`,
    );
    actions.setLocationReviewScore(data);
  }),
  /**
   * Get review data by page and filter type
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.pageNo] the page of data need to get
   * @param {String} [payload.filter] the filter type of data
   */
  getLocationReviewListByPage: thunk(async (actions, payload, { getState }) => {
    const { pageNo, filter } = payload;
    const { currentId, totalReviewPage } = getState();
    // If current page greater than total page or less than 1 then return
    if (pageNo > totalReviewPage || pageNo <= 0) return;
    const { data } = await http.get(`location/${currentId}/review`, {
      params: { pageNo, filter },
    });
    actions.setTotalReviewPage(data.totalPage);
    actions.setLocationReviewList({
      data: data.items,
      status: pageNo === 1 ? "Overwrite" : "Append",
    });
  }),
  /**
   * Vote a review
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.reviewId] the id of the review
   * @param {Number} [payload.vote] 0 or 1, type of vote
   */
  voteReview: thunk(async (actions, payload, { getState }) => {
    const { reviewId, vote } = payload;
    const { currentId } = getState();
    const { status, data } = await http.post(
      `location/${currentId}/review/${reviewId}`,
      null,
      {
        params: { vote },
      },
    );
    const { userVoteType, upvote, downvote } = data;
    if (status === 200)
      actions.resetVoteOfReview({
        id: reviewId,
        userVoteType,
        upvote,
        downvote,
      });
  }),
  /**
   * Reset data of the review that has been vote
   * Reset userVoteType, upvote amount and downvote amount by id of review
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.id] the id of the review
   * @param {Boolean} [payload.userVoteType] new votetype of the review
   * @param {Number} [payload.upvote] new upvote number of the review
   * @param {Number} [payload.downvote] new downvote number of the review
   */
  resetVoteOfReview: action((state, payload) => {
    const { id, userVoteType, upvote, downvote } = payload;
    const review =
      state.locationReviewList[
        state.locationReviewList.findIndex((x) => x.id === id)
      ];
    review.userVoteType = userVoteType;
    review.upvote = upvote;
    review.downvote = downvote;
  }),

  // END OF REVIEW RELATED SECTION

  // START OF POST RELATED SECTION

  /**
   * Set value for total page number of post list
   * The value of total page can not be smaller than 1
   */
  setTotalPostPage: action((state, payload) => {
    state.totalPostPage = payload < 1 ? 1 : payload;
  }),
  /**
   * Set data for post list
   * @param {Object} [payload] the payload pass to function
   * @param {Array} [payload.data] the data of the list
   * @param {String} [payload.status] indicate that the post list should be overwritten or append new data
   */
  setLocationPostList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationPostList = payload.data;
    else state.locationPostList = state.locationPostList.concat(payload.data);
  }),
  /**
   * Get posts data by page
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.pageNo] the page of data need to get
   */
  getLocationPostListByPage: thunk(async (actions, payload, { getState }) => {
    const { pageNo } = payload;
    const { currentId, totalPostPage } = getState();
    if (pageNo > totalPostPage || pageNo <= 0) return;
    const { data } = await http.get(`location/${currentId}/post`, {
      params: { pageNo },
    });
    actions.setTotalPostPage(data.totalPage);
    actions.setLocationPostList({
      data: data.items,
      status: pageNo === 1 ? "Overwrite" : "Append",
    });
  }),

  // END OF POST RELATED SECTION

  // START OF CATCH REPORT RELATED SECTION

  /**
   * Set value for total page number of post list
   * The value of total page can not be smaller than 1
   */
  setTotalCatchPage: action((state, payload) => {
    state.totalCatchPage = payload < 1 ? 1 : payload;
  }),

  /**
   * Set data for catch reports list for display on the location overview page
   * @param {Object} [payload] the payload pass to function
   * @param {Array} [payload.data] the data of the list
   * @param {String} [payload.status] indicate that the list should be overwritten or append new data
   */
  setLocationCatchList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationCatchList = payload.data;
    else state.locationCatchList = state.locationCatchList.concat(payload.data);
  }),
  /**
   * Get catch reports data by page
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.pageNo] the page of data need to get
   */
  getLocationCatchListByPage: thunk(async (actions, payload, { getState }) => {
    const { pageNo } = payload;
    const { currentId, totalCatchPage } = getState();
    if (pageNo > totalCatchPage || pageNo <= 0) return;
    const { data } = await http.get(`location/${currentId}/catch`, {
      params: { pageNo },
    });
    actions.setTotalCatchPage(data.totalPage);
    actions.setLocationCatchList({
      data: data.items,
      status: pageNo === 1 ? "Overwrite" : "Append",
    });
  }),

  // END OF CATCH REPORT RELATED SECTION

  // START OF STAFF RELATED SECTION

  /**
   * Set error message for staff related stuff
   */
  setStaffManagementErrorMsg: action((state, payload) => {
    state.staffManagementErrorMsg = payload;
  }),
  /**
   * Set list of staffs data
   */
  setListOfStaff: action((state, payload) => {
    state.listOfStaff = payload;
  }),
  /**
   * Set data for staff overview
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.id] the id of the staff
   * @param {String} [payload.name] the name of the staff
   * @param {String} [payload.avatar] the avatar of the staff
   * @param {String} [payload.phone] the phone of the staff
   */
  setStaffOverview: action((state, payload) => {
    state.staffOverview = payload;
  }),
  /**
   * Set data for staff detail information
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.id] the id of the staff
   * @param {String} [payload.name] the name of the staff
   * @param {String} [payload.avatar] the avatar of the staff
   * @param {String} [payload.phone] the phone of the staff
   * @param {String} [payload.dob] the dob of the staff
   * @param {String} [payload.address] the address of the staff
   * @param {Boolean} [payload.gender] the gender of the staff, true - male, false - female
   */
  setStaffDetail: action((state, payload) => {
    state.staffDetail = payload;
  }),
  /**
   * Get data for list of staff from api
   */
  getListOfStaff: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(`location/${getState().currentId}/staff`);
    actions.setListOfStaff(data);
  }),
  /**
   * Find overview data of staff by phone
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.phone] the phone of the staff
   */
  findStaffByPhone: thunk(async (actions, payload) => {
    const { phone } = payload;
    try {
      const { data, status } = await http.post(
        `location/${API_URL.STAFF_FIND_BY_PHONE}/${phone}`,
        {},
      );

      if (status === 200) actions.setStaffOverview(data);
    } catch (error) {
      actions.setStaffOverview({});
    }
  }),
  /**
   * Get information of the staff by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.userId] the userId of the staff that need to get information
   */
  getStaffDetailById: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { userId } = payload;
    try {
      const { data, status } = await http.get(
        `location/${currentId}/staff/${userId}`,
      );

      if (status === 200) actions.setStaffDetail(data);
    } catch (error) {
      actions.setStaffDetail({});
    }
  }),
  /**
   * Add staff to fishing location by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.userId] the userId of the staff that need to be added
   * @param {Function} [payload.setSuccess] the function to set action success indicator
   */
  addStaffById: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { userId, setSuccess } = payload;
    try {
      const { status } = await http.post(
        `location/${currentId}/${API_URL.STAFF_ADD}/${userId}`,
      );
      if (status === 200) {
        actions.getListOfStaff();
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
    }
  }),
  /**
   * Delete staff from fishing location by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.userId] the userId of the staff that need to be delete
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  deleteStaffById: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { userId, setDeleteSuccess } = payload;
    try {
      const { status } = await http.delete(
        `location/${currentId}/${API_URL.STAFF_DELETE}/${userId}`,
      );
      if (status === 200) {
        actions.getListOfStaff();
        setDeleteSuccess(true);
      }
    } catch (error) {
      setDeleteSuccess(false);
    }
  }),

  // END OF STAFF RELATED SECTION

  // START OF FISHING LOCATION MANAGEMENT RELATED SECTION

  /**
   * Close the fishing location
   * @param {Object} [payload] the payload pass to function
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  closeFishingLocation: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { setDeleteSuccess } = payload;
    try {
      const { data, status } = await http.delete(
        `${API_URL.LOCATION_CLOSE}/${currentId}`,
      );
      if (status === 200) {
        actions.getListOfFishingLocations();
        setDeleteSuccess(true);
      } else actions.setStaffManagementErrorMsg(data.responseText);
    } catch (error) {
      setDeleteSuccess(false);
    }
  }),

  // END OF FISHING LOCATION MANAGEMENT RELATED SECTION

  /**
   * Set list data of unresolved catch eport
   */
  setUnresolvedCatchReportList: action((state, payload) => {
    state.unresolvedCatchReportList = payload;
  }),
  /**
   * Set current page for list data of unresolved catch eport
   */
  setUnresolvedCatchReportCurrentPage: action((state, payload) => {
    state.unresolvedCatchReportCurrentPage = payload;
  }),
  /**
   * Set total page number for list data of unresolved catch eport
   * Total page cannot be less than 1
   */
  setUnresolvedCatchReportTotalPage: action((state, payload) => {
    state.unresolvedCatchReportTotalPage = payload < 1 ? 1 : payload;
  }),
  /**
   * Get list data of unresolved catch eport
   * @param {Object} [payload] the payload pass to function
   */
  getUnresolvedCatchReportList: thunk(
    async (actions, payload, { getState }) => {
      const { status } = payload;
      const {
        currentId,
        unresolvedCatchReportCurrentPage: currentPage,
        unresolvedCatchReportTotalPage: totalPage,
      } = getState();
      // If current page greater than total page or smaller than 1 then return
      if (currentPage > totalPage || currentPage < 1) return;
      let pageNo = 1;
      // If this function is called to load more data to list
      if (status === "APPEND") {
        pageNo = currentPage;
        actions.setUnresolvedCatchReportCurrentPage(currentPage + 1);
      } else {
        // If this function is called to load data from page 1
        actions.setUnresolvedCatchReportCurrentPage(1);
        actions.setUnresolvedCatchReportTotalPage(1);
      }
      // try {
      //   const { data, status: httpResponseStatus } = await http.get(
      //     `${API_URL.LOCATION_CLOSE}/${currentId}`,
      //     {
      //       params: { pageNo },
      //     },
      //   );
      //   if (httpResponseStatus === 200) {
      //     actions.setUnresolvedCatchReportList(data.items);
      //     actions.setUnresolvedCatchReportTotalPage(data.totalPage);
      //   }
      // } catch (error) {
      //   actions.setUnresolvedCatchReportList([]);
      //   actions.setUnresolvedCatchReportTotalPage(1);
      //   actions.setUnresolvedCatchReportCurrentPage(1);
      // }
      console.log(status, currentId, currentPage, totalPage);
    },
  ),
  // START UNRESOLVED CATCH REPORT RELATED SECTION

  // END UNRESOLVED CATCH REPORT RELATED SECTION
};
export default model;
