import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

import styles from "../config/styles";
import { DEFAULT_TIMEOUT, ROUTE_NAMES } from "../constants";
import { goToFManageSelectScreen, goToOTPScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";
import OverlayLoading from "./common/OverlayLoading";

const CloseFLocationComponent = ({ name, phone }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const closeFishingLocation = useStoreActions(
    (actions) => actions.FManageModel.closeFishingLocation,
  );
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [otpSendSuccess, setOtpSendSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendOtpAction = () => {
    setLoading(true);
    setTimeout(() => {
      sendOtp({ phone, setSuccess: setOtpSendSuccess });
    }, DEFAULT_TIMEOUT);
  };

  const closeConfirmationAction = () => {
    showAlertConfirmBox(
      "Bạn muốn xóa khu hồ này?",
      `"${name}" sẽ bị xóa. Bạn không thể hoàn tác hành động này\nBạn cần xóa hết nhân viên khỏi hồ để đóng`,
      sendOtpAction,
    );
  };

  const closeLocation = () => {
    setLoading(true);
    closeFishingLocation({ setDeleteSuccess });
  };

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.otpSuccess === true) {
        closeLocation();
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (otpSendSuccess) {
      goToOTPScreen(navigation, ROUTE_NAMES.FMANAGE_MAIN, phone);
    }
    setLoading(false);
    setOtpSendSuccess(null);
  }, [otpSendSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      showToastMessage("Đóng cửa khu hồ thành công");
      goToFManageSelectScreen(navigation);
    } else {
      setLoading(false);
      setDeleteSuccess(false);
    }
  }, [deleteSuccess]);

  return (
    <>
      <OverlayLoading loading={loading} />
      <View style={styles.menuScreenListItemView}>
        <ListItem onPress={closeConfirmationAction}>
          <Icon name="delete" size={26} type="antdesign" color="red" />
          <ListItem.Content style={{ height: 40 }}>
            <ListItem.Title style={{ color: "red" }}>Xóa khu hồ</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </View>
    </>
  );
};
CloseFLocationComponent.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default CloseFLocationComponent;
