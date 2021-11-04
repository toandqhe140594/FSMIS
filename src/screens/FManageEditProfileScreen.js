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
import { ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES } from "../constants";
import AddressModel from "../models/AddressModel";
import store from "../utilities/Store";

store.addModel("AddressModel", AddressModel);

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const FManageEditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const validationSchema = useMemo(() =>
    yup.object().shape({
      fName: yup.string().required("Tên địa điểm không thể bỏ trống"),
      fPhone: yup.string().required("Số điện thoại không dược bỏ trống"),
      fWebsite: yup.string(),
      fAddress: yup.string().required("Địa chỉ không được để trống"),
      fProvinceId: yup.number().required("Tỉnh/Thành phố không được để trống"),
      fDistrictId: yup.number().required("Quận/Huyện không được để Id"),
      fWardId: yup.number().required("Phường/xã không được để trống"),
      fDescription: yup.string().required("Hãy viết một vài điều về địa điểm"),
      fRules: yup.string(),
      fServices: yup.string(),
      fSchedule: yup.string().required("Hãy nêu rõ lịch biểu của hồ"),
    }),
  );
  const { provinceList, districtList, wardList } = useStoreState(
    (state) => state.AddressModel,
  );
  const {
    resetDataList,
    getAllProvince,
    getDisctrictByProvinceId,
    getWardByDistrictId,
  } = useStoreActions((actions) => actions.AddressModel);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const generateAddressDropdown = useCallback((name, value) => {
    if (name === "fProvinceId") {
      getDisctrictByProvinceId({ id: value });
    } else if (name === "fDistrictId") {
      getWardByDistrictId({ id: value });
    }
  }, []);
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
    console.log(imageArray);
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

  // Fire when naviagtes back to this screen
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array.length) {
        setImageArray(route.params.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );
  return (
    <>
      <HeaderTab name="Thông tin điểm câu" />
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
                  formRoute={ROUTE_NAMES.FMANAGE_PROFILE_EDIT}
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
                  controllerName="fName"
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
                  controllerName="fPhone"
                />

                <InputComponent
                  label="Website"
                  placeholder="Nhập website/facebook"
                  controllerName="fWebsite"
                />

                <InputComponent
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  hasAsterisk
                  controllerName="fAddress"
                />

                <SelectComponent
                  placeholder="Chọn tỉnh/thành phố"
                  label="Tỉnh/Thành phố"
                  hasAsterisk
                  controllerName="fProvinceId"
                  data={provinceList}
                  handleDataIfValChanged={generateAddressDropdown}
                />

                <SelectComponent
                  placeholder="Chọn quận/huyện"
                  label="Quận/Huyện"
                  hasAsterisk
                  controllerName="fDistrictId"
                  data={districtList}
                  handleDataIfValChanged={generateAddressDropdown}
                />

                <SelectComponent
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                  hasAsterisk
                  controllerName="fWardId"
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
                controllerName="fDescription"
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
                controllerName="fSchedule"
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
                controllerName="fService"
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
                controllerName="fRules"
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

export default FManageEditProfileScreen;
