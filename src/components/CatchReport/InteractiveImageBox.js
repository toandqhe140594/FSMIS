import { Box, Image } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    overflow: "hidden",
  },
});

const InteractiveImageBox = () => {
  return (
    <TouchableOpacity>
      <Box style={styles.container}>
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg",
          }}
          alt="Alternate Text"
          size="xl"
        />
      </Box>
    </TouchableOpacity>
  );
};

export default InteractiveImageBox;
