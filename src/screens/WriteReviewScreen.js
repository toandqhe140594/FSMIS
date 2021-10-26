import { useStoreState } from "easy-peasy";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { Avatar, Button, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";

import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";

const WriteReviewScreen = () => {
  const locationShortInformation = useStoreState(
    (states) => states.LocationModel.locationShortInformation,
  );

  const { id, name, isVerified } = locationShortInformation;

  return (
    <View>
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
        <Text style={{ fontWeight: "bold" }}>Nguyễn Văn B</Text>
      </View>
      <Divider />
      <View
        style={{
          marginVertical: 5,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          Điểm số:
        </Text>
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
        style={{
          borderWidth: 1,
          margin: 15,
          textAlignVertical: "top",
          padding: 5,
        }}
      />
      <Button
        containerStyle={{ marginHorizontal: "15%" }}
        buttonStyle={{ backgroundColor: colors.defaultPrimaryButton }}
        title="Đăng"
      />
    </View>
  );
};

export default WriteReviewScreen;
