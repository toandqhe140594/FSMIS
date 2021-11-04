import { Alert, ToastAndroid } from "react-native";

const showToastMessage = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

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

export { showAlertConfirmBox, showToastMessage };
