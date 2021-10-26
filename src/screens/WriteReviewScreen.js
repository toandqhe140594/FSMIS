import { useStoreState } from "easy-peasy";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Avatar, Button, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";

import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
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
  const locationShortInformation = useStoreState(
    (states) => states.LocationModel.locationShortInformation,
  );

  const { id, name, isVerified } = locationShortInformation;
  const [rating, setRating] = useState(1);
  const [reviewContent, setReviewContent] = useState("");
  const onSubmit = () => {
    console.log(`Rating given ${rating}, review: ${reviewContent}`); // Testing
  };
  return (
    <View style={styles.avatarContainer}>
      <HeaderTab id={id} name={name} isVerified={isVerified} flagable />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
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
          startingValue={rating}
          onFinishRating={setRating}
          tintColor={colors.defaultBackground}
        />
      </View>
      <Divider />
      <TextInput
        multiline
        numberOfLines={6}
        maxLength={1000}
        placeholder="Chia sẻ về trải nghiệm của bạn"
        value={reviewContent}
        onChangeText={setReviewContent}
        style={styles.textArea}
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={onSubmit}
        title="Đăng"
      />
    </View>
  );
};

export default WriteReviewScreen;
