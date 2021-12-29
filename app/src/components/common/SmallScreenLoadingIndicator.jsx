import PropType from "prop-types";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import colors from "../../config/colors";

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const SmallScreenLoadingIndicator = ({ containerStyle }) => {
  return (
    <View style={StyleSheet.compose(styles.indicatorContainer, containerStyle)}>
      <ActivityIndicator size="large" color={colors.primary["500"]} />
    </View>
  );
};

SmallScreenLoadingIndicator.propTypes = {
  containerStyle: PropType.objectOf(
    PropType.oneOfType([PropType.string, PropType.number]),
  ),
};

SmallScreenLoadingIndicator.defaultProps = {
  containerStyle: {},
};

export default SmallScreenLoadingIndicator;
