import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Avatar, Button, Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import * as yup from "yup";

import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";
import { goBack } from "../navigations";
import { showToastMessage } from "../utilities";

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
  },
  bold: { fontWeight: "bold" },
  section: {
    margin: 15,
  },
  textArea: {
    borderWidth: 1,
    textAlignVertical: "top",
    padding: 5,
    height: 150,
  },
  buttonContainer: {
    marginHorizontal: "15%",
  },
  error: {
    color: "#f43f5e",
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 6,
  },
});

const validationSchema = yup.object().shape({
  score: yup
    .number()
    .test(
      "isLargerThenZero?",
      "Số sao không được để trống",
      (value) => value > 0,
    ),
  description: yup.string().required("Đánh giá không được để trống"),
});

const WriteReviewScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { score: 1 },
    resolver: yupResolver(validationSchema),
  });

  const postReview = useStoreActions(
    (actions) => actions.LocationModel.postReview,
  );

  const userInfo = useStoreState((states) => states.ProfileModel.userInfo);

  const onSubmit = (data) => {
    postReview(data).then((result) => {
      // If api return status of success
      if (result === 200) {
        showToastMessage("Đánh giá thành công");
        goBack(navigation);
      } else {
        showToastMessage("Đánh giá thất bại");
      }
    });
  };

  return (
    <View>
      <HeaderTab name="Đánh giá của bạn" />
      <View style={styles.avatarContainer}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: userInfo.avatarUrl,
          }}
          containerStyle={{
            margin: 10,
          }}
        />
        <Text style={styles.bold}>{userInfo.fullName}</Text>
      </View>
      <Divider />
      <View style={styles.section}>
        <Text style={[styles.title, styles.bold]}>Điểm số:</Text>
        <Controller
          control={control}
          name="score"
          render={({ field: { onChange, value } }) => (
            <Rating
              imageSize={35}
              ratingCount={5}
              showRating={false}
              startingValue={value}
              onFinishRating={onChange}
              tintColor={colors.defaultBackground}
            />
          )}
        />
        {errors.score?.message && (
          <Text style={styles.error}>{errors.score?.message}</Text>
        )}
      </View>
      <Divider />
      <View style={styles.section}>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              multiline
              numberOfLines={6}
              maxLength={1000}
              placeholder="Chia sẻ về trải nghiệm của bạn"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.textArea}
            />
          )}
        />
        {errors.description?.message && (
          <Text style={styles.error}>{errors.description?.message}</Text>
        )}
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        onPress={handleSubmit(onSubmit)}
        title="Đăng"
      />
    </View>
  );
};

export default WriteReviewScreen;
