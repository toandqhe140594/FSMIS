import { Entypo } from "@expo/vector-icons";
import { Box, Icon } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 110,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const AddImageButton = ({ isDisabled }) => {
  return (
    <TouchableOpacity disabled={isDisabled}>
      <Box
        style={[
          styles.container,
          { borderColor: isDisabled ? "#a3a3a3" : "#404040" },
        ]}
        mt={1}
        ml={1}
      >
        <Icon
          as={<Entypo name="plus" />}
          size={10}
          mr={1}
          color={isDisabled ? "muted.400" : "muted.700"}
        />
      </Box>
    </TouchableOpacity>
  );
};

AddImageButton.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
};

export default AddImageButton;
