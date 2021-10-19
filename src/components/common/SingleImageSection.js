import { Box, Flex } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";

import AddImageButton from "./AddImageButton";
import InteractiveImageBox from "./InteractiveImageBox";

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

const SingleImageSection = ({ myStyles }) => {
  return (
    <Flex style={[styles.container, myStyles]}>
      {image && (
        <Box style={styles.imageContainer}>
          <InteractiveImageBox image={image} />
        </Box>
      )}
      {!image && <AddImageButton />}
    </Flex>
  );
};

SingleImageSection.propTypes = {
  myStyles: PropTypes.objectOf(PropTypes.string.isRequired),
};

SingleImageSection.defaultProps = {
  myStyles: {},
};

export default SingleImageSection;
