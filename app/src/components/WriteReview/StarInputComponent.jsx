import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";

import colors from "../../config/colors";

const styles = StyleSheet.create({
  error: {
    color: "#f43f5e",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 6,
    alignSelf: "center",
  },
});
const StarInputComponent = ({ label, controllerName, containerStyle }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <View style={containerStyle}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{label}</Text>
      <Controller
        control={control}
        name={controllerName}
        render={({ field: { onChange, value } }) => (
          <Rating
            imageSize={35}
            ratingCount={5}
            showRating={false}
            startingValue={value}
            onFinishRating={onChange}
            tintColor={colors.defaultBackground}
          />
        )}
      />
      {errors.score?.message && (
        <Text style={styles.error}>{errors.score?.message}</Text>
      )}
    </View>
  );
};

StarInputComponent.propTypes = {
  label: PropTypes.string,
  controllerName: PropTypes.string,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

StarInputComponent.defaultProps = {
  label: "",
  controllerName: "",
  containerStyle: {},
};

export default StarInputComponent;
