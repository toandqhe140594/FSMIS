import { Button, Text } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

import HeaderTab from "./HeaderTab";

const styles = StyleSheet.create({
  text: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonStyle: {
    backgroundColor: "#fc454e",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
});
const AdminReport = ({ ...props }) => {
  return (
    <>
      <HeaderTab name="Chi tiết báo cáo" />

      {props.children}

      <Button style={styles.buttonStyle}>
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
