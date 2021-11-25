import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

import MultiImageSection from "../components/common/MultiImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";

const FManageSuggestLocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.ADMIN_BLACKLIST_ADD_FORM),
  });
  const { handleSubmit, getValues, setValue } = methods;

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

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue("imageArray", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name="Vô hiệu hóa tài khoản" />
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
            Vô hiệu hóa tài khoản 0985043311
          </Text>
          <Text
            style={[styles.mt1, { textAlign: "center", marginHorizontal: 10 }]}
          >
            Tài khoản bị vô hiệu hóa sẽ không thể truy cập vào ứng dụng
          </Text>
          <View style={{ width: "80%", marginTop: 30 }}>
            {/* Description textarea */}
            <TextAreaComponent
              myStyles={styles.mt1}
              label="Mô tả lý do"
              isTitle
              placeholder="Mô tả nguyên nhân vô hiệu hóa tài khoản này"
              numberOfLines={6}
              controllerName="description"
            />
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 16 }}>
              Ảnh minh họa
            </Text>

            <MultiImageSection
              containerStyle={{ width: "100%" }}
              formRoute={ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT_ADD}
              controllerName="imageArray"
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
