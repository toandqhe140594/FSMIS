import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Avatar, Button, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";

import colors from "../config/colors";

const styles = StyleSheet.create({
  topRowContainer: {
    height: 40,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  topRowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 20, marginRight: 4 },
  avatarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    marginVertical: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  bold: { fontWeight: "bold" },
  textArea: {
    borderWidth: 1,
    margin: 15,
    textAlignVertical: "top",
    padding: 5,
  },
  buttonContainer: {
    marginHorizontal: "15%",
  },
  button: {
    backgroundColor: colors.defaultPrimaryButton,
  },
});

const WriteReviewScreen = () => {
  return (
    <View>
      <View style={styles.topRowContainer}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <View style={styles.topRowLeft}>
          <Text style={[styles.title, styles.bold]}>Đánh giá của bạn</Text>
        </View>
        <Ionicons name="flag" size={24} color="#fff" />
      </View>
      <Divider />
      <View style={styles.avatarContainer}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: "https://picsum.photos/200",
          }}
          containerStyle={{
            margin: 10,
          }}
        />
        <Text style={styles.bold}>Nguyễn Văn B</Text>
      </View>
      <Divider />
      <View style={styles.ratingContainer}>
        <Text style={[styles.text, styles.bold]}>Điểm số:</Text>
        <Rating
          imageSize={30}
          ratingCount={5}
          showRating={false}
          startingValue={1}
          tintColor={colors.defaultBackground}
        />
      </View>
      <Divider />
      <TextInput
        multiline
        numberOfLines={6}
        maxLength={1000}
        placeholder="Chia sẻ về trải nghiệm của bạn"
        style={styles.textArea}
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        title="Đăng"
      />
    </View>
  );
};

export default WriteReviewScreen;
