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
  Text,
  VStack,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

// import MethodCheckboxSelector from "../components/AdvanceSearch/MethodCheckboxSelector";
import CheckboxSelectorComponent from "../components/common/CheckboxSelectorComponent";
import InputComponent from "../components/common/InputComponent";
import MultiImageSection from "../components/common/MultiImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goBack } from "../navigations";
import {
  showAlertAbsoluteBox,
  showAlertBox,
  showAlertConfirmBox,
  showToastMessage,
} from "../utilities";

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
  loadOnStart: { alignItems: "center", justifyContent: "center" },
  loadOnSubmit: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});

const LakeEditProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreenMode, setFullScreenMode] = useState(true);
  const { fishingMethodList } = useStoreState(
    (state) => state.FishingMethodModel,
  );
  const { getFishingMethodList } = useStoreActions(
    (actions) => actions.FishingMethodModel,
  );
  const { lakeDetail } = useStoreState((states) => states.FManageModel);
  const { editLakeDetail, closeLakeByLakeId } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methodValue = () =>
    fishingMethodList.reduce((acc, { name, id }) => {
      if (lakeDetail.fishingMethodList.includes(name)) acc.push(id);
      return acc;
    }, []);
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      name: lakeDetail.name,
      price: lakeDetail.price,
      width: lakeDetail.width.toString(),
      length: lakeDetail.length.toString(),
      depth: lakeDetail.depth.toString(),
      imageArray: [{ id: 1, base64: lakeDetail.imageUrl }],
      methods: [],
    },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FORM),
  });
  const { handleSubmit, setValue } = methods;

  const navigateToLakeProfileScreen = () => {
    goBack(navigation);
  };

  const handleError = () => {
    setIsLoading(false);
    showAlertBox("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại sau.");
  };

  /**
   * Submit lake changes
   * @param {Object} data data from controller
   */
  const onSubmit = (data) => {
    setIsLoading(true);
    const { id } = lakeDetail;
    const imageUrl = data.imageArray[0].base64;
    delete data.imageArray;
    const updateData = { ...data, imageUrl };
    editLakeDetail({ updateData, id })
      .then(() => {
        setIsLoading(false);
        showAlertAbsoluteBox(
          "Thông báo",
          "Chỉnh sửa thành công",
          navigateToLakeProfileScreen,
          "Xác nhận",
        );
      })
      .catch(handleError);
  };

  const handleCloseLake = (id) => () => {
    closeLakeByLakeId({ id })
      .then(() => {
        showToastMessage("Xóa hồ thành công");
        navigation.pop(2);
      })
      .catch(handleError);
  };

  const promptBeforeDelete = () => {
    const { name, id } = lakeDetail;
    showAlertConfirmBox(
      "Bạn muốn xóa hồ này?",
      `"${name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
      handleCloseLake(id),
    );
  };

  /**
   * Call fishing method list api
   */
  useEffect(() => {
    getFishingMethodList().then(() => {
      setValue("methods", methodValue);
      setIsLoading(false);
      setFullScreenMode(false);
    });
    const loadingId = setTimeout(() => {
      setIsLoading(false);
      setFullScreenMode(false);
    }, 10000);
    return () => {
      clearTimeout(loadingId);
    };
  }, []);

  /**
   * Fire when navigates back to the screen
   */
  useFocusEffect(
    // useCallback will listen to rsetIsLoading(false);
    useCallback(() => {
      if (route.params?.base64Array && route.params.base64Array[0]) {
        setValue("imageArray", route.params?.base64Array);
        navigation.setParams({ base64Array: [] });
      }
    }, [route.params]),
  );

  return (
    <>
      <HeaderTab name="Chỉnh sửa hồ bé" />
      <ScrollView>
        <Overlay
          isVisible={isLoading}
          fullScreen
          overlayStyle={
            fullScreenMode ? styles.loadOnStart : styles.loadOnSubmit
          }
        >
          <ActivityIndicator size={60} color="#2089DC" />
        </Overlay>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              {/* Image Picker section */}
              <MultiImageSection
                containerStyle={styles.sectionWrapper}
                formRoute={ROUTE_NAMES.FMANAGE_LAKE_EDIT}
                controllerName="imageArray"
              />
            </Center>

            <Center>
              <InputComponent
                myStyles={styles.sectionWrapper}
                label="Tên hồ câu"
                isTitle
                hasAsterisk
                placeholder="Nhập tên hồ câu"
                controllerName="name"
              />
            </Center>

            <Center>
              <CheckboxSelectorComponent
                myStyles={styles.sectionWrapper}
                placeholder="Chọn loại hình câu"
                data={fishingMethodList}
                controllerName="methods"
                label="Loại hình câu"
                hasAsterisk
                isTitle
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Giá vé"
                isTitle
                hasAsterisk
                placeholder="Miêu tả giá vé hồ"
                numberOfLines={6}
                controllerName="price"
              />
            </Center>

            <Center>
              <VStack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Thông số
                </Text>
                <InputComponent
                  hasAsterisk
                  label="Chiều dài (m)"
                  placeholder="Nhập chiều dài của hồ"
                  controllerName="length"
                  useNumPad
                />
                <InputComponent
                  hasAsterisk
                  label="Chiều rộng (m)"
                  placeholder="Nhập chiều rộng của hồ"
                  controllerName="width"
                  useNumPad
                />
                <InputComponent
                  hasAsterisk
                  label="Độ sâu (m)"
                  placeholder="Nhập độ sâu của hồ"
                  controllerName="depth"
                  useNumPad
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
                  onPress={promptBeforeDelete}
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
