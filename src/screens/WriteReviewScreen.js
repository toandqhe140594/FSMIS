import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Divider } from "react-native-elements";

import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import StarInputComponent from "../components/WriteReview/StarInputComponent";
import { DICTIONARY, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showToastMessage } from "../utilities";

const styles = StyleSheet.create({
  avatarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  section: {
    margin: 15,
  },
  buttonContainer: {
    marginHorizontal: "15%",
  },
});

const WriteReviewScreen = () => {
  const navigation = useNavigation();

  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { score: 1 },
    resolver: yupResolver(SCHEMA.WRITE_REVIEW_FORM),
  });

  const { handleSubmit } = methods;

  const postReview = useStoreActions(
    (actions) => actions.LocationModel.postReview,
  );

  const userInfo = useStoreState((states) => states.ProfileModel.userInfo);

  const onSubmit = (data) => {
    postReview(data).then((result) => {
      // If api return status of success
      if (result === 200) {
        showToastMessage(DICTIONARY.TOAST_WRITE_REVIEW_SUCCESS_MSG);
        goBack(navigation);
      } else {
        showToastMessage(DICTIONARY.ALERT_ERROR_MSG);
      }
    });
  };

  return (
    <View>
      <HeaderTab name={DICTIONARY.ANGLER_WRITE_REVIEW_HEADER} />
      <FormProvider {...methods}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            size="medium"
            source={{ uri: userInfo.avatarUrl }}
            containerStyle={{ margin: 10 }}
          />
          <Text style={styles.bold}>{userInfo.fullName}</Text>
        </View>
        <Divider />
        <StarInputComponent
          label={DICTIONARY.RATING_LABEL}
          controllerName={DICTIONARY.FORM_FIELD_RATING}
          containerStyle={styles.section}
        />
        <Divider />
        <TextAreaComponent
          numberOfLines={6}
          myStyles={styles.section}
          controllerName={DICTIONARY.FORM_FIELD_REVIEW_CONTENT}
          placeholder={DICTIONARY.INPUT_REVIEW_CONTENT_PLACEHOLDER}
        />
        <Button
          containerStyle={styles.buttonContainer}
          onPress={handleSubmit(onSubmit)}
          title={DICTIONARY.POST_BUTTON_LABEL}
        />
      </FormProvider>
    </View>
  );
};

export default WriteReviewScreen;
