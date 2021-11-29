import { FontAwesome5 } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";

import { showToastMessage } from "../utilities";

const containerSize = 38;
const iconSize = 19;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    width: containerSize,
    height: containerSize,
    position: "absolute",
    right: 13,
    bottom: 17,
    alignItems: "center",
    justifyContent: "center",
    elevation: 999,
  },
  image: {
    width: iconSize,
    height: iconSize,
  },
  secondFromRight: {
    right: 51,
    borderRightWidth: 1,
    borderRightColor: "rgba(200,200,200,0.8)",
  },
});

const secondFromRightContainer = StyleSheet.compose(
  styles.container,
  styles.secondFromRight,
);

const MiniMapView = ({ latitude, longitude }) => {
  const [marginTop, setMarginTop] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setMarginTop(0);
    }, 50);
  }, []);

  const openUrl = (url) => () => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
      else showToastMessage("Không thể mở bản đồ");
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={{ height: 150, width: "100%", marginTop }}
        liteMode
      >
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>

      <TouchableOpacity
        style={secondFromRightContainer}
        onPress={openUrl(
          `http://maps.google.com/maps?daddr=${latitude},${longitude}`,
        )}
      >
        <FontAwesome5 name="directions" size={19} color="rgba(0,0,255,0.8)" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={openUrl(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        )}
      >
        <Image
          source={require("../assets/images/google-maps.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};
MiniMapView.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default MiniMapView;
