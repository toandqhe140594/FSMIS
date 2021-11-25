import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";

import InputComponent from "../components/common/InputComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";

const createSuggestObject = (data) => {
  const suggestObj = data;
  if (!suggestObj.address) delete suggestObj.address;
  if (!suggestObj.website) delete suggestObj.website;
  if (!suggestObj.description) delete suggestObj.description;
  return suggestObj;
};
const FManageSuggestLocationScreen = () => {
  const navigation = useNavigation();
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.FMANAGE_SUGGESTION_FORM),
  });
  const { handleSubmit } = methods;

  const locationLatLng = useStoreState(
    (states) => states.FManageModel.locationLatLng,
  );
  const suggestNewLocation = useStoreActions(
    (actions) => actions.FManageModel.suggestNewLocation,
  );
  const resetLocationLatLng = useStoreActions(
    (actions) => actions.FManageModel.resetLocationLatLng,
  );

  const [success, setSuccess] = useState(null);

  const onSubmit = (data) => {
    const suggestObj = createSuggestObject(data);
    suggestNewLocation({
      data: { ...suggestObj, ...locationLatLng },
      setSuccess,
    });
  };

  const goBackAfterSuccess = () => {
    goBack(navigation);
  };

  useEffect(() => {
    if (success)
      showAlertAbsoluteBox(
        "Cảm ơn đóng góp của bạn",
        "Chúng tôi sẽ liên lạc với chủ hồ sớm nhất có thể",
        goBackAfterSuccess,
      );
    else if (success === false) showToastMessage("Có lỗi xảy ra");
    setSuccess(null);
  }, [success]);

  useEffect(() => {
    return () => {
      resetLocationLatLng();
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <HeaderTab name="Gợi ý hồ câu cho hệ thống" />
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
            Bạn biết hồ câu chưa có trong hệ thống?
          </Text>
          <Text style={[styles.mt1]}>Xin hãy giới thiệu cho chúng tôi</Text>
          <View style={{ width: "80%", marginTop: 40 }}>
            <InputComponent
              isTitle
              label="Tên địa điểm câu"
              hasAsterisk
              placeholder="Nhập tên địa điểm câu"
              controllerName="name"
            />
            <InputComponent
              isTitle
              label="Số điện thoại chủ hồ"
              hasAsterisk
              placeholder="Nhập số điện thoại chủ hồ"
              controllerName="phone"
              useNumPad
              myStyles={{ marginVertical: 20 }}
            />
            <Divider />
            <InputComponent
              isTitle
              label="Địa chỉ"
              placeholder="Nhập địa chỉ của khu hồ"
              controllerName="address"
              useNumPad
              myStyles={{ marginVertical: 20 }}
            />
            <InputComponent
              isTitle
              label="Website"
              placeholder="Nhập trang web của khu hồ"
              controllerName="website"
              useNumPad
            />
            {/* Map component */}
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  marginVertical: 8,
                }}
              >
                Vị trí
              </Text>
              <MapOverviewBox />
            </View>
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
              onPress={handleSubmit(onSubmit)}
              containerStyle={{ marginTop: 30 }}
            />
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  );
};

export default FManageSuggestLocationScreen;
