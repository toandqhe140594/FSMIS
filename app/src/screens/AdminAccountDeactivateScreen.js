import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useCallback, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";

import MultiImageSection from "../components/common/MultiImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";
import styles from "../config/styles";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showAlertConfirmBox } from "../utilities";

const FManageSuggestLocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.ADMIN_ACCOUNT_DEACTIVATE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const blacklistPhoneNumber = useStoreActions(
    (actions) => actions.AccountManagementModel.blacklistPhoneNumber,
  );

  const [loading, setLoading] = useState(false);
  const phone = useRef("");
  const [, setForceUpdate] = useState(Date.now());

  const goBackAfterSuccess = () => {
    goBack(navigation);
  };

  const deactivateAccount = (blacklistObj) => () => {
    setLoading(true);
    blacklistPhoneNumber({
      blacklistObj,
    })
      .then(() => {
        showAlertAbsoluteBox(
          "Vô hiệu hóa tài khoản thành công",
          `Số điện thoại "${phone.current}" đã bị thêm vào danh sách đen `,
          goBackAfterSuccess,
        );
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    showAlertConfirmBox(
      `Vô hiệu tài khoản "${phone.current}"?`,
      "Tài khoản bị vô hiệu hóa sẽ bị thêm vào danh sách đen và không thể tham gia vào ứng dụng",
      deactivateAccount({ ...data, phone: phone.current }),
    );
  };

  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setValue("imageArray", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
      if (route.params?.phone) {
        phone.current = route.params.phone;
        setForceUpdate();
      }
    }, [route.params]),
  );

  return (
    <ScrollView style={{ flex: 1 }}>
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
            Vô hiệu hóa tài khoản {phone.current}
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
              formRoute={ROUTE_NAMES.ADMIN_ACCOUNT_MANAGEMENT_DEACTIVATE}
              controllerName="imageArray"
            />
            <Button
              title="Vô hiệu hóa tài khoản"
              onPress={handleSubmit(onSubmit)}
              containerStyle={{ marginTop: 30 }}
              loading={loading}
              disabled={loading}
              buttonStyle={{
                backgroundColor: colors.defaultDanger,
              }}
            />
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  );
};

export default FManageSuggestLocationScreen;
