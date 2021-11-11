"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyPeasy = require("easy-peasy");

var _constants = require("../constants");

var _Http = _interopRequireDefault(require("../utilities/Http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var listLocationReport = [{
  id: "1",
  reportTarget: "Hồ Câu Thuần Việt",
  isProcessed: true
}, {
  id: "2",
  reportTarget: "Hồ Câu Thuần Việt",
  isProcessed: true
}, {
  id: "3",
  reportTarget: "Hồ Câu Thuần Việt",
  isProcessed: false
}, {
  id: "4",
  reportTarget: "Hồ Câu Thuần Việt",
  isProcessed: true
}, {
  id: "5",
  reportTarget: "Hồ Câu Thuần Việt",
  isProcessed: false
}];
var listPostReport = [{
  id: "1",
  userName: "Hồ câu Thuần Việt",
  postType: "Báo cá",
  isProcessed: true
}, {
  id: "2",
  userName: "Hồ câu Thuần Việt",
  postType: "Thông báo",
  isProcessed: true
}, {
  id: "3",
  userName: "Hồ câu Thuần Việt",
  postType: "Bồi cá",
  isProcessed: false
}, {
  id: "4",
  userName: "Hồ câu Thuần Việt",
  postType: "Báo cá",
  isProcessed: true
}, {
  id: "5",
  userName: "Hồ câu Thuần Việt",
  postType: "Báo cá",
  isProcessed: false
}];
var listReviewReport = [{
  id: "1",
  reportTarget: "Nguyễn Văn A",
  isProcessed: true
}, {
  id: "2",
  reportTarget: "Nguyễn Văn A",
  isProcessed: true
}, {
  id: "3",
  reportTarget: "Nguyễn Văn A",
  isProcessed: false
}, {
  id: "4",
  reportTarget: "Nguyễn Văn A",
  isProcessed: true
}, {
  id: "5",
  reportTarget: "Nguyễn Văn A",
  isProcessed: false
}];
var model = {
  listLocationReport: [].concat(listLocationReport),
  listPostReport: [].concat(listPostReport),
  listReviewReport: [].concat(listReviewReport),
  setListReportLocation: (0, _easyPeasy.action)(function (state, payload) {
    state.listReportLocation = payload;
  }),
  getListReportLocation: (0, _easyPeasy.thunk)(function _callee(actions) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actions.setListReportLocation(_objectSpread({}, listLocationReport));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  })
};
var _default = model;
exports["default"] = _default;