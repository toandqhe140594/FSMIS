import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Center, Divider, Stack, Text, VStack } from "native-base";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import MapOverviewBox from "../components/FLocationEditProfile/MapOverviewBox";
import HeaderTab from "../components/HeaderTab";

const cityData = [
  { label: "Hà Nội", val: 1 },
  { label: "Hồ Chí Minh", val: 2 },
];

const districtData = [
  { label: "Hai Bà Trưng", val: 1 },
  { label: "Hoàng Mai", val: 2 },
];

const communeData = [
  { label: "Vĩnh Hưng", val: 1 },
  { label: "Thanh Lương", val: 2 },
];

const validationSchema = yup.object().shape({
  fName: yup.string().required("Tên địa điểm không thể bỏ trống"),
  fPhone: yup.string().required("Số điện thoại không dược bỏ trống"),
  fWebsite: yup.string(),
  fAddress: yup.string().required("Địa chỉ không được để trống"),
  fCityAddress: yup
    .number()
    .default(-1)
    .required("Tỉnh/Thành phố không được để trống"),
  fDistrictAddress: yup
    .number()
    .default(-1)
    .required("Quận/Huyện không được để trống"),
  fCommuneAddress: yup
    .number()
    .default(-1)
    .required("Phường/xã không được để trống"),
});

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const FManageEditProfileScreen = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };
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
                <MultiImageSection imageLimit={5} />
                {/* Input location name */}
                <InputComponent
                  isTitle
                  label="Tên địa điểm câu"
                  hasAsterisk
                  placeholder="Nhập tên địa điểm câu"
                  fieldName="fName"
                />
                {errors.fName?.message && (
                  <Text color="danger.500" fontSize="xs" italic>
                    {errors.fName?.message}
                  </Text>
                )}
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
                  fieldName="fPhone"
                />
                {errors.fPhone?.message && (
                  <Text color="danger.500" fontSize="xs" italic>
                    {errors.fPhone?.message}
                  </Text>
                )}
                <InputComponent
                  label="Website"
                  placeholder="Nhập website/facebook"
                  fieldName="fWebsite"
                />

                <InputComponent
                  label="Địa chỉ"
                  placeholder="Nhập địa chỉ"
                  hasAsterisk
                  fieldName="fAddress"
                />
                {errors.fAddress?.message && (
                  <Text color="danger.500" fontSize="xs" italic>
                    {errors.fAddress?.message}
                  </Text>
                )}
                <SelectComponent
                  placeholder="Chọn tỉnh/thành phố"
                  label="Tỉnh/Thành phố"
                  hasAsterisk
                  fieldName="fCityAddress"
                  data={cityData}
                />
                {errors.fCityAddress?.message && (
                  <Text color="danger.500" fontSize="xs" italic>
                    {errors.fCityAddress?.message}
                  </Text>
                )}
                <SelectComponent
                  placeholder="Chọn quận/huyện"
                  label="Quận/Huyện"
                  hasAsterisk
                  fieldName="fDistrictAddress"
                  data={districtData}
                />
                {errors.fDistrictAddress?.message && (
                  <Text color="danger.500" fontSize="xs" italic>
                    {errors.fDistrictAddress?.message}
                  </Text>
                )}
                <SelectComponent
                  label="Phường/Xã"
                  placeholder="Chọn phường/xã"
                  hasAsterisk
                  fieldName="fCommuneAddress"
                  data={communeData}
                />
                {errors.fCommuneAddress?.message && (
                  <Text color="danger.500" fontSize="xs" italic>
                    {errors.fCommuneAddress?.message}
                  </Text>
                )}
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
              />
            </Center>

            <Center>
              {/* rule textarea */}
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Nội quy"
                isTitle
                placeholder="Miêu tả nội quy khu hồ"
                numberOfLines={3}
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
