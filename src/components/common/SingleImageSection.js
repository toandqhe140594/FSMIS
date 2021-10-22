import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";

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
    <View style={[styles.container, myStyles]}>
      {image.length > 0 && (
        <View style={styles.imageContainer}>
          <InteractiveImageBox image={image} />
        </View>
      )}
      {!image && <AddImageButton />}
    </View>
  );
};

SingleImageSection.propTypes = {
  myStyles: PropTypes.objectOf(PropTypes.string),
};

SingleImageSection.defaultProps = {
  myStyles: {},
};

export default SingleImageSection;
