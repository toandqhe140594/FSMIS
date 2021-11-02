import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";

import { goToMediaSelectScreen } from "../../navigations";

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 2,
  },
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
});

const MultiImageSection = ({
  containerStyle,
  imageArray,
  selectLimit,
  deleteImage,
  formRoute,
}) => {
  const navigation = useNavigation();
  /**
   * Displays an pop-up before delete an image
   * @param {number} id: id of the image
   */
  const handleDelete = (id) => {
    Alert.alert(
      "Thông báo",
      "Bạn chắc chắn muốn xóa ảnh này?",
      [
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            deleteImage(id);
            navigation.setParams({ base64Array: [] });
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <View
      style={[
        styles.container,
        { justifyContent: imageArray.length > 0 ? null : "center" },
      ]}
    >
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
  );
};

MultiImageSection.propTypes = {
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  imageArray: PropTypes.arrayOf(PropTypes.object),
  selectLimit: PropTypes.number,
  deleteImage: PropTypes.func,
  formRoute: PropTypes.string,
};

MultiImageSection.defaultProps = {
  containerStyle: {},
  imageArray: [],
  selectLimit: 1,
  deleteImage: () => {},
  formRoute: "",
};

export default MultiImageSection;
