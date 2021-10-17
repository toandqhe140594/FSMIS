import { Box, Flex } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import AddImageButton from "../common/AddImageButton";
import InteractiveImageBox from "../common/InteractiveImageBox";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    width: 350,
    height: 150,
  },
});

// const image = "https://wallpaperaccess.com/full/317501.jpg";
const image = "";

const SingleImageSection = () => {
  return (
    <Flex style={[styles.container]}>
      {image && (
        <Box style={styles.imageContainer}>
          <InteractiveImageBox image={image} />
        </Box>
      )}
      {!image && <AddImageButton />}
    </Flex>
  );
};

export default SingleImageSection;
