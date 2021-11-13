"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyPeasy = require("easy-peasy");

var _constants = require("../constants");

var _Http = _interopRequireDefault(require("../utilities/Http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var model = {
  listLocationReport: [],
  listPostReport: [],
  listReviewReport: [],
  listCatchReport: [],
  totalLocationReportPage: 0,
  totalPostReportPage: 0,
  totalReviewReportPage: 0,
  totalCatchReportPage: 0,

  /**
   * Append new location report list to current list
   * @param {String} [payload.type] type of the report
   * @param {Array} [payload.items] new array to append to current list
   */
  setReportList: (0, _easyPeasy.action)(function (state, payload) {
    var _state$listLocationRe, _state$listPostReport, _state$listReviewRepo, _state$listCatchRepor;

    var type = payload.type,
        items = payload.items;

    switch (type) {
      case "LOCATION":
        (_state$listLocationRe = state.listLocationReport).push.apply(_state$listLocationRe, _toConsumableArray(items));

        break;

      case "POST":
        (_state$listPostReport = state.listPostReport).push.apply(_state$listPostReport, _toConsumableArray(items));

        break;

      case "REVIEW":
        (_state$listReviewRepo = state.listReviewReport).push.apply(_state$listReviewRepo, _toConsumableArray(items));

        break;

      case "CATCH":
        (_state$listCatchRepor = state.listCatchReport).push.apply(_state$listCatchRepor, _toConsumableArray(items));

        break;

      default:
    }
  }),

  /**
   * Reset list of of a report type
   * @param {String} [payload.type] type of the report
   */
  resetReportList: (0, _easyPeasy.action)(function (state, payload) {
    switch (payload.type) {
      case "LOCATION":
        state.listLocationReport = [];
        break;

      case "POST":
        state.listPostReport = [];
        break;

      case "REVIEW":
        state.listReviewReport = [];
        break;

      case "CATCH":
        state.listCatchReport = [];
        break;

      default:
    }
  }),

  /**
   * Set total page of each report list
   * @param {String} [payload.type] type of the report
   * @param {Number} [payload.totalPage] total page of list report
   */
  setTotalReportPage: (0, _easyPeasy.action)(function (state, payload) {
    var type = payload.type,
        totalPage = payload.totalPage;

    switch (type) {
      case "LOCATION":
        state.totalLocationReportPage = totalPage;
        break;

      case "REVIEW":
        state.totalReviewReportPage = totalPage;
        break;

      case "POST":
        state.totalPostReportPage = totalPage;
        break;

      case "CATCH":
        state.totalCatchReportPage = totalPage;
        break;

      default:
    }
  }),

  /**
   * Get location report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListLocationReportLocation: (0, _easyPeasy.thunk)(function _callee(actions, payload) {
    var pageNo, setIsLoading, _ref, data, totalPage, items;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pageNo = payload.pageNo, setIsLoading = payload.setIsLoading;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].get(_constants.API_URL.ADMIN_REPORT_LOCATION_LIST, {
              params: {
                pageNo: pageNo
              }
            }));

          case 4:
            _ref = _context.sent;
            data = _ref.data;
            totalPage = data.totalPage, items = data.items;
            actions.setTotalReportPage({
              type: "LOCATION",
              totalPage: totalPage
            });
            actions.setReportList({
              type: "LOCATION",
              items: items
            }); // }

            setIsLoading(false);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            // handle error
            setIsLoading(false);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }),

  /**
   * Get catch report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListReportCatch: (0, _easyPeasy.thunk)(function _callee2(actions, payload) {
    var pageNo, setIsLoading, _ref2, data, totalPage, items;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pageNo = payload.pageNo, setIsLoading = payload.setIsLoading;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].get(_constants.API_URL.ADMIN_REPORT_CATCH_LIST, {
              params: {
                pageNo: pageNo
              }
            }));

          case 4:
            _ref2 = _context2.sent;
            data = _ref2.data;
            totalPage = data.totalPage, items = data.items;
            actions.setTotalReportPage({
              type: "CATCH",
              totalPage: totalPage
            });
            actions.setReportList({
              type: "CATCH",
              items: items
            });
            setIsLoading(false);
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            // handle error
            setIsLoading(false);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }),

  /**
   * Get post report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListPostReport: (0, _easyPeasy.thunk)(function _callee3(actions, payload) {
    var pageNo, setIsLoading, _ref3, data, totalPage, items;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            pageNo = payload.pageNo, setIsLoading = payload.setIsLoading;
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].get(_constants.API_URL.ADMIN_REPORT_POST_LIST, {
              params: {
                pageNo: pageNo
              }
            }));

          case 4:
            _ref3 = _context3.sent;
            data = _ref3.data;
            totalPage = data.totalPage, items = data.items;
            actions.setTotalReportPage({
              type: "POST",
              totalPage: totalPage
            });
            actions.setReportList({
              type: "POST",
              items: items
            });
            setIsLoading(false);
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            // handle error
            setIsLoading(false);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }),

  /**
   * Get review report list by page number
   * @param {Number} [payload.pageCurrent] current page number
   * @param {Function} [payload.setIsLoading] function to set loading state
   */
  getListReviewReport: (0, _easyPeasy.thunk)(function _callee4(actions, payload) {
    var pageNo, setIsLoading, _ref4, data, totalPage, items;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            pageNo = payload.pageNo, setIsLoading = payload.setIsLoading;
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].get(_constants.API_URL.ADMIN_REPORT_REVIEW_LIST, {
              params: {
                pageNo: pageNo
              }
            }));

          case 4:
            _ref4 = _context4.sent;
            data = _ref4.data;
            totalPage = data.totalPage, items = data.items;
            actions.setTotalReportPage({
              type: "REVIEW",
              totalPage: totalPage
            });
            actions.setReportList({
              type: "REVIEW",
              items: items
            });
            setIsLoading(false);
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            setIsLoading(false); // handle error

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }),
  // SEND REPORT
  sendLocationReport: (0, _easyPeasy.thunk)(function _callee5(actions, payload) {
    var locationId, reportDtoIn, setSendStatus, _ref5, status;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            locationId = payload.locationId, reportDtoIn = payload.reportDtoIn, setSendStatus = payload.setSendStatus;
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post("location/report/".concat(locationId), reportDtoIn));

          case 4:
            _ref5 = _context5.sent;
            status = _ref5.status;

            if (status === 200) {
              setSendStatus(true);
            }

            _context5.next = 13;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](1);
            console.log("status :>> ", _context5.t0);
            setSendStatus(false);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }),
  sendPostReport: (0, _easyPeasy.thunk)(function _callee6(actions, payload) {
    var postId, reportDtoIn, setSendStatus, _ref6, status;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            postId = payload.postId, reportDtoIn = payload.reportDtoIn, setSendStatus = payload.setSendStatus;
            _context6.prev = 1;
            _context6.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post("/location/post/report/".concat(postId), reportDtoIn));

          case 4:
            _ref6 = _context6.sent;
            status = _ref6.status;

            if (status === 200) {
              console.log("status", status);
              setSendStatus(true);
            }

            _context6.next = 13;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](1);
            console.log("status :>> ", _context6.t0);
            setSendStatus(false);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }),
  sendReviewReport: (0, _easyPeasy.thunk)(function _callee7(actions, payload) {
    var reviewId, reportDtoIn, setSendStatus, _ref7, status;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            reviewId = payload.reviewId, reportDtoIn = payload.reportDtoIn, setSendStatus = payload.setSendStatus;
            _context7.prev = 1;
            _context7.next = 4;
            return regeneratorRuntime.awrap(_Http["default"].post("/location/review/report/".concat(reviewId), reportDtoIn));

          case 4:
            _ref7 = _context7.sent;
            status = _ref7.status;

            if (status === 200) {
              console.log("status", status);
              setSendStatus(true);
            }

            _context7.next = 13;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](1);
            console.log("status :>> ", _context7.t0);
            setSendStatus(false);

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }),
  sendCatchReport: (0, _easyPeasy.thunk)(function _callee8(actions, payload) {
    var catchId, reportDtoIn, setSendStatus;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            catchId = payload.catchId, reportDtoIn = payload.reportDtoIn, setSendStatus = payload.setSendStatus; // try {
            //   const { status } = await http.post(
            //     `/location/review/report/${catchId}`,
            //     reportDtoIn,
            //   );
            //   if (status === 200) {
            //     console.log(`status`, status);
            //   }
            // } catch (error) {
            //   console.log("status :>> ", error);
            // }

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
  })
};
var _default = model;
exports["default"] = _default;