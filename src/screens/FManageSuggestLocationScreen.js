import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

import InputComponent from "../components/common/InputComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";

const FManageSuggestLocationScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.FMANAGE_SUGGESTION_FORM),
  });
  const { handleSubmit } = methods;
  const suggestNewLocation = useStoreActions(
    (actions) => actions.FManageModel.suggestNewLocation,
  );
  const goBackAfterSuccess = () => {
    goBack(navigation);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    suggestNewLocation({ data })
      .then(() => {
        setIsLoading(false);
        showAlertAbsoluteBox(
          "Cảm ơn đóng góp của bạn",
          "Chúng tôi sẽ liên lạc với chủ hồ sớm nhất có thể",
          goBackAfterSuccess,
        );
      })
      .catch(() => {
        setIsLoading(false);
        showToastMessage("Có lỗi xảy ra");
      });
  };

  return (
    <>
      <HeaderTab name="Gợi ý hồ câu cho hệ thống" />
      <ScrollView style={{ flex: 1 }}>
        <FormProvider {...methods}>
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <Text
              style={StyleSheet.compose(
                styles.mdText,
                styles.boldText,
                styles.mb1,
              )}
            >
              Bạn biết hồ câu chưa có trong hệ thống?
            </Text>
            <Text style={styles.mt1}>Xin hãy giới thiệu cho chúng tôi</Text>
            <View style={{ width: "80%", marginTop: 40 }}>
              <InputComponent
                isTitle
                label="Tên địa điểm câu"
                hasAsterisk
                placeholder="Nhập tên địa điểm câu"
                controllerName="locationName"
              />

              <InputComponent
                isTitle
                useNumPad
                hasAsterisk
                controllerName="ownerPhone"
                label="Số điện thoại chủ hồ"
                myStyles={{ marginVertical: 20 }}
                placeholder="Nhập số điện thoại chủ hồ"
              />

              {/* Description textarea */}
              <TextAreaComponent
                myStyles={styles.mt1}
                label="Thông tin thêm"
                isTitle
                placeholder="Mô tả thông tin bổ sung (nếu có)"
                numberOfLines={6}
                controllerName="description"
              />

              <Button
                title="Gửi"
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                containerStyle={{ marginTop: 30 }}
              />
            </View>
          </View>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default FManageSuggestLocationScreen;
