import PropTypes from "prop-types";
import React, { useState } from "react";
import { Card } from "react-native-elements";

const ImageResizeMode = ({ imgUri, height }) => {
  const [resizeMode, setResizeMode] = useState("cover");
  const onResizeHandler = () => {
    if (resizeMode === "cover") {
      setResizeMode("contain");
    } else {
      setResizeMode("cover");
    }
  };
  return (
    <Card.Image
      source={{ uri: imgUri }}
      onPress={onResizeHandler}
      style={{ height, width: "auto", resizeMode }}
    />
  );
};
ImageResizeMode.propTypes = {
  imgUri: PropTypes.string,
  height: PropTypes.number,
};
ImageResizeMode.defaultProps = {
  imgUri: "https://picsum.photos/100",
  height: 400,
};
export default ImageResizeMode;
