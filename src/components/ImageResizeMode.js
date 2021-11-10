import { Pressable } from "native-base";
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
    <Pressable onPress={onResizeHandler}>
      <Card.Image
        source={{ uri: imgUri }}
        style={{ height, width: "auto", resizeMode }}
        key={imgUri}
      />
    </Pressable>
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
