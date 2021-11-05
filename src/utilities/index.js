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
 * Display an alert box with option to cancel and accept
 * @param {String} title title of the alert box
 * @param {String} message message to display
 */
const showAlertBox = (title, message) => {
  Alert.alert(title, message, [
    {
      text: "Xác nhận",
    },
  ]);
};

export { showAlertBox, showAlertConfirmBox, showToastMessage };
