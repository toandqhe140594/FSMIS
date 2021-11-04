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
  setCurrentId: action((state, payload) => {
    state.currentId = payload;
  }),
  setLocationReviewScore: action((state, payload) => {
    state.locationReviewScore = payload;
  }),

  setCatchReportDetail: action((state, payload) => {
    state.catchReportDetail = payload;
  }),

  setPersonalReview: action((state, payload) => {
    state.personalReview = payload;
  }),
  setLocationReviewList: action((state, payload) => {
    if (payload.status === "Overwrite") state.locationReviewList = payload.data;
    else
      state.locationReviewList = state.locationReviewList.concat(payload.data);
  }),
  setTotalReviewPage: action((state, payload) => {
    state.totalReviewPage = payload < 1 ? 1 : payload;
  }),
  resetPersonalReview: action((state) => {
    state.personalReview = { ...initialPersonalReviewShape };
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
  getLocationReviewScore: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/${API_URL.LOCATION_REVIEW_SCORE}`,
    );
    actions.setLocationReviewScore(data);
  }),
  getPersonalReview: thunk(async (actions, payload, { getState }) => {
    const { data } = await http.get(
      `location/${getState().currentId}/${API_URL.LOCATION_REVIEW_PERSONAL}`,
    );
    if (data.id) actions.setPersonalReview(data);
    else actions.setPersonalReview({});
  }),
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
  deletePersonalReview: thunk(async (actions, payload, { getState }) => {
    const { currentId } = getState();
    const { status } = await http.delete(
      `location/${currentId}/${API_URL.LOCATION_REVIEW_PERSONAL_DELETE}`,
    );
    if (status === 200) actions.setPersonalReview({ id: null });
  }),
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
    const { data } = await http.get(`location/${currentId}/catch`, {
      params: { pageNo },
    });
    actions.setTotalCatchPage(data.totalPage);
    actions.setLocationCatchList({
      data: data.items,
      status: pageNo === 1 ? "Overwrite" : "Append",
    });
  }),
};
export default model;
