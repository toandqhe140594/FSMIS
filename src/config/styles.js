import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  nameTextLg: {
    fontSize: 20,
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  mt1: {
    marginTop: 4,
  },
  mb1: {
    marginBottom: 4,
  },
  ml1: {
    marginLeft: 4,
  },
  p1: {
    padding: 4,
  },
});
