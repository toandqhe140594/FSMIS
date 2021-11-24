import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";

import { goToMediaSelectScreen } from "../../navigations";
import { showAlertConfirmBox } from "../../utilities";

const styles = StyleSheet.create({
  boxWrapper: {
    width: 110,
    height: 110,
    marginTop: 4,
    marginLeft: 4,
  },
  plusButton: {
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    borderWidth: 1,
  },
  error: {
    fontSize: 12,
    color: "#f43f5e",
    fontStyle: "italic",
    marginTop: 4,
    alignSelf: "center",
  },
});

const MultiImageSection = ({
  containerStyle,
  selectLimit,
  formRoute,
  controllerName,
}) => {
  const navigation = useNavigation();
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const imageArray = useWatch({
    control,
    name: controllerName,
  });
  /**
   * Style entire image section
   */
  const sectionWrapper = useMemo(() => {
    return {
      justifyContent: imageArray.length > 0 ? "flex-start" : "center",
      flexWrap: "wrap",
      flexDirection: "row",
      marginTop: 2,
    };
  }, [imageArray]);
  /**
   * Style only the image array
   */
  const imagesWrapper = useMemo(
    () =>
      selectLimit === 1
        ? StyleSheet.compose({ height: 210 }, containerStyle)
        : styles.boxWrapper,
    [selectLimit],
  );
  /**
   * Style each image
   */
  const imageStyle = useMemo(
    () => ({
      resizeMode: selectLimit === 1 ? "contain" : "cover",
      width: "100%",
      height: "100%",
    }),
    [selectLimit],
  );
  /**
   * Delete image from array
   * @param {Number} id id of the image to delete
   */
  const deleteImage = (id) => {
    const newImageArray = imageArray.filter((image) => image.id !== id);
    setValue(controllerName, newImageArray);
  };

  /**
   * Navigate to media selection screen
   */
  const handleNavigation = () => {
    goToMediaSelectScreen(navigation, {
      returnRoute: formRoute,
      maxSelectable: selectLimit,
    });
  };

  /**
   * Displays an pop-up before delete an image
   * @param {Number} id: id of the image
   */
  const handleDelete = (id) => {
    showAlertConfirmBox("Thông báo", "Bạn chắc chắn muốn xóa ảnh này?", () =>
      deleteImage(id),
    );
  };
  return (
    <>
      <View style={sectionWrapper}>
        {imageArray.map((image) => {
          return (
            <View key={image.id} style={imagesWrapper}>
              <Image
                style={imageStyle}
                source={{ uri: image.base64 }}
                alt="Alternate Text"
                onLongPress={() => handleDelete(image.id)}
                key={image.id}
              />
            </View>
          );
        })}
        {imageArray.length !== selectLimit && (
          <Pressable onPress={handleNavigation}>
            <View
              style={StyleSheet.compose(styles.boxWrapper, styles.plusButton)}
            >
              <Icon as={<Entypo name="plus" />} size={10} mr={1} />
            </View>
          </Pressable>
        )}
      </View>
      {errors[controllerName]?.message && (
        <Text style={styles.error}>{errors[controllerName]?.message}</Text>
      )}
    </>
  );
};

MultiImageSection.propTypes = {
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  selectLimit: PropTypes.number,
  formRoute: PropTypes.string,
  controllerName: PropTypes.string,
};

MultiImageSection.defaultProps = {
  containerStyle: {},
  selectLimit: 1,
  formRoute: "",
  controllerName: "",
};

export default MultiImageSection;
