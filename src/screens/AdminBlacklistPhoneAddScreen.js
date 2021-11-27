import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";
import styles from "../config/styles";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox } from "../utilities";

const FManageSuggestLocationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const methods = useForm({
    mode: "onSubmit",
    defaultValues: { imageArray: [] },
    resolver: yupResolver(SCHEMA.ADMIN_BLACKLIST_ADD_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const blacklistPhoneNumber = useStoreActions(
    (actions) => actions.AccountManagementModel.blacklistPhoneNumber,
  );

  const [loading, setLoading] = useState(false);

  const goBackAfterSuccess = () => {
    goBack(navigation);
  };

  const onSubmit = (data) => {
    setLoading(true);
    blacklistPhoneNumber({ blacklistObj: data })
      .then(() => {
        showAlertAbsoluteBox(
          "Chặn số điện thoại thành công",
          `Số điện thoại "${data.phone}" đã bị thêm vào danh sách đen `,
          goBackAfterSuccess,
        );
      })
      .catch(() => {
        setLoading(false);
      });
  };

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
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 16 }}>
              Ảnh minh họa
            </Text>

            <MultiImageSection
              containerStyle={{ width: "100%" }}
              formRoute={ROUTE_NAMES.ADMIN_BLACKLIST_PHONE_MANAGEMENT_ADD}
              controllerName="imageArray"
            />
            <Button
              title="Chặn"
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
    </View>
  );
};

export default FManageSuggestLocationScreen;
