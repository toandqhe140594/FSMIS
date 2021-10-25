import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";

import AddImageButton from "./AddImageButton";
import InteractiveImageBox from "./InteractiveImageBox";

let itemKey = 0;
const generateKey = () => {
  itemKey += 1;
  return itemKey;
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  imageContainer: {
    width: 110,
    height: 110,
    overflow: "hidden",
    marginTop: 4,
    marginLeft: 4,
  },
});

const imageList = [
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
];

const MultiImageSection = ({ imageLimit }) => {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: imageList.length > 0 ? null : "center" },
      ]}
    >
      {imageList.map((image) => {
        return (
          // Test only
          <View style={styles.imageContainer} key={generateKey()}>
            <InteractiveImageBox image={image} />
          </View>
        );
      })}
      <AddImageButton isDisabled={imageList.length === imageLimit} />
    </View>
  );
};

MultiImageSection.propTypes = {
  imageLimit: PropTypes.number.isRequired,
};

export default MultiImageSection;
