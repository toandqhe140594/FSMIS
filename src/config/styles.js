import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  mdText: {
    fontSize: 16,
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
  mt2: {
    marginTop: 8,
  },
  mt3: {
    marginTop: 12,
  },
  mb1: {
    marginBottom: 4,
  },
  mb2: {
    marginBottom: 8,
  },
  mb3: {
    marginBottom: 12,
  },
  ml1: {
    marginLeft: 4,
  },
  ml2: {
    marginLeft: 8,
  },
  ml3: {
    marginLeft: 12,
  },
  p1: {
    padding: 4,
  },
  textContentType: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  stickyButtons: {
    backgroundColor: "#fc454e",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  textBoldButton: { fontSize: 16, fontWeight: "bold", color: "white" },
  textwhite: {
    color: "white",
  },
  menuScreenListItemView: {
    marginBottom: 6,
  },
  menuScreenListItemText: {
    textAlign: "left",
    padding: 2,
    fontSize: 19,
    marginBottom: 3,
    marginTop: 5,
    marginLeft: 11,
  },
  wfull: {
    width: "100%",
  },
  searchBar: {
    width: "100%",
    marginTop: 12,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  flexBox: {
    flex: 1,
  },
  centerBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});
