import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  Box,
  Button,
  Center,
  Divider,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import CheckboxSelectorComponent from "../components/LakeEditProfile/CheckboxSelectorComponent";
import FishCardSection from "../components/LakeEditProfile/FishCardSection";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import FishingMethodModel from "../models/FishingMethodModel";
import FishModel from "../models/FishModel";
import FManageModel from "../models/FManageModel";
import { showAlertAbsoluteBox, showAlertBox } from "../utilities";
import store from "../utilities/Store";

store.addModel("FManageModel", FManageModel);
store.addModel("FishingMethodModel", FishingMethodModel);
store.addModel("FishModel", FishModel);

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});
const LakeAddNewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const [addStatus, setAddStatus] = useState("");
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  const { addNewLakeInLocation } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const { getFishingMethodList } = useStoreActions(
    (actions) => actions.FishingMethodModel,
  );
  const { getFishList } = useStoreActions((actions) => actions.FishModel);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { methods: [] },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FORM),
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    // Should check for empty images
    const imageUrl = imageArray[0].base64;
    const addData = { ...data, imageUrl };
    // console.log(`Sent with ${addData}`);
    addNewLakeInLocation({ addData, setAddStatus });
  };

  /**
   * Take id of the image and remove image from imageArray
   * @param {Number} id: id in the object image
   */
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };

  /**
   * Everytime enter the screen, call api
   * to get fishing method list and fish list
   */
  useEffect(() => {
    getFishingMethodList();
    getFishList();
  }, []);

  useEffect(() => {
    if (addStatus === "SUCCESS") {
      showAlertAbsoluteBox(
        "Thông báo",
        "Hồ bé thêm thành công!",
        () => {
          navigation.goBack();
        },
        "Xác nhận",
      );
    } else if (addStatus === "FAILED") {
      showAlertBox("Thông báo", "Đã có lỗi xảy ra, vui lòng thử lại");
    }
  }, [addStatus]);
  // Fire when navigates back to the screen
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
      <HeaderTab name="Thêm hồ bé" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              {/* Image Picker section */}
              <MultiImageSection
                containerStyle={styles.sectionWrapper}
                formRoute={ROUTE_NAMES.FMANAGE_LAKE_ADD}
                imageArray={imageArray}
                deleteImage={updateImageArray}
              />
            </Center>

            <Center>
              <InputComponent
                myStyles={styles.sectionWrapper}
                label="Tên hồ câu"
                isTitle
                placeholder="Nhập tên hồ câu"
                controllerName="name"
              />
            </Center>

            <Center>
              <CheckboxSelectorComponent
                myStyles={styles.sectionWrapper}
                label="Loại hình câu"
                isTitle
                placeholder="Chọn loại hình câu"
                data={fishingMethodList}
                controllerName="methods" // this controller returns an array
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Giá vé"
                isTitle
                placeholder="Miêu tả giá vé hồ"
                numberOfLines={3}
                controllerName="price"
              />
            </Center>

            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông số
                </Text>
                <InputComponent
                  label="Chiều dài (m)"
                  placeholder="Nhập chiều dài của hồ"
                  controllerName="length"
                  useNumPad
                />
                <InputComponent
                  label="Chiều rộng (m)"
                  placeholder="Nhập chiều rộng của hồ"
                  controllerName="width"
                  useNumPad
                />
                <InputComponent
                  label="Độ sâu (m)"
                  placeholder="Nhập độ sâu của hồ"
                  controllerName="depth"
                  useNumPad
                />
              </VStack>
            </Center>

            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Các loại cá
                </Text>
                <FishCardSection />
              </Stack>
            </Center>
            <Center>
              <Box style={styles.sectionWrapper} mb={5}>
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  mb={2}
                  onPress={handleSubmit(onSubmit)}
                >
                  Thêm hồ câu
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default LakeAddNewScreen;
