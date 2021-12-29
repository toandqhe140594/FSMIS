import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AssetsSelector } from "expo-images-picker";
import { MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import HeaderWithButton from "../components/HeaderWithButton";
import { DICTIONARY } from "../constants";

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const MEDIA_TYPE = "image";
const FILE_EXTENSION = "jpeg";
let itemKey = 0;
const generateKey = () => {
  itemKey += 1;
  return itemKey;
};

const MediaSelectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  /**
   * Need 2 params:
   * returnRoute specifies where to send data back
   * and maxSelectable specifies how much image can be selected
   */
  const { returnRoute, maxSelectable } = route.params;
  // onSuccess is an async process
  const onSuccess = async (data) => {
    const base64Array = await data.map((obj) => ({
      id: generateKey(),
      base64: `data:${MEDIA_TYPE}/${FILE_EXTENSION};base64,${obj.base64}`,
    }));
    // Return back to where the MediaSelectScreen called
    navigation.navigate(returnRoute, { base64Array });
  };

  // Manage error message of <AssestSelector />
  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: DICTIONARY.MEDIA_SELECT_PERMISSION_DENIED,
        hasErrorWithLoading: DICTIONARY.MEDIA_SELECT_ERROR_LOADING_IMG,
        hasErrorWithResizing: DICTIONARY.MEDIA_SELECT_ERROR_RESIZE_IMG,
        hasNoAssets: DICTIONARY.MEDIA_SELECT_IMAGE_EMPTY,
      },
    }),
    [],
  );

  // Manage setting of <AssestSelector />
  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false, // true might perform slower results
      initialLoad: 100, // number of images load on screen
      assetsType: [MediaType.photo, MediaType.video],
      minSelection: maxSelectable, // min images can be select at a time
      maxSelection: maxSelectable, // max images receive after the selection
      portraitCols: 4,
      landscapeCols: 4,
    }),
    [],
  );

  // Manage image style
  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "tomato",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "#0eb14970",
        size: 26,
      },
    }),
    [],
  );

  // Manage selected image result
  const widgetResize = useMemo(
    () => ({
      width: 750,
      compress: 1,
      base64: true,
      saveTo: FILE_EXTENSION,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Resize={widgetResize}
        CustomNavigator={{
          Component: HeaderWithButton,
          props: {
            name: "Thư viện",
            buttonName: "Chọn ảnh",
            onSuccess: (data) => onSuccess(data), // mandatory props must available inside custom header
          },
        }}
      />
    </View>
  );
};

export default MediaSelectScreen;
