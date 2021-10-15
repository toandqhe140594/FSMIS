import { Flex } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import AddImageButton from "./AddImageButton";
import InteractiveImageBox from "./InteractiveImageBox";

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

const imageList = [
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
  "https://wallpaperaccess.com/full/317501.jpg",
];

const AddImageSection = () => {
  return (
    <Flex
      style={[
        styles.container,
        { justifyContent: imageList.length ? null : "center" },
      ]}
    >
      {imageList.map((image) => {
        return <InteractiveImageBox image={image} />;
      })}
      <AddImageButton isDisabled={imageList.length === 5} />
    </Flex>
  );
};

export default AddImageSection;
