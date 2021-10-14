import { Entypo } from "@expo/vector-icons";
import { Box, Icon } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const AddImageButton = () => {
  return (
    <TouchableOpacity>
      <Box color="muted.500" style={styles.container}>
        <Icon as={<Entypo name="plus" />} size={10} mr={1} color="muted.500" />
      </Box>
    </TouchableOpacity>
  );
};

export default AddImageButton;
