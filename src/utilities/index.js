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
 */
const showAlertConfirmBox = (title, message, onSuccess) => {
  Alert.alert(title, message, [
    {
      text: "Quay lại",
      style: "cancel",
    },
    {
      text: "Xác nhận",
      onPress: () => {
        onSuccess();
      },
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
        onPress: () => {
          onSuccess();
        },
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

export {
  convertDateFormat,
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
  showToastMessage,
};
