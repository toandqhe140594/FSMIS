import { Box } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: { borderColor: "black", borderWidth: 1 },
});

const MapOverviewBox = () => {
  return (
    <TouchableOpacity>
      <Box h={20} style={styles.container} />
    </TouchableOpacity>
  );
};

export default MapOverviewBox;
