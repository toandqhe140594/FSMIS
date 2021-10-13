import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { Avatar, Button, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";

const WriteReviewScreen = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          height: 40,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 4 }}>
            Đánh giá của bạn
          </Text>
        </View>
        <Ionicons name="flag" size={24} color="#fff" />
      </View>
      <Divider />
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
          startingValue={0}
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
      <Button containerStyle={{ marginHorizontal: "15%" }} title="Đăng" />
    </SafeAreaView>
  );
};

export default WriteReviewScreen;
