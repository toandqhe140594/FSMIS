import { action, thunk } from "easy-peasy";

import { API_URL } from "../constants";
import http from "../utilities/Http";

const initialPersonalReviewShape = {
  id: null,
  userId: null,
  userFullName: "",
  userAvatar: "",
  userVoteType: null,
  score: null,
  description: "",
  time: "",
  upvote: 0,
  downvote: 0,
};

const model = {
  currentId: 1,
  locationReviewScore: {
    score: null,
    totalReviews: null,
  },
  checkinStatus: null, // State that indicates if user is checked in the fishing location before
  personalReview: {},
  locationReviewList: [],
  totalReviewPage: 1,
  locationPostPageNumber: 0,
  locationCatchPageNumber: 0,
  locationOverview: {},
  lakeList: [],
  lakeDetail: {},
  locationPostList: [],
  locationCatchList: [],
  totalPostPage: 1,
  totalCatchPage: 1,
  catchReportDetail: {},

  setCurrentId: action((state, payload) => {
    state.currentId = payload;
  }),

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),

  setLocationPostPageNumber: action((state, payload) => {
    state.locationPostPageNumber = payload;
  }),
  setLocationOverview: action((state, payload) => {
    state.locationOverview = payload;
  }),
  setLakeList: action((state, payload) => {
    state.lakeList = payload;
  }),
  setLakeDetail: action((state, payload) => {
    state.lakeDetail = payload;
  }),
  setLocationPostList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationPostList = payload.data;
    else state.locationPostList = state.locationPostList.concat(payload.data);
  }),
  setTotalPostPage: action((state, payload) => {
    state.totalPostPage = payload < 1 ? 1 : payload;
  }),
  setLocationCatchList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationCatchList = payload.data;
    else state.locationCatchList = state.locationCatchList.concat(payload.data);
  }),
  setTotalCatchPage: action((state, payload) => {
    state.totalCatchPage = payload < 1 ? 1 : payload;
  }),
  // START OF REVIEW RELATED STUFF

  /**
   * Set data for location review score
   * @param {Object} [payload] params pass to function
   * @param {Number} [payload.score] average score of location
   * @param {Number} [payload.totalReviews] total number of reviews
   */
  setLocationReviewScore: action((state, payload) => {
    state.locationReviewScore = payload;
  }),
  /**
   * Set data for personal review of current user in fishing location
   */
  setPersonalReview: action((state, payload) => {
    state.personalReview = payload;
  }),
  /**
   * Set data for location review list
   * @param {Object} [payload] params pass to function
   * @param {String} [payload.status] property indicates that overwrite the list or append new data
   */
  setLocationReviewList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationReviewList = payload.data;
    else
      state.locationReviewList = state.locationReviewList.concat(payload.data);
  }),
  /**
   * Set total review page
   * Total review page can not be less than 1
   */
  setTotalReviewPage: action((state, payload) => {
    state.totalReviewPage = payload < 1 ? 1 : payload;
  }),
  /**
   * Reset personal review data
   */
  resetPersonalReview: action((state) => {
    state.personalReview = { ...initialPersonalReviewShape };
  }),
  /**
   * Get location review score
   */
  getLocationReviewScore: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/${API_URL.LOCATION_REVIEW_SCORE}`,
    );
    actions.setLocationReviewScore(data);
  }),
  /**
   * Get personal review data by call API
   */
  getPersonalReview: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/${API_URL.LOCATION_REVIEW_PERSONAL}`,
    );
    if (data.id) actions.setPersonalReview(data);
    else actions.setPersonalReview({});
  }),
  /**
   * Get list of reviews by page
   * @param {Object} payload - params pass to function
   * @param {number} payload.pageNo - current page value
   * @param {string} payload.filter - filter type of list
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
   * @param {Object} payload - params pass to function
   * @param {number} payload.reviewId - id of the review that need to be vote
   * @param {number} payload.vote - type of vote (0 or 1)
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
    // If vote success
    if (status === 200)
      // Reset vote count of the voted review
      actions.resetVoteOfReview({
        id: reviewId,
        userVoteType,
        upvote,
        downvote,
      });
  }),
  /**
   * Reset vote count of a review in review list
   * @param {Object} payload - new data of the review
   * @param {number} payload.id - id of the review
   * @param {boolean} payload.userVoteType - new vote type of the review
   * @param {number} payload.upvote - new upvote count of the review
   * @param {number} payload.downvote - new downvote count of the review
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
  /**
   * Delete personal review
   */
  deletePersonalReview: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { status } = await http.delete(
      `location/${currentId}/${API_URL.LOCATION_REVIEW_PERSONAL_DELETE}`,
    );
    if (status === 200) actions.setPersonalReview({ id: null });
  }),
  /**
   * Post new review
   * @param {Object} payload params pass to function
   * @param {string} payload.description description of the vote
   * @param {number} payload.score score for the vote
   */
  postReview: thunk(async (actions, payload, { getState }) => {
    const { description, score } = payload;
    const { currentId } = getState();
    const { status, data } = await http.post(
      `location/${currentId}/${API_URL.LOCATION_REVIEW_PERSONAL_POST}`,
      {
        description,
        score,
      },
    );
    if (status === 200) actions.setPersonalReview({ ...data, id: null });
    return status;
  }),

  // END OF REVIEW RELATED STUFF

  getLocationOverview: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(`location/${getState().currentId}`);
    actions.setLocationOverview(data);
  }),
  getLocationOverviewById: thunk(async (actions, payload) => {
    const { data } = await http.get(`location/${payload.id}`);
    actions.setLocationOverview(data);
  }),
  saveLocation: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.post(`location/${getState().currentId}/save`);
    actions.setLocationOverview({
      ...getState().locationOverview,
      saved: data.saved,
    });
  }),
  getLakeList: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/${API_URL.LOCATION_LAKE_ALL}`,
    );
    actions.setLakeList(data);
  }),
  getLakeListByLocationId: thunk(async (actions, payload) => {
    const { data } = await http.get(
      `location/${payload.id}/${API_URL.LOCATION_LAKE_ALL}`,
    );
    actions.setLakeList(data);
  }),
  getLakeDetailByLakeId: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/lake/${payload.id}`,
    );
    actions.setLakeDetail(data);
  }),
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

  // START OF CHECKIN STATUS RELATED STUFF

  /**
   * Set value for checkin status
   */
  setCheckinStatus: action((state, payload) => {
    state.checkinStatus = payload;
  }),
  /**
   * Get checkin status indicating that if angler is checked in at the fishing location before
   */
  getCheckinStatus: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    try {
      const { data } = await http.get(
        `location/${currentId}/${API_URL.LOCATION_CHECKIN_STATUS}`,
      );
      actions.setCheckinStatus(data.responseText);
    } catch (error) {
      actions.setCheckinStatus(false);
    }
  }),
  // END OF CHECKIN STATUS RELATED STUFF
  currentPinPost: {},
  setCurrentPinPost: action((state, payload) => {
    state.currentPinPost = payload;
  }),
  getPinPost: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { data } = await http.get(`/location/${currentId}/post/pinned`);
    actions.setCurrentPinPost(data);
  }),
};
export default model;
