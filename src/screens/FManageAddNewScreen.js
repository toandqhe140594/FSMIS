import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, Divider, Stack, Text, VStack } from "native-base";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Alert, ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES } from "../constants";
import AddressModel from "../models/AddressModel";
import FManageModel from "../models/FManageModel";
import store from "../utilities/Store";

store.addModel("AddressModel", AddressModel);
store.addModel("FManageModel", FManageModel);
const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const FManageAddNewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const [addStatus, setAddStatus] = useState("");
  const { provinceList, districtList, wardList } = useStoreState(
    (state) => state.AddressModel,
  );
  const { locationLatLng } = useStoreState((states) => states.FManageModel);
  const {
    resetDataList,
    getAllProvince,
    getDisctrictByProvinceId,
    getWardByDistrictId,
  } = useStoreActions((actions) => actions.AddressModel);
  const { addNewLocation } = useStoreActions((actions) => actions.FManageModel);
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required("Tên địa điểm không thể bỏ trống"),
        phone: yup
          .string()
          .matches(
            /((09|03|07|08|05)+([0-9]{8})\b)/,
            "Số điện thoại không hợp lệ",
          )
          .required("Số điện thoại không dược bỏ trống"),
        website: yup.string(),
        address: yup.string().required("Địa chỉ không được để trống"),
        provinceId: yup.number().required("Tỉnh/Thành phố không được để trống"),
        districtId: yup.number().required("Quận/Huyện không được để trống"),
        wardId: yup.number().required("Phường/xã không được để trống"),
        description: yup.string().required("Hãy viết một vài điều về địa điểm"),
        rule: yup.string(),
        service: yup.string(),
        timetable: yup.string().required("Hãy nêu rõ lịch biểu của hồ"),
      }),
    [],
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;
  const generateAddressDropdown = useCallback((name, value) => {
    if (name === "provinceId") {
      getDisctrictByProvinceId({ id: value });
    } else if (name === "districtId") {
      getWardByDistrictId({ id: value });
    }
  }, []);
  const onSubmit = (data) => {
    const images = imageArray.map((image) => image.base64);
    const addData = { ...data, ...locationLatLng, images };
    addNewLocation({ addData, setAddStatus });
    Alert.alert("Thông báo", addStatus, [], { cancelable: true });
  };
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };
  useEffect(() => {
    getAllProvince();
    return () => {
      resetDataList();
    };
  }, []);
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setImageArray(route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );
  return (
    <>
      <HeaderTab name="Tạo điểm câu mới" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center>
              {/* Image Picker section */}
              <Stack space={2} style={styles.sectionWrapper}>
                <Text bold fontSize="md" mt={2}>
                  Ảnh bìa (nhiều nhất là 5)
                </Text>
                <MultiImageSection
                  formRoute={ROUTE_NAMES.FMANAGE_PROFILE_ADD_NEW}
                  imageArray={imageArray}
                  deleteImage={updateImageArray}
                  selectLimit={5}
                />
                {/* Input location name */}
                <InputComponent
                  isTitle
                  label="Tên địa điểm câu"
                  hasAsterisk
                  placeholder="Nhập tên địa điểm câu"
                  controllerName="name"
                />
              </Stack>
            </Center>
            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông tin liên hệ
                </Text>
                {/* Information input and select fields */}
                <InputComponent
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  hasAsterisk
                  controllerName="phone"
                />

                <InputComponent
                  label="Website"
                  placeholder="Nhập website/facebook"
                  controllerName="website"
                />

                <InputComponent
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  hasAsterisk
                  controllerName="address"
                />

                <SelectComponent
                  placeholder="Chọn tỉnh/thành phố"
                  label="Tỉnh/Thành phố"
                  hasAsterisk
                  controllerName="provinceId"
                  data={provinceList}
                  handleDataIfValChanged={generateAddressDropdown}
                />

                <SelectComponent
                  placeholder="Chọn quận/huyện"
                  label="Quận/Huyện"
                  hasAsterisk
                  controllerName="districtId"
                  data={districtList}
                  handleDataIfValChanged={generateAddressDropdown}
                />

                <SelectComponent
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                  hasAsterisk
                  controllerName="wardId"
                  data={wardList}
                />
              </VStack>
            </Center>

            <Center>
              {/* Map component */}
              <Box style={styles.sectionWrapper}>
                <Text bold fontSize="md" mb={2}>
                  Bản đồ
                </Text>
                <MapOverviewBox />
              </Box>
            </Center>

            <Center>
              {/* Description textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Mô tả khu hồ"
                isTitle
                placeholder="Miêu tả khu hồ của bạn"
                numberOfLines={6}
                controllerName="description"
              />
            </Center>

            <Center>
              {/* Schedule textarea  */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Thời gian hoạt động"
                isTitle
                placeholder="Miêu tả thời gian hoạt động của khu hồ"
                numberOfLines={3}
                controllerName="timetable"
              />
            </Center>

            <Center>
              {/* Service textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Dịch vụ"
                isTitle
                placeholder="Miêu tả dịch vụ khu hồ"
                numberOfLines={3}
                controllerName="service"
              />
            </Center>

            <Center>
              {/* rules textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Nội quy"
                isTitle
                placeholder="Miêu tả nội quy khu hồ"
                numberOfLines={3}
                controllerName="rule"
              />
            </Center>

            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Lưu thông tin
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default FManageAddNewScreen;
