import { Button, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";

import styles from "../config/styles";
import HeaderTab from "./HeaderTab";

const AdminReport = ({ ...props }) => {
  return (
    <>
      <HeaderTab name="Chi tiết báo cáo" />

      {props.children}

      <Button style={styles.stickyButtons}>
        <Text color="white">Đánh dấu đã xử lý </Text>
      </Button>
    </>
  );
};
AdminReport.propTypes = {
  children: PropTypes.element,
};

AdminReport.defaultProps = {
  children: null,
};
export default AdminReport;
