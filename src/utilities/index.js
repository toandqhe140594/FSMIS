import moment from "moment";
import { Alert, ToastAndroid } from "react-native";

/**
 * Display a toast with gravity and offset at bottom of screen
 * @param {String} message message to display in toast
 */
const showToastMessage = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    50,
  );
};

/**
 * Display an alert box with option to cancel and accept
 * @param {String} title title of the alert box
 * @param {String} message message to display
 * @param {Function} onSuccess function when click ok button
 * @param {String} [successButtonTitle] label for success button
 * @param {String} [cancelButtonTitle] label for cancel button
 */
const showAlertConfirmBox = (
  title,
  message,
  onSuccess,
  successButtonTitle = "Xác nhận",
  cancelButtonTitle = "Hủy",
) => {
  Alert.alert(title, message, [
    {
      text: cancelButtonTitle,
      style: "cancel",
    },
    {
      text: successButtonTitle,
      onPress: onSuccess,
    },
  ]);
};

/**
 * Display an alert box with button to close
 * @param {String} title title of the alert box
 * @param {String} message message to display
 * @param {String} buttonTitle button's title
 * @param {boolean} cancelable if alertbox can be close by click outside
 */
const showAlertBox = (
  title,
  message,
  buttonTitle = "Xác nhận",
  cancelable = true,
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: buttonTitle,
      },
    ],
    {
      cancelable,
    },
  );
};

/**
 * Show an alert box that cannot be cancel
 * @param {String} title title of the alert box
 * @param {String} message message to display
 * @param {Function} onSuccess function fire when press ok
 * @param {String} buttonTitle title for the accept button
 */
const showAlertAbsoluteBox = (
  title,
  message,
  onSuccess = () => {},
  buttonTitle = "Xác nhận",
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: buttonTitle,
        onPress: onSuccess,
      },
    ],
    {
      cancelable: false,
    },
  );
};

/**
 * Convert date to format 00:00:00
 * @param {string} date date with format "YYYY-MM-DDT17:00:00.000Z" - hours = 17
 * @returns date with format "YYYY-MM-DDT00:00:00.000Z" - hours = 0
 */
const convertDateFormat = (date) => {
  return `${moment(date).utcOffset(-300).format("YYYY-MM-DDTHH:mm:ss.000")}Z`;
};

/**
 * Convert date to format DD/MM/YYYY
 * @param {string} date date with format "YYYY-MM-DDT17:00:00.000Z" - hours = 17
 * @returns date with format "DD/MM/YYYY" - hours = 0
 */
const convertDateDisplayFormat = (date) => {
  return `${moment(date).utcOffset(-300).format("DD/MM/YYYY")}`;
};

/**
 * Return formatted current date
 * @returns current date in "DD/MM/YYYY HH:mm:ss" format
 */
const getPostTimeStamp = () => {
  const currentdate = new Date();
  const datetime = `${`0${currentdate.getDate()}`.slice(-2)}/${`0${
    currentdate.getMonth() + 1
  }`.slice(
    -2,
  )}/${currentdate.getFullYear()} ${`0${currentdate.getHours()}`.slice(
    -2,
  )}:${`0${currentdate.getMinutes()}`.slice(
    -2,
  )}:${`0${currentdate.getSeconds()}`.slice(-2)}`;
  return datetime;
};

export {
  convertDateDisplayFormat,
  convertDateFormat,
  getPostTimeStamp,
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
  showToastMessage,
};
