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

const SmallScreenLoadingIndicator = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size="large" color={colors.primary["500"]} />
    </View>
  );
};

export default SmallScreenLoadingIndicator;
