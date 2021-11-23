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
  multipleImagesWrapper: {
    width: 110,
    height: 110,
    marginTop: 4,
    marginLeft: 4,
    borderRadius: 2,
    borderWidth: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  border: {
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
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
  const sectionWrapper = useMemo(() => {
    return {
      flexWrap: "wrap",
      flexDirection: "row",
      marginTop: 2,
      justifyContent: imageArray.length > 0 ? "flex-start" : "center",
    };
  }, [imageArray]);
  const deleteImage = (id) => {
    const newImageArray = imageArray.filter((image) => image.id !== id);
    setValue(controllerName, newImageArray);
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
            <View
              // If there is only one image, make it takes up hold space
              style={
                selectLimit === 1
                  ? { ...containerStyle, height: 210 }
                  : styles.multipleImagesWrapper
              }
              key={image.id}
            >
              <Image
                style={styles.image}
                source={{ uri: image.base64 }}
                alt="Alternate Text"
                onLongPress={() => handleDelete(image.id)}
                key={image.id}
              />
            </View>
          );
        })}
        {imageArray.length !== selectLimit && (
          <Pressable
            onPress={() =>
              goToMediaSelectScreen(navigation, {
                returnRoute: formRoute,
                maxSelectable: selectLimit,
              })
            }
          >
            <View style={[styles.multipleImagesWrapper, styles.border]}>
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
