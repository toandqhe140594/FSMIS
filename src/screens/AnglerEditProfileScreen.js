import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Center, VStack } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";

import AvatarSection from "../components/AnglerEditProfile/AvatarSection";
import DatePickerInput from "../components/common/DatePickerInput";
import DistrictSelector from "../components/common/DistrictSelector";
import InputComponent from "../components/common/InputComponent";
import OverlayLoading from "../components/common/OverlayLoading";
import ProvinceSelector from "../components/common/ProvinceSelector";
import SelectComponent from "../components/common/SelectComponent";
import WardSelector from "../components/common/WardSelector";
import HeaderTab from "../components/HeaderTab";
import moment from "../config/moment";
import { DEFAULT_TIMEOUT, DICTIONARY, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import { showAlertBox } from "../utilities";

const genderList = [
  { id: true, name: "Nam" },
  { id: false, name: "Nữ" },
];

const EditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(true);
  const userInfo = useStoreState((state) => state.ProfileModel.userInfo);
  const { resetDataList, getAllProvince } = useStoreActions(
    (actions) => actions.AddressModel,
  );
  const { editPersonalInformation } = useStoreActions(
    (actions) => actions.ProfileModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      avatarUrl: userInfo.avatarUrl,
      fullName: userInfo.fullName,
      gender: userInfo.gender,
      dob: moment(userInfo.dob.split(" ")[0], "DD/MM/YYYY").toDate(),
      address: userInfo.address,
      provinceId: userInfo.addressFromWard.provinceId,
      districtId: userInfo.addressFromWard.districtId,
      wardId: userInfo.addressFromWard.wardId,
    },
    resolver: yupResolver(SCHEMA.ANGLER_PROFILE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  /**
   * Call an alert box to reset avatar image back to default avatar
   */
  const deleteImage = () => {
    Alert.alert(
      "Thông báo",
      "Bạn chắc chắn muốn xóa ảnh này?",
      [
        {
          text: "Hủy",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => setValue("avatarUrl", userInfo.avatarUrl),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    delete data.provinceId;
    delete data.districtId;
    const updateData = {
      ...data,
      dob: data.dob.toJSON(),
    };
    editPersonalInformation({ updateData })
      .then(() => {
        setIsLoading(false);
        showAlertBox(
          DICTIONARY.ALERT_TITLE,
          DICTIONARY.ALERT_EDIT_PROFILE_SUCCESS_MSG,
        );
      })
      .catch(() => {
        setIsLoading(false);
        showAlertBox(DICTIONARY.ALERT_TITLE, DICTIONARY.ALERT_ERROR_MSG);
      });
  };
  /**
   * Set up the screen
   */
  useEffect(() => {
    getAllProvince()
      .then(() => {
        setIsLoading(false);
        setFullScreen(false);
      })
      .catch(() => {
        goBack(navigation);
      });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreen(false);
    }, DEFAULT_TIMEOUT);
    return () => {
      clearTimeout(loadingId);
      resetDataList();
    };
  }, []);
  /**
   * When navigate from MediaSelectScreen back to Edit Form
   * the callback listen to route params and set
   * avatar image to what had been previously chosen in MediaSelectScreen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue(
          DICTIONARY.FORM_FIELD_AVATAR,
          route.params?.base64Array[0].base64,
        );
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  if (isLoading && fullScreen) {
    return <OverlayLoading coverScreen />;
  }
  return (
    <>
      <HeaderTab name={DICTIONARY.ANGLER_EDIT_PROFILE_HEADER_NAME} />
      <OverlayLoading loading={isLoading} />
      <ScrollView>
        <Center flex={1}>
          <FormProvider {...methods}>
            <VStack
              flex={1}
              justifyContent="center"
              mt={3}
              mb={5}
              space={1}
              w={{ base: "70%", md: "50%", lg: "30%" }}
            >
              <AvatarSection
                containerStyle={{ alignSelf: "center" }}
                navigation={navigation}
                name={DICTIONARY.FORM_FIELD_AVATAR}
                handleDelete={deleteImage}
              />
              <InputComponent
                label={DICTIONARY.FULL_NAME_LABEL}
                placeholder={DICTIONARY.INPUT_NAME_PLACEHOLDER}
                hasAsterisk
                controllerName={DICTIONARY.FORM_FIELD_FULL_NAME}
              />
              <DatePickerInput
                label={DICTIONARY.DOB_LABEL}
                placeholder={DICTIONARY.SELECT_BIRTHDATE_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_DOB}
              />
              <SelectComponent
                label={DICTIONARY.GENDER_LABEL}
                placeholder={DICTIONARY.SELECT_GENDER_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_GENDER}
                data={genderList}
              />
              <InputComponent
                label={DICTIONARY.ADDRESS_LABEL}
                placeholder={DICTIONARY.INPUT_ADDRESS_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_ADDRESS}
              />
              <ProvinceSelector
                label={DICTIONARY.PROVINCE_LABEL}
                placeholder={DICTIONARY.SELECT_PROVINCE_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_PROVINCE}
              />
              <DistrictSelector
                label={DICTIONARY.DISTRICT_LABEL}
                placeholder={DICTIONARY.SELECT_DISTRICT_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_DISTRICT}
              />
              <WardSelector
                label={DICTIONARY.WARD_LABEL}
                placeholder={DICTIONARY.SELECT_WARD_PLACEHOLDER}
                controllerName={DICTIONARY.FORM_FIELD_WARD}
              />
              <Button mt={6} size="lg" onPress={handleSubmit(onSubmit)}>
                Lưu thay đổi
              </Button>
            </VStack>
          </FormProvider>
        </Center>
      </ScrollView>
    </>
  );
};

export default EditProfileScreen;
