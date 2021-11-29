import { Button, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import colors from "../config/colors";
import styles from "../config/styles";
import { showAlertConfirmBox } from "../utilities";
import OverLayLoading from "./common/OverlayLoading";
import HeaderTab from "./HeaderTab";

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
      <OverLayLoading loading={isLoading} />
      {props.children}

      <Button
        style={styles.stickyButtons}
        onPress={onPressHandler}
        isDisabled={isActive === false}
        backgroundColor={
          isActive === false ? colors.defaultSuccess : colors.defaultDanger
        }
      >
        {isActive === false ? (
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