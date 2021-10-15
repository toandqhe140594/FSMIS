import { Box, Image } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    overflow: "hidden",
  },
});

const InteractiveImageBox = ({ image }) => {
  return (
    <TouchableOpacity>
      <Box style={styles.container} mt={1} ml={1}>
        <Image
          source={{
            uri: image,
          }}
          alt="Alternate Text"
          size="xl"
        />
      </Box>
    </TouchableOpacity>
  );
};

InteractiveImageBox.propTypes = {
  image: PropTypes.string.isRequired,
};

export default InteractiveImageBox;
