import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AssetsSelector } from "expo-images-picker";
import { MediaType } from "expo-media-library";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import HeaderWithButton from "../components/HeaderWithButton";
// import { ROUTE_NAMES } from "../constants";
import { goToCatchReportFormScreen } from "../navigations";

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

  // onSuccess is an async process
  const onSuccess = async (data) => {
    const base64Array = await data.map((obj) => ({
      id: generateKey(),
      base64: `data:${MEDIA_TYPE}/${FILE_EXTENSION};base64,${obj.base64}`,
    }));
    goToCatchReportFormScreen(navigation, { base64Array });
  };

  // Manage error message of <AssestSelector />
  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "black",
      errorMessages: {
        hasErrorWithPermissions: "Please Allow media gallery permissions.",
        hasErrorWithLoading: "There was error while loading images.",
        hasErrorWithResizing: "There was error while loading images.",
        hasNoAssets: "No images found.",
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
      minSelection: 1,
      maxSelection: 5, // max image can be select at a time
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

  // Manage selected iamge result
  const widgetResize = useMemo(
    () => ({
      compress: 1.0,
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
