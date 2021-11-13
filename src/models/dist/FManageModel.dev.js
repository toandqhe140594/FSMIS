"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyPeasy = require("easy-peasy");

var _constants = require("../constants");

var _utilities = require("../utilities");

var _Http = _interopRequireDefault(require("../utilities/Http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Need change in getCatchReportHistoryOverwrite about dates
var model = {
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
  catchHistoryCurrentPage: 1,
  catchHistoryTotalPage: 1,
  checkinHistoryList: [],
  anglerCheckinOverviewInfor: {},
  locationReviewScore: {
    score: null,
    totalReviews: null
  },
  locationReviewList: [],
  totalReviewPage: 1,
  locationPostList: [],
  totalPostPage: 1,
  locationCatchList: [],
  // List of public catch report to display on overview screen
  totalCatchPage: 1,
  currentPost: {},
  postDetail: {},
  checkinHistoryCurrentPage: 1,
  checkinHistoryTotalPage: 1,
  lakePostPageNo: 1,
  currentPinPost: {},
  setLakePostPageNo: (0, _easyPeasy.action)(function (state, payload) {
    state.lakePostPageNo = payload;
  }),
  setCurrentId: (0, _easyPeasy.action)(function (state, payload) {
    state.currentId = payload;
  }),
  setLocationLatLng: (0, _easyPeasy.action)(function (state, payload) {
    state.locationLatLng = payload;
  }),
  setListOfFishingLocations: (0, _easyPeasy.action)(function (state, payload) {
    state.listOfFishingLocations = payload;
  }),
  getListOfFishingLocations: (0, _easyPeasy.thunk)(function _callee(actions) {
    var payload,
        _ref,
        data,
        _args = arguments;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = _args.length > 1 && _args[1] !== undefined ? _args[1] : function () {};
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].get("".concat(_constants.API_URL.PERSONAL_OWNED_LOCATION)));

          case 4:
            _ref = _context.sent;
            data = _ref.data;
            payload(true);
            actions.setListOfFishingLocations(data);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            payload(false);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 10]]);
  }),

  /**
   * Set location detail state
   * @param {Object} [payload] new location details
   */
  setLocationDetails: (0, _easyPeasy.action)(function (state, payload) {
    state.locationDetails = payload;
  }),
  getLocationDetailsById: (0, _easyPeasy.thunk)(function _callee2(actions, payload) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(payload.id)));

          case 2:
            _ref2 = _context2.sent;
            data = _ref2.data;
            actions.setLocationDetails(data);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  }),
  setListOfLake: (0, _easyPeasy.action)(function (state, payload) {
    state.listOfLake = payload;
  }),
  removeLakeFromList: (0, _easyPeasy.action)(function (state, payload) {
    var newList = state.listOfLake.filter(function (lake) {
      return lake.id !== payload.id;
    });
    state.listOfLake = newList;
  }),
  getListOfLake: (0, _easyPeasy.thunk)(function _callee3(actions, payload, _ref3) {
    var getState, _ref4, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            getState = _ref3.getState;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(payload.id ? payload.id : getState().currentId, "/").concat(_constants.API_URL.LOCATION_LAKE_ALL)));

          case 3:
            _ref4 = _context3.sent;
            data = _ref4.data;
            actions.setListOfLake(data);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    });
  }),
  setLakeDetail: (0, _easyPeasy.action)(function (state, payload) {
    state.lakeDetail = payload;
  }),

  /**
   * Get lake detail by id and update lakeDetail state
   * @param {Number} [payload.id] lake id
   */
  getLakeDetailByLakeId: (0, _easyPeasy.thunk)(function _callee4(actions, payload, _ref5) {
    var getState, _ref6, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            getState = _ref5.getState;
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(getState().currentId, "/lake/").concat(payload.id)));

          case 4:
            _ref6 = _context4.sent;
            data = _ref6.data;
            actions.setLakeDetail(data);
            _context4.next = 11;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }),

  /**
   * Close lake of fishing location
   * @param {Object} [payload] the payload pass to function
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  closeLakeByLakeId: (0, _easyPeasy.thunk)(function _callee5(actions, payload, _ref7) {
    var getState, _getState, currentId, id, setDeleteSuccess, _ref8, status;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            getState = _ref7.getState;
            _getState = getState(), currentId = _getState.currentId;
            id = payload.id, setDeleteSuccess = payload.setDeleteSuccess;
            _context5.prev = 3;
            _context5.next = 6;
            return regeneratorRuntime.awrap(_Http["default"]["delete"]("location/".concat(currentId, "/").concat(_constants.API_URL.LOCATION_LAKE_CLOSE, "/").concat(id)));

          case 6:
            _ref8 = _context5.sent;
            status = _ref8.status;

            if (status === 200) {
              actions.removeLakeFromList({
                id: id
              });
              setDeleteSuccess(true);
            }

            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](3);
            setDeleteSuccess(false);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  // START OF REVIEW RELATED SECTION

  /**
   * Set data for locationReviewList
   * If status = Overwrite then overwrite all the list, else append new data to list
   */
  setLocationReviewList: (0, _easyPeasy.action)(function (state, payload) {
    // If status indicated that the list need to be overwritten
    if (payload.status === "Overwrite") state.locationReviewList = payload.data;else state.locationReviewList = state.locationReviewList.concat(payload.data);
  }),

  /**
   * Set total page of reviews
   * The total page can not be lower than 1
   */
  setTotalReviewPage: (0, _easyPeasy.action)(function (state, payload) {
    state.totalReviewPage = payload < 1 ? 1 : payload;
  }),

  /**
   * Set data for locationReviewScore
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.score] average review score of location
   * @param {Number} [payload.totalReviews] total numbers of reviews
   */
  setLocationReviewScore: (0, _easyPeasy.action)(function (state, payload) {
    state.locationReviewScore = payload;
  }),

  /**
   * Get the average review score and the number of review of the location
   */
  getLocationReviewScore: (0, _easyPeasy.thunk)(function _callee6(actions, payload, _ref9) {
    var getState, _ref10, data;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            getState = _ref9.getState;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(getState().currentId, "/").concat(_constants.API_URL.LOCATION_REVIEW_SCORE)));

          case 3:
            _ref10 = _context6.sent;
            data = _ref10.data;
            actions.setLocationReviewScore(data);

          case 6:
          case "end":
            return _context6.stop();
        }
      }
    });
  }),

  /**
   * Get review data by page and filter type
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.pageNo] the page of data need to get
   * @param {String} [payload.filter] the filter type of data
   */
  getLocationReviewListByPage: (0, _easyPeasy.thunk)(function _callee7(actions, payload, _ref11) {
    var getState, pageNo, filter, _getState2, currentId, totalReviewPage, _ref12, data;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            getState = _ref11.getState;
            pageNo = payload.pageNo, filter = payload.filter;
            _getState2 = getState(), currentId = _getState2.currentId, totalReviewPage = _getState2.totalReviewPage; // If current page greater than total page or less than 1 then return

            if (!(pageNo > totalReviewPage || pageNo <= 0)) {
              _context7.next = 5;
              break;
            }

            return _context7.abrupt("return");

          case 5:
            _context7.next = 7;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/review"), {
              params: {
                pageNo: pageNo,
                filter: filter
              }
            }));

          case 7:
            _ref12 = _context7.sent;
            data = _ref12.data;
            actions.setTotalReviewPage(data.totalPage);
            actions.setLocationReviewList({
              data: data.items,
              status: pageNo === 1 ? "Overwrite" : "Append"
            });

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    });
  }),

  /**
   * Vote a review
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.reviewId] the id of the review
   * @param {Number} [payload.vote] 0 or 1, type of vote
   */
  voteReview: (0, _easyPeasy.thunk)(function _callee8(actions, payload, _ref13) {
    var getState, reviewId, vote, _getState3, currentId, _ref14, status, data, userVoteType, upvote, downvote;

    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            getState = _ref13.getState;
            reviewId = payload.reviewId, vote = payload.vote;
            _getState3 = getState(), currentId = _getState3.currentId;
            _context8.next = 5;
            return regeneratorRuntime.awrap(_Http["default"].post("location/".concat(currentId, "/review/").concat(reviewId), null, {
              params: {
                vote: vote
              }
            }));

          case 5:
            _ref14 = _context8.sent;
            status = _ref14.status;
            data = _ref14.data;
            userVoteType = data.userVoteType, upvote = data.upvote, downvote = data.downvote;
            if (status === 200) actions.resetVoteOfReview({
              id: reviewId,
              userVoteType: userVoteType,
              upvote: upvote,
              downvote: downvote
            });

          case 10:
          case "end":
            return _context8.stop();
        }
      }
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
  resetVoteOfReview: (0, _easyPeasy.action)(function (state, payload) {
    var id = payload.id,
        userVoteType = payload.userVoteType,
        upvote = payload.upvote,
        downvote = payload.downvote;
    var review = state.locationReviewList[state.locationReviewList.findIndex(function (x) {
      return x.id === id;
    })];
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
  setTotalPostPage: (0, _easyPeasy.action)(function (state, payload) {
    state.totalPostPage = payload < 1 ? 1 : payload;
  }),

  /**
   * Set data for post list
   * @param {Object} [payload] the payload pass to function
   * @param {Array} [payload.data] the data of the list
   * @param {String} [payload.status] indicate that the post list should be overwritten or append new data
   */
  setLocationPostList: (0, _easyPeasy.action)(function (state, payload) {
    if (payload.status === "Overwrite") state.locationPostList = payload.data;else state.locationPostList = state.locationPostList.concat(payload.data);
  }),
  setLocationPostListFirstPage: (0, _easyPeasy.action)(function (state, payload) {
    state.locationPostList = payload.data;
  }),

  /**
   * Get posts data by page
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.pageNo] the page of data need to get
   */
  getLocationPostListByPage: (0, _easyPeasy.thunk)(function _callee9(actions, payload, _ref15) {
    var getState, pageNo, _getState4, currentId, totalPostPage, _ref16, data;

    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            getState = _ref15.getState;
            pageNo = payload.pageNo;
            _getState4 = getState(), currentId = _getState4.currentId, totalPostPage = _getState4.totalPostPage;

            if (!(pageNo > totalPostPage || pageNo <= 0)) {
              _context9.next = 5;
              break;
            }

            return _context9.abrupt("return");

          case 5:
            _context9.next = 7;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/post"), {
              params: {
                pageNo: pageNo
              }
            }));

          case 7:
            _ref16 = _context9.sent;
            data = _ref16.data;
            actions.setTotalPostPage(data.totalPage);
            actions.setLocationPostList({
              data: data.items,
              status: pageNo === 1 ? "Overwrite" : "Append"
            });

          case 11:
          case "end":
            return _context9.stop();
        }
      }
    });
  }),
  getLocationPostListFirstPage: (0, _easyPeasy.thunk)(function _callee10(actions, payload, _ref17) {
    var getState, _getState5, currentId, lakePostPageNo, _ref18, data;

    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            getState = _ref17.getState;
            _getState5 = getState(), currentId = _getState5.currentId, lakePostPageNo = _getState5.lakePostPageNo;
            actions.setLakePostPageNo(2);
            _context10.next = 5;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/post"), {
              params: {
                lakePostPageNo: lakePostPageNo
              }
            }));

          case 5:
            _ref18 = _context10.sent;
            data = _ref18.data;
            actions.setTotalPostPage(data.totalPage);
            actions.setLocationPostListFirstPage({
              data: data.items
            });

          case 9:
          case "end":
            return _context10.stop();
        }
      }
    });
  }),
  createNewPost: (0, _easyPeasy.thunk)(function _callee11(actions, payload, _ref19) {
    var getState, updateData, setUpdateStatus, _getState6, currentId;

    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            getState = _ref19.getState;
            updateData = payload.updateData, setUpdateStatus = payload.setUpdateStatus;
            _getState6 = getState(), currentId = _getState6.currentId;
            _context11.prev = 3;
            _context11.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("location/".concat(currentId, "/post/add"), updateData));

          case 6:
            _context11.next = 8;
            return regeneratorRuntime.awrap(actions.getLocationPostListFirstPage());

          case 8:
            setUpdateStatus(true);
            _context11.next = 14;
            break;

          case 11:
            _context11.prev = 11;
            _context11.t0 = _context11["catch"](3);
            setUpdateStatus(false);

          case 14:
          case "end":
            return _context11.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  editPost: (0, _easyPeasy.thunk)(function _callee12(actions, payload, _ref20) {
    var getState, _getState7, currentId, updateData, setUpdateStatus;

    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            getState = _ref20.getState;
            _getState7 = getState(), currentId = _getState7.currentId;
            updateData = payload.updateData, setUpdateStatus = payload.setUpdateStatus;
            _context12.prev = 3;
            _context12.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].put("location/".concat(currentId, "/post/edit"), updateData));

          case 6:
            setUpdateStatus("SUCCESS");
            _context12.next = 12;
            break;

          case 9:
            _context12.prev = 9;
            _context12.t0 = _context12["catch"](3);
            setUpdateStatus("FAILED");

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, null, null, [[3, 9]]);
  }),
  deletePost: (0, _easyPeasy.thunk)(function _callee13(actions, payload, _ref21) {
    var getState, postId, setDeleteSuccess, _getState8, currentId;

    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            getState = _ref21.getState;
            postId = payload.postId, setDeleteSuccess = payload.setDeleteSuccess;
            _getState8 = getState(), currentId = _getState8.currentId;
            _context13.prev = 3;
            _context13.next = 6;
            return regeneratorRuntime.awrap(_Http["default"]["delete"]("location/".concat(currentId, "/post/delete/").concat(postId)));

          case 6:
            actions.removePostFromPostList(postId);
            setDeleteSuccess(true);
            _context13.next = 13;
            break;

          case 10:
            _context13.prev = 10;
            _context13.t0 = _context13["catch"](3);
            setDeleteSuccess(false);

          case 13:
          case "end":
            return _context13.stop();
        }
      }
    }, null, null, [[3, 10]]);
  }),

  /**
   * Remove post from the post list state
   * @param {number} payload id of the post that need to be remove
   */
  removePostFromPostList: (0, _easyPeasy.action)(function (state, payload) {
    state.locationPostList = state.locationPostList.filter(function (post) {
      return post.id !== payload;
    });
  }),
  setCurrentPost: (0, _easyPeasy.action)(function (state, payload) {
    state.currentPost = payload;
  }),
  // END OF POST RELATED SECTION
  // START OF CATCH REPORT RELATED SECTION

  /**
   * Set value for total page number of post list
   * The value of total page can not be smaller than 1
   */
  setTotalCatchPage: (0, _easyPeasy.action)(function (state, payload) {
    state.totalCatchPage = payload < 1 ? 1 : payload;
  }),

  /**
   * Set data for catch reports list for display on the location overview page
   * @param {Object} [payload] the payload pass to function
   * @param {Array} [payload.data] the data of the list
   * @param {String} [payload.status] indicate that the list should be overwritten or append new data
   */
  setLocationCatchList: (0, _easyPeasy.action)(function (state, payload) {
    if (payload.status === "Overwrite") state.locationCatchList = payload.data;else state.locationCatchList = state.locationCatchList.concat(payload.data);
  }),

  /**
   * Get catch reports data by page
   * @param {Object} [payload] the payload pass to function
   * @param {Number} [payload.pageNo] the page of data need to get
   */
  getLocationCatchListByPage: (0, _easyPeasy.thunk)(function _callee14(actions, payload, _ref22) {
    var getState, pageNo, _getState9, currentId, totalCatchPage, _ref23, data;

    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            getState = _ref22.getState;
            pageNo = payload.pageNo;
            _getState9 = getState(), currentId = _getState9.currentId, totalCatchPage = _getState9.totalCatchPage;

            if (!(pageNo > totalCatchPage || pageNo <= 0)) {
              _context14.next = 5;
              break;
            }

            return _context14.abrupt("return");

          case 5:
            _context14.next = 7;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/").concat(_constants.API_URL.LOCATION_CATCH_REPORT_PUBLIC), {
              params: {
                pageNo: pageNo
              }
            }));

          case 7:
            _ref23 = _context14.sent;
            data = _ref23.data;
            actions.setTotalCatchPage(data.totalPage);
            actions.setLocationCatchList({
              data: data.items,
              status: pageNo === 1 ? "Overwrite" : "Append"
            });

          case 11:
          case "end":
            return _context14.stop();
        }
      }
    });
  }),
  // END OF CATCH REPORT RELATED SECTION
  // START OF STAFF RELATED SECTION

  /**
   * Set error message for staff related stuff
   */
  setStaffManagementErrorMsg: (0, _easyPeasy.action)(function (state, payload) {
    state.staffManagementErrorMsg = payload;
  }),

  /**
   * Set list of staffs data
   */
  setListOfStaff: (0, _easyPeasy.action)(function (state, payload) {
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
  setStaffOverview: (0, _easyPeasy.action)(function (state, payload) {
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
  setStaffDetail: (0, _easyPeasy.action)(function (state, payload) {
    state.staffDetail = payload;
  }),

  /**
   * Get data for list of staff from api
   */
  getListOfStaff: (0, _easyPeasy.thunk)(function _callee15(actions, payload, _ref24) {
    var getState, _ref25, data;

    return regeneratorRuntime.async(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            getState = _ref24.getState;
            _context15.next = 3;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(getState().currentId, "/staff")));

          case 3:
            _ref25 = _context15.sent;
            data = _ref25.data;
            actions.setListOfStaff(data);

          case 6:
          case "end":
            return _context15.stop();
        }
      }
    });
  }),

  /**
   * Find overview data of staff by phone
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.phone] the phone of the staff
   */
  findStaffByPhone: (0, _easyPeasy.thunk)(function _callee16(actions, payload) {
    var phone, _ref26, data, status;

    return regeneratorRuntime.async(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            phone = payload.phone;
            _context16.prev = 1;
            _context16.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post("location/".concat(_constants.API_URL.STAFF_FIND_BY_PHONE, "/").concat(phone), {}));

          case 4:
            _ref26 = _context16.sent;
            data = _ref26.data;
            status = _ref26.status;
            if (status === 200) actions.setStaffOverview(data);
            _context16.next = 13;
            break;

          case 10:
            _context16.prev = 10;
            _context16.t0 = _context16["catch"](1);
            actions.setStaffOverview({});

          case 13:
          case "end":
            return _context16.stop();
        }
      }
    }, null, null, [[1, 10]]);
  }),

  /**
   * Get information of the staff by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.id] the userId of the staff that need to get information
   */
  getStaffDetailById: (0, _easyPeasy.thunk)(function _callee17(actions, payload, _ref27) {
    var getState, _getState10, currentId, id, _ref28, data, status;

    return regeneratorRuntime.async(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            getState = _ref27.getState;
            _getState10 = getState(), currentId = _getState10.currentId;
            id = payload.id;
            _context17.prev = 3;
            _context17.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/staff/").concat(id)));

          case 6:
            _ref28 = _context17.sent;
            data = _ref28.data;
            status = _ref28.status;
            if (status === 200) actions.setStaffDetail(data);
            _context17.next = 15;
            break;

          case 12:
            _context17.prev = 12;
            _context17.t0 = _context17["catch"](3);
            actions.setStaffDetail({});

          case 15:
          case "end":
            return _context17.stop();
        }
      }
    }, null, null, [[3, 12]]);
  }),

  /**
   * Add staff to fishing location by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.userId] the userId of the staff that need to be added
   * @param {Function} [payload.setSuccess] the function to set action success indicator
   */
  addStaffById: (0, _easyPeasy.thunk)(function _callee18(actions, payload, _ref29) {
    var getState, _getState11, currentId, userId, setSuccess, _ref30, status;

    return regeneratorRuntime.async(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            getState = _ref29.getState;
            _getState11 = getState(), currentId = _getState11.currentId;
            userId = payload.userId, setSuccess = payload.setSuccess;
            _context18.prev = 3;
            _context18.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("location/".concat(currentId, "/").concat(_constants.API_URL.STAFF_ADD, "/").concat(userId)));

          case 6:
            _ref30 = _context18.sent;
            status = _ref30.status;

            if (status === 200) {
              actions.getListOfStaff();
              setSuccess(true);
            }

            _context18.next = 14;
            break;

          case 11:
            _context18.prev = 11;
            _context18.t0 = _context18["catch"](3);
            setSuccess(false);

          case 14:
          case "end":
            return _context18.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),

  /**
   * Delete staff from fishing location by id
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.userId] the userId of the staff that need to be delete
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  deleteStaffById: (0, _easyPeasy.thunk)(function _callee19(actions, payload, _ref31) {
    var getState, _getState12, currentId, userId, setDeleteSuccess, _ref32, status;

    return regeneratorRuntime.async(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            getState = _ref31.getState;
            _getState12 = getState(), currentId = _getState12.currentId;
            userId = payload.userId, setDeleteSuccess = payload.setDeleteSuccess;
            _context19.prev = 3;
            _context19.next = 6;
            return regeneratorRuntime.awrap(_Http["default"]["delete"]("location/".concat(currentId, "/").concat(_constants.API_URL.STAFF_DELETE, "/").concat(userId)));

          case 6:
            _ref32 = _context19.sent;
            status = _ref32.status;

            if (status === 200) {
              actions.getListOfStaff();
              setDeleteSuccess(true);
            }

            _context19.next = 14;
            break;

          case 11:
            _context19.prev = 11;
            _context19.t0 = _context19["catch"](3);
            setDeleteSuccess(false);

          case 14:
          case "end":
            return _context19.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  // END OF STAFF RELATED SECTION
  // START OF FISHING LOCATION MANAGEMENT RELATED SECTION

  /**
   * Close the fishing location
   * @param {Object} [payload] the payload pass to function
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  closeFishingLocation: (0, _easyPeasy.thunk)(function _callee20(actions, payload, _ref33) {
    var getState, _getState13, currentId, setDeleteSuccess, _ref34, status;

    return regeneratorRuntime.async(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            getState = _ref33.getState;
            _getState13 = getState(), currentId = _getState13.currentId;
            setDeleteSuccess = payload.setDeleteSuccess;
            _context20.prev = 3;
            _context20.next = 6;
            return regeneratorRuntime.awrap(_Http["default"]["delete"]("".concat(_constants.API_URL.LOCATION_CLOSE, "/").concat(currentId)));

          case 6:
            _ref34 = _context20.sent;
            status = _ref34.status;

            if (status === 200) {
              actions.getListOfFishingLocations();
              setDeleteSuccess(true);
            }

            _context20.next = 14;
            break;

          case 11:
            _context20.prev = 11;
            _context20.t0 = _context20["catch"](3);
            setDeleteSuccess(false);

          case 14:
          case "end":
            return _context20.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),

  /**
   * Close the fishing location temporary
   * @param {Object} [payload] the payload pass to function
   * @param {Function} [payload.setDeleteSuccess] the function to set delete success indicator
   */
  closeFishingLocationTemporary: (0, _easyPeasy.thunk)(function _callee21(actions, payload, _ref35) {
    var getState, _getState14, currentId, setDeleteSuccess, _ref36, status;

    return regeneratorRuntime.async(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            getState = _ref35.getState;
            _getState14 = getState(), currentId = _getState14.currentId;
            setDeleteSuccess = payload.setDeleteSuccess;
            _context21.prev = 3;
            _context21.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("".concat(_constants.API_URL.LOCATION_CLOSE_TEMPORARY, "/").concat(currentId)));

          case 6:
            _ref36 = _context21.sent;
            status = _ref36.status;

            if (status === 200) {
              // actions.getListOfFishingLocations();
              actions.switchFishingLocationClosedState({
                id: currentId
              });
              setDeleteSuccess(true);
            }

            _context21.next = 14;
            break;

          case 11:
            _context21.prev = 11;
            _context21.t0 = _context21["catch"](3);
            setDeleteSuccess(false);

          case 14:
          case "end":
            return _context21.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  switchFishingLocationClosedState: (0, _easyPeasy.action)(function (state, payload) {
    var closed = state.locationDetails.closed;
    state.locationDetails = _objectSpread({}, state.locationDetails, {
      closed: !closed
    });
    var foundIndex = state.listOfFishingLocations.findIndex(function (location) {
      return location.id === payload.id;
    });
    state.listOfFishingLocations[foundIndex] = _objectSpread({}, state.listOfFishingLocations[foundIndex], {
      closed: !closed
    });
  }),
  // DucHM ADD_START 4/11/2021

  /**
   * Add new fishing location
   * @param {Object} [payload.addData] an object pass to POST body
   * @param {Function} [payload.setAddStatus] the function set status
   */
  addNewLocation: (0, _easyPeasy.thunk)(function _callee22(actions, payload) {
    var addData, setAddStatus;
    return regeneratorRuntime.async(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            addData = payload.addData, setAddStatus = payload.setAddStatus;
            _context22.prev = 1;
            _context22.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post(_constants.API_URL.LOCATION_ADD, addData, {
              params: {}
            }));

          case 4:
            _context22.next = 6;
            return regeneratorRuntime.awrap(actions.getListOfFishingLocations());

          case 6:
            setAddStatus("SUCCESS");
            _context22.next = 12;
            break;

          case 9:
            _context22.prev = 9;
            _context22.t0 = _context22["catch"](1);
            setAddStatus("FAILED");

          case 12:
          case "end":
            return _context22.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }),
  // DucHM ADD_END 4/11/2021

  /**
   * Suggest a new location to admin
   * @param {Object} [payload] params pass to function
   * @param {Object} [payload.data] some data of the fishing location
   * @param {string} [payload.data.locationName] name of the fishing location
   * @param {string} [payload.data.ownerPhone] phone of the owner of the fishing location
   * @param {Function} [payload.setSuccess] function to indicate request success
   */
  suggestNewLocation: (0, _easyPeasy.thunk)(function _callee23(actions, payload) {
    var data, setSuccess;
    return regeneratorRuntime.async(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            data = payload.data, setSuccess = payload.setSuccess;
            _context23.prev = 1;
            _context23.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post(_constants.API_URL.LOCATION_SUGGEST, data));

          case 4:
            setSuccess(true);
            _context23.next = 10;
            break;

          case 7:
            _context23.prev = 7;
            _context23.t0 = _context23["catch"](1);
            setSuccess(false);

          case 10:
          case "end":
            return _context23.stop();
        }
      }
    }, null, null, [[1, 7]]);
  }),
  editLakeDetailData: (0, _easyPeasy.action)(function (state, payload) {
    state.lakeDetail = _objectSpread({}, state.lakeDetail, {}, payload);
  }),
  // DucHM ADD_START 5/11/2021

  /**
   * Add new lake to a fishing location
   * If there no fishing location id pass in, get current id in state
   * @param {Object} [payload.addData] an object pass to POST body
   * @param {Function} [payload.setAddStatus] the function set status
   */
  addNewLakeInLocation: (0, _easyPeasy.thunk)(function _callee24(actions, payload, _ref37) {
    var getState, addData, setAddStatus, _getState15, currentId;

    return regeneratorRuntime.async(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            getState = _ref37.getState;
            addData = payload.addData, setAddStatus = payload.setAddStatus;
            _getState15 = getState(), currentId = _getState15.currentId;
            _context24.prev = 3;
            _context24.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("location/".concat(currentId, "/lake/add"), addData));

          case 6:
            setAddStatus("SUCCESS");
            actions.getListOfLake({
              id: currentId
            });
            _context24.next = 13;
            break;

          case 10:
            _context24.prev = 10;
            _context24.t0 = _context24["catch"](3);
            setAddStatus("FAILED");

          case 13:
          case "end":
            return _context24.stop();
        }
      }
    }, null, null, [[3, 10]]);
  }),
  // DucHM ADD_END 5/11/2021
  // DucHM ADD_START 6/11/2021

  /**
   * Update lake detail (methods, dimensions, name, price)
   * @param {Number} [payload.id] lake id
   * @param {Object} [payload.updateData] updated information
   * @param {Function} [payload.setUpdateStatus] the function set status
   */
  editLakeDetail: (0, _easyPeasy.thunk)(function _callee25(actions, payload, _ref38) {
    var getState, updateData, setUpdateStatus, id, _getState16, currentId;

    return regeneratorRuntime.async(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            getState = _ref38.getState;
            updateData = payload.updateData, setUpdateStatus = payload.setUpdateStatus, id = payload.id;
            _getState16 = getState(), currentId = _getState16.currentId;
            _context25.prev = 3;
            _context25.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].put("location/".concat(currentId, "/lake/edit/").concat(id), updateData));

          case 6:
            actions.editLakeDetailData(_objectSpread({}, updateData, {
              id: id
            }));
            actions.getListOfLake({
              id: currentId
            });
            setUpdateStatus("SUCCESS");
            _context25.next = 14;
            break;

          case 11:
            _context25.prev = 11;
            _context25.t0 = _context25["catch"](3);
            setUpdateStatus("FAILED");

          case 14:
          case "end":
            return _context25.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  // DucHM ADD_END 6/11/2021
  // DucHM ADD_START 7/11/2021
  editFishingLocationDetailData: (0, _easyPeasy.action)(function (state, payload) {
    state.locationDetails = _objectSpread({}, state.locationDetails, {}, payload);
  }),

  /**
   * Update fishing location profile
   * @param {Object} [payload.updateData] update information
   * @param {Function} [payload.setUpdateStatus] the function set status
   */
  editFishingLocation: (0, _easyPeasy.thunk)(function _callee26(actions, payload, _ref39) {
    var getState, updateData, setUpdateStatus, _getState17, currentId;

    return regeneratorRuntime.async(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            getState = _ref39.getState;
            updateData = payload.updateData, setUpdateStatus = payload.setUpdateStatus;
            _getState17 = getState(), currentId = _getState17.currentId;
            _context26.prev = 3;
            _context26.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].put("location/edit/".concat(currentId), updateData));

          case 6:
            actions.editFishingLocationDetailData(_objectSpread({}, updateData, {
              image: _toConsumableArray(updateData.images)
            }));
            actions.getListOfFishingLocations();
            setUpdateStatus("SUCCESS");
            _context26.next = 14;
            break;

          case 11:
            _context26.prev = 11;
            _context26.t0 = _context26["catch"](3);
            setUpdateStatus("FAILED");

          case 14:
          case "end":
            return _context26.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  // DucHM ADD_END 7/11/2021
  // END OF FISHING LOCATION MANAGEMENT RELATED SECTION
  // START OF LAKE FISH MANAGEMENT SECTION
  // DucHM ADD_START 8/11/2021

  /**
   * Add new fish to lake
   * @param {Object} addData new fish information
   * @param {Function} addData the function to set state
   */
  addFishToLake: (0, _easyPeasy.thunk)(function _callee27(actions, payload, _ref40) {
    var getState, addData, setAddStatus, _getState18, id;

    return regeneratorRuntime.async(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            getState = _ref40.getState;
            addData = payload.addData, setAddStatus = payload.setAddStatus;
            _getState18 = getState(), id = _getState18.lakeDetail.id;
            _context27.prev = 3;
            _context27.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("location/lake/".concat(id, "/fish/add"), addData));

          case 6:
            actions.getLakeDetailByLakeId({
              id: id
            });
            setAddStatus("SUCCESS");
            _context27.next = 13;
            break;

          case 10:
            _context27.prev = 10;
            _context27.t0 = _context27["catch"](3);
            setAddStatus("FAILED");

          case 13:
          case "end":
            return _context27.stop();
        }
      }
    }, null, null, [[3, 10]]);
  }),

  /**
   * Delete a fish from lake by id
   * @param {Number} [payload.id] id of the fish to delete from lake
   * @param {Number} [payload.setDeleteStatus] the function to set delete status
   */
  deleteFishFromLake: (0, _easyPeasy.thunk)(function _callee28(actions, payload, _ref41) {
    var getState, fishId, setDeleteStatus, lakeId;
    return regeneratorRuntime.async(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            getState = _ref41.getState;
            fishId = payload.id, setDeleteStatus = payload.setDeleteStatus;
            lakeId = getState().lakeDetail.id;
            _context28.prev = 3;
            _context28.next = 6;
            return regeneratorRuntime.awrap(_Http["default"]["delete"]("location/lake/fish/delete/".concat(fishId)));

          case 6:
            actions.getLakeDetailByLakeId({
              id: lakeId
            }); // purpose to fetch new fishInLake in lakeDetail

            setDeleteStatus("SUCCESS");
            _context28.next = 13;
            break;

          case 10:
            _context28.prev = 10;
            _context28.t0 = _context28["catch"](3);
            // handle error
            setDeleteStatus("FAILED");

          case 13:
          case "end":
            return _context28.stop();
        }
      }
    }, null, null, [[3, 10]]);
  }),

  /**
   * Restock fish quantity and totalWeight in lake by id
   * @param {Number} [payload.id] id of the fish to stock
   * @param {Object} [payload.quantity] quantiy for stocking
   * @param {Number} [payload.weight] weight for stocking
   * @param {Function} [payload.setUpdateStatus] the function to set status
   */
  stockFishInLake: (0, _easyPeasy.thunk)(function _callee29(actions, payload, _ref42) {
    var getState, id, updateData, setUpdateStatus, lakeId;
    return regeneratorRuntime.async(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            getState = _ref42.getState;
            id = payload.id, updateData = payload.updateData, setUpdateStatus = payload.setUpdateStatus;
            lakeId = getState().lakeDetail.id;
            _context29.prev = 3;
            _context29.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("location/lake/fish/stocking/".concat(id), null, {
              params: _objectSpread({}, updateData)
            }));

          case 6:
            _context29.next = 8;
            return regeneratorRuntime.awrap(actions.getLakeDetailByLakeId({
              id: lakeId
            }));

          case 8:
            // purpose to fetch new fishInLake in lakeDetail
            setUpdateStatus("SUCCESS");
            _context29.next = 14;
            break;

          case 11:
            _context29.prev = 11;
            _context29.t0 = _context29["catch"](3);
            // handle error
            setUpdateStatus("FAILED");

          case 14:
          case "end":
            return _context29.stop();
        }
      }
    }, null, null, [[3, 11]]);
  }),
  // DucHM ADD_END 8/11/2021
  // END OF LAKE FISH MANAGEMENT SECTION
  // START UNRESOLVED CATCH REPORT RELATED SECTION

  /**
   * Set list data of unresolved catch eport
   */
  setUnresolvedCatchReportList: (0, _easyPeasy.action)(function (state, payload) {
    state.unresolvedCatchReportList = payload;
  }),

  /**
   * Set current page for list data of unresolved catch eport
   */
  setUnresolvedCatchReportCurrentPage: (0, _easyPeasy.action)(function (state, payload) {
    state.unresolvedCatchReportCurrentPage = payload;
  }),

  /**
   * Set total page number for list data of unresolved catch eport
   * Total page cannot be less than 1
   */
  setUnresolvedCatchReportTotalPage: (0, _easyPeasy.action)(function (state, payload) {
    state.unresolvedCatchReportTotalPage = payload < 1 ? 1 : payload;
  }),

  /**
   * Remove a catch report from the unresolved catch report list by id
   * @param {Object} [payload] params pass to function
   * @param {number} [payload.id] id of the catch report that need to be remove
   */
  removeAnUnresolvedCatchReportById: (0, _easyPeasy.action)(function (state, payload) {
    state.unresolvedCatchReportList = state.unresolvedCatchReportList.filter(function (report) {
      return report.id !== payload.id;
    });
  }),

  /**
   * Get list data of unresolved catch eport
   * @param {Object} [payload] the payload pass to function
   */
  getUnresolvedCatchReportList: (0, _easyPeasy.thunk)(function _callee30(actions, payload, _ref43) {
    var getState, status, _getState19, currentId, currentPage, totalPage, pageNo, _ref44, data, httpResponseStatus;

    return regeneratorRuntime.async(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            getState = _ref43.getState;
            status = payload.status;
            _getState19 = getState(), currentId = _getState19.currentId, currentPage = _getState19.unresolvedCatchReportCurrentPage, totalPage = _getState19.unresolvedCatchReportTotalPage;
            pageNo = 1; // If this function is called to load more data to list

            if (!(status === "APPEND")) {
              _context30.next = 11;
              break;
            }

            if (!(currentPage > totalPage || currentPage < 1)) {
              _context30.next = 7;
              break;
            }

            return _context30.abrupt("return");

          case 7:
            pageNo = currentPage;
            actions.setUnresolvedCatchReportCurrentPage(currentPage + 1);
            _context30.next = 13;
            break;

          case 11:
            // If this function is called to load data from page 1
            actions.setUnresolvedCatchReportCurrentPage(1);
            actions.setUnresolvedCatchReportTotalPage(1);

          case 13:
            _context30.prev = 13;
            _context30.next = 16;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/").concat(_constants.API_URL.LOCATION_CATCH_REPORT_UNRESOLVED), {
              params: {
                pageNo: pageNo
              }
            }));

          case 16:
            _ref44 = _context30.sent;
            data = _ref44.data;
            httpResponseStatus = _ref44.status;

            if (httpResponseStatus === 200) {
              actions.setUnresolvedCatchReportList(data.items);
              actions.setUnresolvedCatchReportTotalPage(data.totalPage);
            }

            _context30.next = 27;
            break;

          case 22:
            _context30.prev = 22;
            _context30.t0 = _context30["catch"](13);
            actions.setUnresolvedCatchReportList([]);
            actions.setUnresolvedCatchReportTotalPage(1);
            actions.setUnresolvedCatchReportCurrentPage(1);

          case 27:
          case "end":
            return _context30.stop();
        }
      }
    }, null, null, [[13, 22]]);
  }),

  /**
   * Verify a catch report
   * @param {Object} [payload] params pass to function
   * @param {number} [payload.id] id of the catch report
   * @param {boolean} [payload.isApprove] value indicate that approve the catch report or not
   * @param {Function} [payload.setSuccess] function indicate verify catch report success or not
   */
  approveCatchReport: (0, _easyPeasy.thunk)(function _callee31(actions, payload) {
    var id, isApprove, setSuccess, _ref45, status;

    return regeneratorRuntime.async(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            id = payload.id, isApprove = payload.isApprove, setSuccess = payload.setSuccess;
            _context31.prev = 1;
            _context31.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post("".concat(_constants.API_URL.LOCATION_CATCH_REPORT_APPROVE, "/").concat(id), null, {
              params: {
                isApprove: isApprove
              }
            }));

          case 4:
            _ref45 = _context31.sent;
            status = _ref45.status;

            if (!(status === 200)) {
              _context31.next = 10;
              break;
            }

            setSuccess(true);
            _context31.next = 10;
            return regeneratorRuntime.awrap(actions.removeAnUnresolvedCatchReportById({
              id: id
            }));

          case 10:
            _context31.next = 15;
            break;

          case 12:
            _context31.prev = 12;
            _context31.t0 = _context31["catch"](1);
            setSuccess(false);

          case 15:
          case "end":
            return _context31.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }),
  // END UNRESOLVED CATCH REPORT RELATED SECTION
  // LOCATION CATCH REPORT HISTORY
  setCatchReportHistory: (0, _easyPeasy.action)(function (state, payload) {
    state.catchReportHistory = state.catchReportHistory.concat(payload);
  }),
  setCatchHistoryCurrentPage: (0, _easyPeasy.action)(function (state, payload) {
    state.catchHistoryCurrentPage = payload;
  }),
  setCatchHistoryTotalPage: (0, _easyPeasy.action)(function (state, payload) {
    state.catchHistoryTotalPage = payload < 1 ? 1 : payload;
  }),
  rewriteCatchReportHistoryList: (0, _easyPeasy.action)(function (state, payload) {
    state.catchReportHistory = payload;
  }),

  /**
   * Get resolved catch report list data
   * @param {string} startDate start date with format "YYYY-MM-DDT17:00:00.000Z" - hours = 17
   * @param {string} endDate end date with format "YYYY-MM-DDT17:00:00.000Z" - hours = 17
   * @param {string} status APPEND or OVERWRITE - indicate load list from start or load more data
   */
  getCatchReportHistoryOverwrite: (0, _easyPeasy.thunk)(function _callee32(actions, payload, _ref46) {
    var getState, startDate, endDate, status, sDate, eDate, _getState20, catchHistoryCurrentPage, catchHistoryTotalPage, currentId, _ref47, data, totalPage, items, _ref48, _data, _totalPage, _items;

    return regeneratorRuntime.async(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            getState = _ref46.getState;
            startDate = payload.startDate, endDate = payload.endDate, status = payload.status;
            sDate = startDate;
            eDate = endDate; // Convert start date and end date to format "YYYY-MM-DDT00:00:00.000Z"

            if (startDate !== null) {
              sDate = (0, _utilities.convertDateFormat)(startDate);
            }

            if (endDate !== null) {
              eDate = (0, _utilities.convertDateFormat)(endDate);
            }

            _getState20 = getState(), catchHistoryCurrentPage = _getState20.catchHistoryCurrentPage, catchHistoryTotalPage = _getState20.catchHistoryTotalPage, currentId = _getState20.currentId;

            if (!(status === "APPEND")) {
              _context32.next = 20;
              break;
            }

            if (!(catchHistoryCurrentPage <= 0 || catchHistoryCurrentPage > catchHistoryTotalPage)) {
              _context32.next = 10;
              break;
            }

            return _context32.abrupt("return");

          case 10:
            _context32.next = 12;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/").concat(_constants.API_URL.LOCATION_CATCH_REPORT_RESOLVED), {
              params: {
                pageNo: catchHistoryCurrentPage,
                startDate: sDate,
                endDate: eDate
              }
            }));

          case 12:
            _ref47 = _context32.sent;
            data = _ref47.data;
            totalPage = data.totalPage, items = data.items;
            actions.setCatchHistoryCurrentPage(catchHistoryCurrentPage + 1);
            actions.setCatchHistoryTotalPage(totalPage);
            actions.setCatchReportHistory(items);
            _context32.next = 28;
            break;

          case 20:
            _context32.next = 22;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/").concat(_constants.API_URL.LOCATION_CATCH_REPORT_RESOLVED), {
              params: {
                pageNo: 1,
                startDate: sDate,
                endDate: eDate
              }
            }));

          case 22:
            _ref48 = _context32.sent;
            _data = _ref48.data;
            _totalPage = _data.totalPage, _items = _data.items;
            actions.setCatchHistoryCurrentPage(2);
            actions.setCatchHistoryTotalPage(_totalPage);
            actions.rewriteCatchReportHistoryList(_items);

          case 28:
          case "end":
            return _context32.stop();
        }
      }
    });
  }),
  // END LOCATION CATCH REPORT HISTORY
  // START OF CHECKIN RELATED SECTION
  // VERIFY CHECK-IN

  /**
   * Set Angler overview data to display after checkin success
   */
  setAnglerCheckinOverviewInfor: (0, _easyPeasy.action)(function (state, payload) {
    state.anglerCheckinOverviewInfor = payload;
  }),

  /**
   * Checkin an angler to the fishing location
   * @param {Object} [payload] the payload pass to function
   * @param {String} [payload.qrString] qrString unique to the angler
   * @param {Function} [payload.setSuccess] indicate that action is success
   */
  checkInAngler: (0, _easyPeasy.thunk)(function _callee33(actions, payload, _ref49) {
    var getState, qrString, setSuccess, _getState21, currentId, _ref50, status, data;

    return regeneratorRuntime.async(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            getState = _ref49.getState;
            qrString = payload.qrString, setSuccess = payload.setSuccess;
            _getState21 = getState(), currentId = _getState21.currentId;
            _context33.prev = 3;
            _context33.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].post("location/".concat(currentId, "/").concat(_constants.API_URL.CHECKIN), qrString));

          case 6:
            _ref50 = _context33.sent;
            status = _ref50.status;
            data = _ref50.data;

            if (status === 200) {
              setSuccess(true);
              actions.setAnglerCheckinOverviewInfor(data);
            }

            _context33.next = 16;
            break;

          case 12:
            _context33.prev = 12;
            _context33.t0 = _context33["catch"](3);
            setSuccess(false);
            actions.setAnglerCheckinOverviewInfor({});

          case 16:
          case "end":
            return _context33.stop();
        }
      }
    }, null, null, [[3, 12]]);
  }),
  // LOCATION CHECK-IN HISTORY
  setCheckinHistoryList: (0, _easyPeasy.action)(function (state, payload) {
    state.checkinHistoryList = state.checkinHistoryList.concat(payload);
  }),
  rewriteCheckinHistory: (0, _easyPeasy.action)(function (state, payload) {
    state.checkinHistoryList = payload;
  }),
  setCheckinHistoryCurrentPage: (0, _easyPeasy.action)(function (state, payload) {
    state.checkinHistoryCurrentPage = payload;
  }),
  setCheckinHistoryTotalPage: (0, _easyPeasy.action)(function (state, payload) {
    state.checkinHistoryTotalPage = payload;
  }),
  getCheckinHistoryList: (0, _easyPeasy.thunk)(function _callee34(actions, payload, _ref51) {
    var getState, _getState22, checkinHistoryCurrentPage, checkinHistoryTotalPage, currentId, _ref52, data, totalPage, items;

    return regeneratorRuntime.async(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            getState = _ref51.getState;
            _getState22 = getState(), checkinHistoryCurrentPage = _getState22.checkinHistoryCurrentPage, checkinHistoryTotalPage = _getState22.checkinHistoryTotalPage, currentId = _getState22.currentId; // If current page is smaller than 0 or larger than maximum page then return

            if (!(checkinHistoryCurrentPage <= 0 || checkinHistoryCurrentPage > checkinHistoryTotalPage)) {
              _context34.next = 4;
              break;
            }

            return _context34.abrupt("return");

          case 4:
            _context34.next = 6;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/checkin/history"), {
              params: {
                pageNo: checkinHistoryCurrentPage
              }
            }));

          case 6:
            _ref52 = _context34.sent;
            data = _ref52.data;
            totalPage = data.totalPage, items = data.items;
            actions.setCheckinHistoryCurrentPage(checkinHistoryCurrentPage + 1);
            actions.setCheckinHistoryTotalPage(totalPage);
            actions.setCheckinHistoryList(items);

          case 12:
          case "end":
            return _context34.stop();
        }
      }
    });
  }),
  getCheckinHistoryListByDate: (0, _easyPeasy.thunk)(function _callee35(actions, payload, _ref53) {
    var getState, _getState23, checkinHistoryCurrentPage, checkinHistoryTotalPage, currentId, objParams, _ref54, data, totalPage, items;

    return regeneratorRuntime.async(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            getState = _ref53.getState;
            _getState23 = getState(), checkinHistoryCurrentPage = _getState23.checkinHistoryCurrentPage, checkinHistoryTotalPage = _getState23.checkinHistoryTotalPage, currentId = _getState23.currentId; // If current page is smaller than 0 or larger than maximum page then return

            if (!(checkinHistoryCurrentPage <= 0 || checkinHistoryCurrentPage > checkinHistoryTotalPage)) {
              _context35.next = 4;
              break;
            }

            return _context35.abrupt("return");

          case 4:
            objParams = {
              pageNo: checkinHistoryCurrentPage
            };

            if (_typeof(payload) === "object") {
              if ("startDate" in payload) {
                objParams.startDate = payload.startDate.toJSON();
              }

              if ("endDate" in payload) {
                objParams.endDate = payload.endDate.toJSON();
              }
            }

            if (objParams.startDate !== null) objParams.startDate = (0, _utilities.convertDateFormat)(objParams.startDate);
            if (objParams.endDate !== null) objParams.endDate = (0, _utilities.convertDateFormat)(objParams.endDate);
            _context35.next = 10;
            return regeneratorRuntime.awrap(_Http["default"].get("location/".concat(currentId, "/checkin/history"), {
              params: objParams
            }));

          case 10:
            _ref54 = _context35.sent;
            data = _ref54.data;
            totalPage = data.totalPage, items = data.items;
            actions.setCheckinHistoryCurrentPage(checkinHistoryCurrentPage + 1);
            actions.setCheckinHistoryTotalPage(totalPage);
            actions.setCheckinHistoryList(items);

          case 16:
          case "end":
            return _context35.stop();
        }
      }
    });
  }),
  resetCheckinHistory: (0, _easyPeasy.thunk)(function _callee36(actions) {
    return regeneratorRuntime.async(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            actions.setCheckinHistoryCurrentPage(1);
            actions.setCheckinHistoryTotalPage(1);
            actions.rewriteCheckinHistory([]);

          case 3:
          case "end":
            return _context36.stop();
        }
      }
    });
  }),
  // END OF CHECKIN RELATED SECTION
  setCurrentPinPost: (0, _easyPeasy.action)(function (state, payload) {
    state.currentPinPost = payload;
  }),
  getPinPost: (0, _easyPeasy.thunk)(function _callee37(actions, payload, _ref55) {
    var getState, _getState24, currentId, _ref56, status, data;

    return regeneratorRuntime.async(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            getState = _ref55.getState;
            _getState24 = getState(), currentId = _getState24.currentId;
            _context37.prev = 2;
            _context37.next = 5;
            return regeneratorRuntime.awrap(_Http["default"].get("/location/".concat(currentId, "/post/pinned")));

          case 5:
            _ref56 = _context37.sent;
            status = _ref56.status;
            data = _ref56.data;

            if (status === 200) {
              actions.setCurrentPinPost(data);
            }

            _context37.next = 14;
            break;

          case 11:
            _context37.prev = 11;
            _context37.t0 = _context37["catch"](2);
            actions.setCurrentPinPost({});

          case 14:
          case "end":
            return _context37.stop();
        }
      }
    }, null, null, [[2, 11]]);
  }),
  pinFLocationPost: (0, _easyPeasy.thunk)(function _callee38(actions, payload) {
    var postId, setPinSuccess, _ref57, status;

    return regeneratorRuntime.async(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            postId = payload.postId, setPinSuccess = payload.setPinSuccess;
            _context38.prev = 1;
            _context38.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post("/location/post/pin/".concat(postId)));

          case 4:
            _ref57 = _context38.sent;
            status = _ref57.status;

            if (status === 200) {
              setPinSuccess(true);
            }

            _context38.next = 13;
            break;

          case 9:
            _context38.prev = 9;
            _context38.t0 = _context38["catch"](1);
            console.log("status :>> ", _context38.t0);
            setPinSuccess(false);

          case 13:
          case "end":
            return _context38.stop();
        }
      }
    }, null, null, [[1, 9]]);
  })
};
var _default = model;
exports["default"] = _default;