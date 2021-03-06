import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { Divider } from "react-native-elements/dist/divider/Divider";

import InputComponent from "../components/common/InputComponent";
import InputWithClipboard from "../components/common/InputWithClipboard";
import TextAreaComponent from "../components/common/TextAreaComponent";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import { SCHEMA } from "../constants";
// import { goBack } from "../navigations";
import { showAlertAbsoluteBox, showToastMessage } from "../utilities";

const createSuggestObject = (data) => {
  const suggestObj = data;
  if (!suggestObj.address) delete suggestObj.address;
  if (!suggestObj.website) delete suggestObj.website;
  if (!suggestObj.additionalInformation)
    delete suggestObj.additionalInformation;
  return suggestObj;
};
const FManageSuggestLocationScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
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

  const goBackAfterSuccess = () => {
    navigation.pop(2);
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const suggestObj = createSuggestObject(data);
    const suggestData = { ...suggestObj, ...locationLatLng };
    suggestNewLocation({ suggestData })
      .then(() => {
        setIsLoading(false);
        showAlertAbsoluteBox(
          "C???m ??n ????ng g??p c???a b???n",
          "Ch??ng t??i s??? li??n l???c v???i ch??? h??? s???m nh???t c?? th???",
          goBackAfterSuccess,
        );
      })
      .catch(() => {
        setIsLoading(false);
        showToastMessage("C?? l???i x???y ra");
      });
  };

  useEffect(() => {
    return () => {
      resetLocationLatLng();
    };
  }, []);

  return (
    <>
      <HeaderTab name="G???i ?? h??? c??u cho h??? th???ng" />
      <ScrollView>
        <FormProvider {...methods}>
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Text style={[styles.mdText, styles.boldText, styles.mb1]}>
              B???n bi???t h??? c??u ch??a c?? trong h??? th???ng?
            </Text>
            <Text style={[styles.mt1]}>Xin h??y gi???i thi???u cho ch??ng t??i</Text>
            <View style={{ width: "80%", marginTop: 40 }}>
              <InputComponent
                isTitle
                label="T??n ?????a ??i???m c??u"
                hasAsterisk
                placeholder="Nh???p t??n ?????a ??i???m c??u"
                controllerName="name"
              />
              <InputComponent
                isTitle
                label="S??? ??i???n tho???i ch??? h???"
                hasAsterisk
                placeholder="Nh???p s??? ??i???n tho???i ch??? h???"
                controllerName="phone"
                useNumPad
                myStyles={{ marginVertical: 20 }}
              />
              <Divider />
              <InputComponent
                isTitle
                label="?????a ch???"
                placeholder="Nh???p ?????a ch??? c???a khu h???"
                controllerName="address"
                myStyles={{ marginVertical: 20 }}
              />
              <InputWithClipboard
                isTitle
                label="Website"
                placeholder="Nh???p trang web c???a khu h???"
                controllerName="website"
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
                  V??? tr??
                </Text>
                <MapOverviewBox />
              </View>
              {/* additionalInformation textarea */}
              <TextAreaComponent
                myStyles={styles.mt1}
                label="Th??ng tin th??m"
                isTitle
                placeholder="M?? t??? th??ng tin b??? sung (n???u c??)"
                numberOfLines={6}
                controllerName="additionalInformation"
              />

              <Button
                title="G???i"
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
