import { Box, Flex } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

import AddImageButton from "./AddImageButton";
import InteractiveImageBox from "./InteractiveImageBox";

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  imageContainer: {
    width: 110,
    height: 110,
    overflow: "hidden",
  },
});

const imageList = [
  // "https://wallpaperaccess.com/full/317501.jpg",
  // "https://wallpaperaccess.com/full/317501.jpg",
  // "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
];

const MultiImageSection = ({ imageLimit }) => {
  return (
    <Flex
      style={[
        styles.container,
        { justifyContent: imageList.length > 0 ? null : "center" },
      ]}
    >
      {imageList.map((image) => {
        return (
          <Box style={styles.imageContainer} mt={1} ml={1}>
            <InteractiveImageBox image={image} />
          </Box>
        );
      })}
      <AddImageButton isDisabled={imageList.length === imageLimit} />
    </Flex>
  );
};

MultiImageSection.propTypes = {
  imageLimit: PropTypes.number.isRequired,
};

export default MultiImageSection;
