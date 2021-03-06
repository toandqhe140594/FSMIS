import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import { convertDateFormat } from "../utilities";
import http from "../utilities/Http";

const initialState = {
  locationLatLng: {},
  currentId: 2,
  listOfFishingLocations: [],
  locationDetails: {},

  listOfLake: [],
  lakeDetail: {},

  staffManagementErrorMsg: "",
  listOfStaff: [],
  staffOverview: {},
  staffDetail: {},

  catchReportDetail: {},
  unresolvedCatchReportList: [],
  unresolvedCatchReportTotalPage: 1,
  unresolvedCatchReportCurrentPage: 1,
  catchReportHistory: [],
  catchHistoryTotalPage: 1,

  checkinHistoryList: [],
  anglerCheckinOverviewInfor: {},

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

  currentPost: {},
  postDetail: {},

  checkinHistoryTotalPage: 1,

  lakePostPageNo: 1,
  currentPinPost: {},
};
// Need change in getCatchReportHistoryOverwrite about dates
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
  staffDetail: {},

  catchReportDetail: {},
  unresolvedCatchReportList: [],
  unresolvedCatchReportTotalPage: 1,
  unresolvedCatchReportCurrentPage: 1,
  catchReportHistory: [],
  catchHistoryTotalPage: 1,

  checkinHistoryList: [],
  anglerCheckinOverviewInfor: {},

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

  currentPost: {},
  postDetail: {},

  checkinHistoryTotalPage: 1,

  lakePostPageNo: 1,
  currentPinPost: {},
  setLakePostPageNo: action((state, payload) => {
    state.lakePostPageNo = payload;
  }),

  setCurrentId: action((state, payload) => {
    state.currentId = payload;
  }),
  setLocationLatLng: action((state, payload) => {
    state.locationLatLng = payload;
  }),
  resetLocationLatLng: action((state) => {
    state.locationLatLng = {};
  }),
  setListOfFishingLocations: action((state, payload) => {
    state.listOfFishingLocations = payload;
  }),
  /**
   * Get list of the owner's fishing locations
   * @param {Function} [payload] params for actions
   * @param {Function} [payload.setGetSuccess] function to set get status
   */
  getListOfFishingLocations: thunk(async (actions, payload = {}) => {
    const setGetSuccess = payload.setGetSuccess || (() => {});
    try {
      const { data } = await http.get(`${API_URL.PERSONAL_OWNED_LOCATION}`);
      setGetSuccess(true);
      actions.setListOfFishingLocations(data);
    } catch (error) {
      setGetSuccess(false);
    }
  }),

  /**
   * Set location detail state
   * @param {Object} [payload] new location details
   */
  setLocationDetails: action((state, payload) => {
    state.locationDetails = payload;
    state.currentId = payload.id;
  }),
  /**
   * Get location details by id
   */
  getLocationDetailsById: thunk(async (actions, payload) => {
    try {
      const { data } = await http.get(`location/${payload.id}`);
      actions.setLocationDetails(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }),
  resetLocationDetails: action((state) => {
    state.locationDetails = {};
  }),

  setListOfLake: action((state, payload) => {
    state.listOfLake = payload;
  }),
  removeLakeFromList: action((state, payload) => {
    const newList = state.listOfLake.filter((lake) => lake.id !== payload.id);
    state.listOfLake = newList;
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
  /**
   * Get lake detail by id and update lakeDetail state
   * @param {Number} [payload.id] lake id
   */
  getLakeDetailByLakeId: thunk(async (actions, payload, { getState }) => {
    try {
      const { data } = await http.get(
        `location/${getState().currentId}/lake/${payload.id}`,
      );
      actions.setLakeDetail(data);
    } catch (error) {
      // Insert error handler
    }
  }),

  /**
   * Close lake of fishing location
   * @param {Object} payload.id the id of the lake
   */
  closeLakeByLakeId: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { id } = payload;
    try {
      const { status } = await http.delete(
        `location/${currentId}/${API_URL.LOCATION_LAKE_CLOSE}/${id}`,
      );
      if (status === 200) {
        actions.removeLakeFromList({ id });
      }
    } catch (error) {
      throw new Error();
    }
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

  setLocationPostListFirstPage: action((state, payload) => {
    state.locationPostList = payload.data;
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

  getLocationPostListFirstPage: thunk(
    async (actions, payload, { getState }) => {
      const { currentId, lakePostPageNo } = getState();
      actions.setLakePostPageNo(2);
      const { data } = await http.get(`location/${currentId}/post`, {
        params: { lakePostPageNo },
      });
      actions.setTotalPostPage(data.totalPage);
      actions.setLocationPostListFirstPage({
        data: data.items,
      });
    },
  ),

  /**
   * Upload to create new post in a location
   * @param {Object} payload.updateData data of the post
   */
  createNewPost: thunk(async (actions, payload, { getState }) => {
    const { updateData } = payload;
    const { currentId } = getState();
    try {
      await http.post(`location/${currentId}/post/add`, updateData);
      await actions.getLocationPostListFirstPage();
    } catch (error) {
      throw new Error();
    }
  }),

  /**
   * Upload to edit existing post in a location
   * @param {Object} payload.updateDate updated data of the post
   */
  editPost: thunk(async (actions, payload, { getState }) => {
    const { currentId, currentPinPost } = getState();
    const { updateData } = payload;
    try {
      await http.put(`location/${currentId}/post/edit`, updateData);
      if (currentPinPost.id === updateData.id) {
        actions.setCurrentPinPost(updateData);
      }
      actions.editPostInList(updateData);
    } catch (error) {
      throw new Error();
    }
  }),

  editPostInList: action((state, payload) => {
    const foundIndex = state.locationPostList.findIndex(
      (item) => item.id === payload.id,
    );

    state.locationPostList[foundIndex] = payload;
  }),

  deletePost: thunk(async (actions, payload, { getState }) => {
    const { postId, setDeleteSuccess } = payload;
    const { currentId, currentPinPost } = getState();
    try {
      await http.delete(`location/${currentId}/post/delete/${postId}`);
      actions.removePostFromPostList(postId);
      setDeleteSuccess(true);
      if (currentPinPost.id === postId) {
        actions.setCurrentPinPost({});
      }
    } catch (error) {
      setDeleteSuccess(false);
    }
  }),
  /**
   * Remove post from the post list state
   * @param {number} payload id of the post that need to be remove
   */
  removePostFromPostList: action((state, payload) => {
    state.locationPostList = state.locationPostList.filter(
      (post) => post.id !== payload,
    );
  }),

  setCurrentPost: action((state, payload) => {
    state.currentPost = payload;
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
    const { data } = await http.get(
      `location/${currentId}/${API_URL.LOCATION_CATCH_REPORT_PUBLIC}`,
      {
        params: { pageNo },
      },
    );
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
   * @param {String} [payload.id] the userId of the staff that need to get information
   */
  getStaffDetailById: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { id } = payload;
    try {
      const { data, status } = await http.get(
        `location/${currentId}/staff/${id}`,
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
      await http.delete(`${API_URL.LOCATION_CLOSE}/${currentId}`);
      actions.getListOfFishingLocations();
      setDeleteSuccess(true);
    } catch (error) {
      setDeleteSuccess(false);
    }
  }),
  /**
   * Close the fishing location temporary
   * @param {Object} [payload] the payload pass to function
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  closeFishingLocationTemporary: thunk(
    async (actions, payload, { getState }) => {
      const { currentId } = getState();
      const { setDeleteSuccess } = payload;
      try {
        const { status } = await http.post(
          `${API_URL.LOCATION_CLOSE_TEMPORARY}/${currentId}`,
        );
        if (status === 200) {
          // actions.getListOfFishingLocations();
          actions.switchFishingLocationClosedState({ id: currentId });
          setDeleteSuccess(true);
        }
      } catch (error) {
        setDeleteSuccess(false);
      }
    },
  ),

  switchFishingLocationClosedState: action((state, payload) => {
    const foundIndex = state.listOfFishingLocations.findIndex(
      (location) => location.id === payload.id,
    );
    state.listOfFishingLocations[foundIndex] = {
      ...state.listOfFishingLocations[foundIndex],
      closed: !state.locationDetails.closed,
    };
    state.locationDetails.closed = !state.locationDetails.closed;
  }),

  // DucHM ADD_START 4/11/2021
  /**
   * Add new fishing location
   * @param {Object} [payload.addData] an object pass to POST body
   * @param {Function} [payload.setAddStatus] the function set status
   */
  addNewLocation: thunk(async (actions, payload) => {
    const { addData } = payload;
    try {
      await http.post(API_URL.LOCATION_ADD, addData);
      await actions.getListOfFishingLocations();
    } catch (error) {
      throw new Error();
    }
  }),
  // DucHM ADD_END 4/11/2021
  /**
   * Suggest a new location to admin
   * @param {Object} [payload] params pass to function
   * @param {Object} [payload.suggestData] some data of the fishing location
   */
  suggestNewLocation: thunk(async (actions, payload) => {
    const { suggestData } = payload;
    try {
      await http.post(API_URL.LOCATION_SUGGEST, suggestData);
    } catch (error) {
      throw new Error();
    }
  }),

  editLakeDetailData: action((state, payload) => {
    state.lakeDetail = {
      ...state.lakeDetail,
      ...payload,
    };
  }),
  // DucHM ADD_START 5/11/2021
  /**
   * Add new lake to a fishing location
   * If there no fishing location id pass in, get current id in state
   * @param {Object} [payload.addData] an object pass to POST body
   */
  addNewLakeInLocation: thunk(async (actions, payload, { getState }) => {
    const { addData } = payload;
    const { currentId } = getState();
    try {
      await http.post(`location/${currentId}/lake/add`, addData);
      actions.getListOfLake({ id: currentId });
    } catch (error) {
      throw new Error();
    }
  }),
  // DucHM ADD_END 5/11/2021

  // DucHM ADD_START 6/11/2021
  /**
   * Update lake detail (methods, dimensions, name, price)
   * @param {Number} payload.id lake id
   * @param {Object} payload.updateData data for updating
   */
  editLakeDetail: thunk(async (actions, payload, { getState }) => {
    const { updateData, id } = payload;
    const { currentId } = getState();
    try {
      await http.put(`location/${currentId}/lake/edit/${id}`, updateData);
      actions.editLakeDetailData({ ...updateData, id });
      actions.getListOfLake({ id: currentId });
    } catch (error) {
      throw new Error();
    }
  }),
  // DucHM ADD_END 6/11/2021

  // DucHM ADD_START 7/11/2021
  editFishingLocationDetailData: action((state, payload) => {
    state.locationDetails = {
      ...state.locationDetails,
      ...payload,
      verify: false,
    };
  }),
  /**
   * Update fishing location profile
   * @param {Object} payload.updateData update information
   */
  editFishingLocation: thunk(async (actions, payload, { getState }) => {
    const { updateData } = payload;
    const { currentId } = getState();
    try {
      await http.put(`location/edit/${currentId}`, updateData);
      const data = { ...updateData, image: updateData.images };
      delete data.images;
      delete actions.editFishingLocationDetailData(data);
      actions.getListOfFishingLocations();
    } catch (error) {
      throw new Error();
    }
  }),
  // DucHM ADD_END 7/11/2021
  // END OF FISHING LOCATION MANAGEMENT RELATED SECTION

  // START OF LAKE FISH MANAGEMENT SECTION
  // DucHM ADD_START 8/11/2021
  /**
   * Add new fish to lake
   * @param {Object} addData new fish information
   */
  addFishToLake: thunk(async (actions, payload, { getState }) => {
    const { addData } = payload;
    const {
      lakeDetail: { id },
    } = getState();
    try {
      await http.post(`location/lake/${id}/fish/add`, addData);
      actions.getLakeDetailByLakeId({ id });
    } catch (error) {
      throw new Error();
    }
  }),

  /**
   * Delete a fish from lake by id
   * @param {Number} payload.id id of the fish to delete from lake
   */
  deleteFishFromLake: thunk(async (actions, payload, { getState }) => {
    const { id: fishId } = payload;
    const { id: lakeId } = getState().lakeDetail;
    try {
      await http.delete(`location/lake/fish/delete/${fishId}`);
      actions.getLakeDetailByLakeId({ id: lakeId }); // purpose to fetch new fishInLake in lakeDetail
    } catch (error) {
      // handle error
      throw new Error();
    }
  }),

  /**
   * Restock fish quantity and totalWeight in lake by id
   * @param {Number} payload.id id of the fish to stock
   * @param {Number} payload.updateData data contain weight or quantity for stocking
   */
  stockFishInLake: thunk(async (actions, payload, { getState }) => {
    const { id, updateData } = payload;
    const { id: lakeId } = getState().lakeDetail;
    try {
      await http.post(`location/lake/fish/stocking/${id}`, null, {
        params: { ...updateData },
      });
      await actions.getLakeDetailByLakeId({ id: lakeId }); // purpose to fetch new fishInLake in lakeDetail
    } catch (error) {
      throw new Error();
    }
  }),
  // DucHM ADD_END 8/11/2021
  // END OF LAKE FISH MANAGEMENT SECTION

  // START UNRESOLVED CATCH REPORT RELATED SECTION
  /**
   * Set list data of unresolved catch eport
   * @param {String} payload.mode setting mode for unresolvedCatchReport
   * @param {Array} payload.items set data for unresolvedCatchReport
   */
  setUnresolvedCatchReportList: action((state, payload) => {
    const { mode, items } = payload;
    if (mode === "NEW") {
      state.unresolvedCatchReportList = items;
    } else
      state.unresolvedCatchReportList =
        state.unresolvedCatchReportList.concat(items);
  }),
  /**
   * Set current page for list data of unresolved catch eport
   */
  setUnresolvedCatchReportCurrentPage: action((state, payload) => {
    state.unresolvedCatchReportCurrentPage = payload;
  }),
  /**
   * Set total page number for list data of unresolved catch eport
   * @param {Number} payload.totalPage total page of unresolvedCatchReportList
   */
  setUnresolvedCatchReportTotalPage: action((state, payload) => {
    state.unresolvedCatchReportTotalPage = payload.totalPage;
  }),
  /**
   * Remove a catch report from the unresolved catch report list by id
   * @param {Object} payload params pass to function
   * @param {number} payload.id id of the catch report that need to be remove
   */
  removeAnUnresolvedCatchReportById: action((state, payload) => {
    state.unresolvedCatchReportList = state.unresolvedCatchReportList.filter(
      (report) => report.id !== payload.id,
    );
  }),

  /**
   * Clear unresolvedCatchReport data back to default state
   */
  clearUnresolvedCatchReportList: action((state) => {
    state.unresolvedCatchReportList = [];
    state.unresolvedCatchReportTotalPage = 1;
  }),

  /**
   * Get list data of unresolved catch eport
   * @param {Number} payload.pageNo page number fetch
   */
  getUnresolvedCatchReportList: thunk(
    async (actions, payload, { getState }) => {
      const { pageNo } = payload;
      const { currentId } = getState();
      try {
        const { data, status } = await http.get(
          `location/${currentId}/${API_URL.LOCATION_CATCH_REPORT_UNRESOLVED}`,
          {
            params: { pageNo },
          },
        );
        if (status === 200) {
          const { totalPage, items } = data;
          actions.setUnresolvedCatchReportTotalPage({ totalPage });
          if (pageNo === 1) {
            actions.setUnresolvedCatchReportList({ mode: "NEW", items });
          } else {
            actions.setUnresolvedCatchReportList({ mode: "DEFAULT", items });
          }
        }
      } catch (error) {
        actions.clearUnresolvedCatchReportList();
      }
    },
  ),
  /**
   * Verify a catch report
   * @param {Object} [payload] params pass to function
   * @param {number} [payload.id] id of the catch report
   * @param {boolean} [payload.isApprove] value indicate that approve the catch report or not
   * @param {Function} [payload.setSuccess] function indicate verify catch report success or not
   */
  approveCatchReport: thunk(async (actions, payload) => {
    const { id, isApprove, setSuccess } = payload;
    try {
      const { status } = await http.post(
        `${API_URL.LOCATION_CATCH_REPORT_APPROVE}/${id}`,
        null,
        {
          params: {
            isApprove,
          },
        },
      );
      if (status === 200) {
        setSuccess(true);
        await actions.removeAnUnresolvedCatchReportById({ id });
      }
    } catch (error) {
      setSuccess(false);
    }
  }),

  // END UNRESOLVED CATCH REPORT RELATED SECTION

  // LOCATION CATCH REPORT HISTORY
  /**
   * Set catch report history list
   * @param {String} payload.mode setting mode
   * @param {Array} payload.items data to set the list
   */
  setCatchReportHistory: action((state, payload) => {
    const { mode, items } = payload;
    if (mode === "NEW") {
      state.catchReportHistory = items;
    } else state.catchReportHistory = state.catchReportHistory.concat(items);
  }),

  /**
   * Set total catch report history pages
   * @param {Number} payload.totalPage total page of the list
   */
  setCatchHistoryTotalPage: action((state, payload) => {
    state.catchHistoryTotalPage = payload.totalPage;
  }),

  /**
   * Get resolved catch report list data
   * @param {String} payload.startDate start date with format "YYYY-MM-DDT17:00:00.000Z" - hours = 17
   * @param {String} payload.endDate end date with format "YYYY-MM-DDT17:00:00.000Z" - hours = 17
   * @param {Number} payload.pageNo next page to get
   */
  getCatchReportHistoryList: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { pageNo } = payload;
    let { startDate, endDate } = payload;
    startDate = startDate ? convertDateFormat(startDate) : null;
    endDate = endDate ? convertDateFormat(endDate) : null;
    const { data } = await http.get(
      `location/${currentId}/${API_URL.LOCATION_CATCH_REPORT_RESOLVED}`,
      {
        params: { pageNo, startDate, endDate },
      },
    );
    const { totalPage, items } = data;
    actions.setCatchHistoryTotalPage({ totalPage });
    if (pageNo === 1) {
      actions.setCatchReportHistory({ mode: "NEW", items });
    } else actions.setCatchReportHistory({ mode: "APPEND", items });
  }),

  resetCatchReportHistory: action((state) => {
    state.setCatchHistoryTotalPage = 0;
    state.catchReportHistory = [];
  }),
  // END LOCATION CATCH REPORT HISTORY

  // START OF CHECKIN RELATED SECTION

  // VERIFY CHECK-IN
  /**
   * Set Angler overview data to display after checkin success
   */
  setAnglerCheckinOverviewInfor: action((state, payload) => {
    state.anglerCheckinOverviewInfor = payload;
  }),
  /**
   * Checkin an angler to the fishing location
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.qrString] qrString unique to the angler
   * @param {Function} [payload.setSuccess] indicate that action is success
   */
  checkInAngler: thunk(async (actions, payload, { getState }) => {
    const { qrString, setSuccess } = payload;
    const { currentId } = getState();
    try {
      const { status, data } = await http.post(
        `location/${currentId}/${API_URL.CHECKIN}`,
        qrString,
      );
      if (status === 200) {
        setSuccess(true);
        actions.setAnglerCheckinOverviewInfor(data);
      }
    } catch (error) {
      setSuccess(false);
      actions.setAnglerCheckinOverviewInfor({});
    }
  }),

  // LOCATION CHECK-IN HISTORY
  /**
   * Set check-in history list
   * @param {String} payload.mode mode for setting
   * @param {Array} payload.items data to set up the list
   */
  setCheckinHistoryList: action((state, payload) => {
    const { mode, items } = payload;
    if (mode === "NEW") {
      state.checkinHistoryList = items;
    } else {
      state.checkinHistoryList = state.checkinHistoryList.concat(items);
    }
  }),

  /**
   * Set total check-in history page
   * @param {Number} payload.totalPage total page of check-in history list
   */
  setCheckinHistoryTotalPage: action((state, payload) => {
    state.checkinHistoryTotalPage = payload.totalPage;
  }),

  /**
   * Get check-in history list
   * @param {Number} payload.pageNo next page to get
   * @param {String} payload.startDate start range to sort check-in records
   * @param {String} payload.endDate end range to sort check-in records
   */
  getCheckinHistoryList: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { pageNo } = payload;
    let { startDate, endDate } = payload;
    // Ki???m tra startDate ko null th?? convert, kh??ng th?? gi??? null
    // L??m t????ng t??? v???i endDate
    startDate = startDate ? convertDateFormat(startDate) : null;
    endDate = endDate ? convertDateFormat(endDate) : null;
    const { data } = await http.get(`location/${currentId}/checkin/history`, {
      params: { pageNo, startDate, endDate },
    });
    const { totalPage, items } = data;
    actions.setCheckinHistoryTotalPage({ totalPage });
    // N???u pageNo m?? l?? 1 th?? ?????t ch???t ????? n???i list l?? m???i (reset l???i t??? ?????u)
    if (pageNo === 1) {
      actions.setCheckinHistoryList({ mode: "NEW", items });
    } else actions.setCheckinHistoryList({ mode: "APPEND", items });
    // N???u pageNo > 1 (t???c l??c n??y trang ???? t??ng l??n), ?????t ch??? ????? n???i list l?? ti???p t???c (n???i v??o sau)
  }),

  /**
   * Reset check-in history list to default state
   */
  resetCheckinHistory: action((state) => {
    state.checkinHistoryTotalPage = 0;
    state.checkinHistoryList = [];
  }),
  // END OF CHECKIN RELATED SECTION

  setCurrentPinPost: action((state, payload) => {
    state.currentPinPost = payload;
  }),

  getPinPost: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    try {
      const { status, data } = await http.get(
        `/location/${currentId}/post/pinned`,
      );
      if (status === 200) {
        actions.setCurrentPinPost(data);
      }
    } catch (error) {
      actions.setCurrentPinPost({});
    }
  }),
  pinFLocationPost: thunk(async (actions, payload) => {
    const { postId, item, setPinSuccess } = payload;
    try {
      const { status } = await http.post(`/location/post/pin/${postId}`);
      if (status === 200) {
        actions.setCurrentPinPost(item);
        setPinSuccess(true);
      }
    } catch (error) {
      setPinSuccess(false);
    }
  }),

  /**
   * Reset all state of model to default value
   */
  reset: action(() => ({
    ...initialState,
  })),
};

export default model;
