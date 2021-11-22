import { Button, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import colors from "../config/colors";
import styles from "../config/styles";
import { showAlertConfirmBox } from "../utilities";
import HeaderTab from "./HeaderTab";
import OverLayLoading from "./OverLayLoading";

const AdminReport = ({ isLoading, isActive, eventPress, ...props }) => {
  const onPressHandler = () => {
    showAlertConfirmBox(
      "Xác nhận xử lý báo cáo.",
      "Đánh dấu báo cáo đã được xử lý.",
      eventPress,
    );
  };
  return (
    <>
      <HeaderTab name="Chi tiết báo cáo" />
      <OverLayLoading isLoading={isLoading} />
      {props.children}

      <Button
        style={styles.stickyButtons}
        onPress={onPressHandler}
        isDisabled={!isActive}
        backgroundColor={
          !isActive ? colors.defaultSuccess : colors.defaultDanger
        }
      >
        {!isActive ? (
          <Text color="white">Đã xử lý </Text>
        ) : (
          <Text color="white">Đánh dấu xử lý </Text>
        )}
      </Button>
    </>
  );
};
AdminReport.propTypes = {
  children: PropTypes.element,
  eventPress: PropTypes.func,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
};

AdminReport.defaultProps = {
  children: null,
  eventPress: () => {},
  isActive: true,
  isLoading: false,
};
export default AdminReport;
