import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
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
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.ADMIN_BLACKLIST_ADD_FORM),
  });
  const { handleSubmit, getValues } = methods;

  const blacklistPhoneNumber = useStoreActions(
    (actions) => actions.AccountManagementModel.blacklistPhoneNumber,
  );

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    blacklistPhoneNumber({ blacklistObj: data, setSuccess });
  };

  const goBackAfterSuccess = () => {
    goBack(navigation);
  };

  useEffect(() => {
    if (success) {
      const phoneNumber = getValues("phone");
      showAlertAbsoluteBox(
        "Chặn số điện thoại thành công",
        `Số điện thoại "${phoneNumber}"" đã bị thêm vào danh sách đen `,
        goBackAfterSuccess,
      );
    } else if (success === false) {
      showToastMessage("Có lỗi xảy ra");
      setLoading(false);
      setSuccess(null);
    }
  }, [success]);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name="Chặn số điện thoại" />
      <FormProvider {...methods}>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <Text style={[styles.mdText, styles.boldText, styles.mb1]}>
            Thêm số điện thoại vào danh sách đen
          </Text>
          <Text
            style={[styles.mt1, { textAlign: "center", marginHorizontal: 10 }]}
          >
            Số điện thoại trong danh sách đen sẽ không thể sử dụng trong ứng
            dụng
          </Text>
          <View style={{ width: "80%", marginTop: 30 }}>
            <InputComponent
              isTitle
              label="Số điện thoại cần chặn"
              hasAsterisk
              placeholder="Nhập số điện thoại"
              controllerName="phone"
              useNumPad
            />

            {/* Description textarea */}
            <TextAreaComponent
              myStyles={styles.mt1}
              label="Mô tả lý do"
              isTitle
              placeholder="Mô tả nguyên nhân chặn số điện thoại này"
              numberOfLines={6}
              controllerName="description"
            />

            <Button
              title="Gửi"
              onPress={handleSubmit(onSubmit)}
              containerStyle={{ marginTop: 30 }}
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
};

export default FManageSuggestLocationScreen;
