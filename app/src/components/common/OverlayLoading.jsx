import PropTypes from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

const styles = StyleSheet.create({
  coverLoad: { justifyContent: "center", alignItems: "center" },
  transparentLoad: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

const OverlayLoading = ({
  loading,
  spinnerSize,
  spinnerColor,
  containerStyle,
  coverScreen,
}) => {
  return (
    <Overlay
      isVisible={loading}
      fullScreen
      overlayStyle={StyleSheet.compose(
        coverScreen ? styles.coverLoad : styles.transparentLoad,
        containerStyle,
      )}
    >
      <ActivityIndicator size={spinnerSize} color={spinnerColor} />
    </Overlay>
  );
};

OverlayLoading.propTypes = {
  loading: PropTypes.bool,
  coverScreen: PropTypes.bool,
  spinnerSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  spinnerColor: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

OverlayLoading.defaultProps = {
  loading: true,
  coverScreen: false,
  spinnerSize: 60,
  spinnerColor: "#2089DC",
  containerStyle: {},
};

export default OverlayLoading;
