import { useStoreActions } from "easy-peasy";
import { Button, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { View } from "react-native";

import colors from "../config/colors";
import styles from "../config/styles";
import { showAlertConfirmBox } from "../utilities";
import OverLayLoading from "./common/OverlayLoading";
import SmallScreenLoadingIndicator from "./common/SmallScreenLoadingIndicator";
import HeaderTab from "./HeaderTab";

const AdminReport = ({
  isLoading,
  isActive,
  eventPress,
  screenLoading,
  ...props
}) => {
  const onPressHandler = () => {
    showAlertConfirmBox(
      "Xác nhận xử lý báo cáo.",
      "Đánh dấu báo cáo đã được xử lý.",
      eventPress,
    );
  };

  const resetReportDetail = useStoreActions(
    (actions) => actions.ReportModel.resetReportDetail,
  );

  useEffect(() => {
    return () => {
      resetReportDetail();
    };
  }, []);

  if (screenLoading)
    return (
      <View style={{ flex: 1 }}>
        <HeaderTab name="Chi tiết báo cáo" />
        <SmallScreenLoadingIndicator />
      </View>
    );

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
          <Text color="white">Đánh dấu đã xử lý </Text>
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
  screenLoading: PropTypes.bool,
};

AdminReport.defaultProps = {
  children: null,
  eventPress: () => {},
  isActive: true,
  isLoading: false,
  screenLoading: false,
};
export default AdminReport;
