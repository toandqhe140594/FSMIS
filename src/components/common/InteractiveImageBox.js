import { Image } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

const InteractiveImageBox = ({ image }) => {
  return (
    <TouchableOpacity>
      <Image
        style={styles.container}
        source={{
          uri: image,
        }}
        alt="Alternate Text"
      />
    </TouchableOpacity>
  );
};

InteractiveImageBox.propTypes = {
  image: PropTypes.string.isRequired,
};

export default InteractiveImageBox;
