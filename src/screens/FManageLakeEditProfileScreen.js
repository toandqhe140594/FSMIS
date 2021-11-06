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
  // Stack,
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
import { ROUTE_NAMES, SCHEMA } from "../constants";
import FishingMethodModel from "../models/FishingMethodModel";
import FManageModel from "../models/FManageModel";
import { goBack } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";
import store from "../utilities/Store";

store.addModel("FManageModel", FManageModel);
store.addModel("FishingMethodModel", FishingMethodModel);

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const LakeEditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imageArray, setImageArray] = useState([]);
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  const { lakeDetail } = useStoreState((states) => states.FManageModel);
  const { getLakeDetailByLakeId, closeLakeByLakeId } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: lakeDetail.name,
      methods: lakeDetail.methods,
      price: lakeDetail.price,
      length: lakeDetail.length,
      width: lakeDetail.width,
      depth: lakeDetail.depth,
    },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FORM),
  });
  const { handleSubmit } = methods;
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  /**
   * Submit lake changes
   * @param {Object} data data from controller
   */
  const onSubmit = (data) => {
    const imageUrl = imageArray[0].base64;
    const addData = { ...data, imageUrl };
    console.log(addData);
  };

  const onDeleteLake = (id, name) => {
    showAlertConfirmBox(
      "Bạn muốn xóa hồ này?",
      `"${name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
      () => {
        closeLakeByLakeId({ id, setDeleteSuccess });
      },
    );
  };

  /**
   * Remove an image and update the image array
   * @param {number} id id of the deleted image
   */
  const updateImageArray = (id) => {
    setImageArray(imageArray.filter((image) => image.id !== id));
  };

  /**
   * Fire when navigates back to the screen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setImageArray(route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  useEffect(() => {
    if (route.params.id) {
      getLakeDetailByLakeId({ id: route.params.id });
      setImageArray([lakeDetail.imageUrl]);
    }
  }, []);

  useEffect(() => {
    if (deleteSuccess) {
      showToastMessage("Xóa hồ thành công");
      goBack(navigation);
    }
  }, [deleteSuccess]);

  return (
    <>
      <HeaderTab name="Chỉnh sửa hồ bé" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              {/* Image Picker section */}
              <MultiImageSection
                containerStyle={styles.sectionWrapper}
                formRoute={ROUTE_NAMES.FMANAGE_LAKE_EDIT}
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
                controllerName="methods"
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
                />
                <InputComponent
                  label="Chiều rộng (m)"
                  placeholder="Nhập chiều rộng của hồ"
                  controllerName="width"
                />
                <InputComponent
                  label="Độ sâu (m)"
                  placeholder="Nhập độ sâu của hồ"
                  controllerName="depth"
                />
              </VStack>
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
                  Lưu thông tin hồ câu
                </Button>
                <Button
                  style={styles.button}
                  variant="outline"
                  alignSelf="center"
                  onPress={() => {
                    onDeleteLake(lakeDetail.id, lakeDetail.name);
                  }}
                >
                  Xoá hồ câu
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default LakeEditProfileScreen;
