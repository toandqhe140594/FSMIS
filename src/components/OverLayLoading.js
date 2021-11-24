import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

const OverlayLoading = ({ isLoading }) => {
  return (
    <Overlay
      isVisible={isLoading}
      fullScreen
      overlayStyle={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <ActivityIndicator size={60} color="#2089DC" />
    </Overlay>
  );
};

OverlayLoading.propTypes = {
  isLoading: PropTypes.bool,
};

OverlayLoading.defaultProps = {
  isLoading: false,
};
export default OverlayLoading;
