// To install uuid, installs react-native-random-value pkg first
import "react-native-get-random-values";

import { yupResolver } from "@hookform/resolvers/yup";
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
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import InputComponent from "../components/common/InputComponent";
import SingleImageSection from "../components/common/SingleImageSection";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";
import AddFishCard from "../components/LakeEditProfile/AddFishCard";
import CheckboxSelectorComponent from "../components/LakeEditProfile/CheckboxSelectorComponent";

const validationSchema = yup.object().shape({
  lakeName: yup.string().required("Tên hồ không thể bỏ trống"),
  lakeDescription: yup.string().required("Miêu tả giá vé ở hồ này"),
  lakeLength: yup.string().required("Chiều dài hồ không được để trống"),
  lakeWidth: yup.string().required("Chiều rộng hồ không được để trống"),
  lakeDepth: yup.string().required("Độ sâu của hồ không được để trống"),
});

const fishingMethodData = ["Câu đài", "Câu đơn", "Câu lục"];

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const LakeEditProfileScreen = () => {
  const initFishCard = {
    id: uuidv4(),
    fish: "",
    weightDescription: "",
    amount: "",
    totalWeight: "",
  };
  const [cardList, setCardList] = useState([initFishCard]);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    // Test submit
    console.log(data);
    console.log(cardList);
  };

  const addCard = () => {
    const newCard = initFishCard;
    setCardList((prev) => [...prev, newCard]);
  };
  const deleteCard = (id) => {
    const newCardList = cardList.filter((card) => card.id !== id);
    setCardList(newCardList);
  };
  const updateCard = (id, name, value) => {
    const newCardList = cardList.map((card) => {
      if (card.id === id) {
        return { ...card, [name]: value };
      }
      return card;
    });
    setCardList(newCardList);
  };

  return (
    <>
      <HeaderTab name="Chỉnh sửa hồ bé" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center mt={1}>
              {/* Image Picker section */}
              <SingleImageSection myStyles={styles.sectionWrapper} />
            </Center>

            <Center>
              <InputComponent
                myStyles={styles.sectionWrapper}
                label="Tên hồ câu"
                isTitle
                placeholder="Nhập tên hồ câu"
                controllerName="lakeName"
              />
            </Center>

            <Center>
              <CheckboxSelectorComponent
                myStyle={styles.sectionWrapper}
                label="Loại hình câu"
                isTitle
                placeholder="Chọn loại hình câu"
                data={fishingMethodData}
              />
            </Center>

            <Center>
              <TextAreaComponent
                myStyles={styles.sectionWrapper}
                label="Giá vé"
                isTitle
                placeholder="Miêu tả giá vé hồ"
                numberOfLines={3}
                controllerName="lakeDescription"
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
                  controllerName="lakeLength"
                />
                <InputComponent
                  label="Chiều rộng (m)"
                  placeholder="Nhập chiều rộng của hồ"
                  controllerName="lakeWidth"
                />
                <InputComponent
                  label="Độ sâu (m)"
                  placeholder="Nhập độ sâu của hồ"
                  controllerName="lakeDepth"
                />
              </VStack>
            </Center>

            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                <Text fontSize="md" bold>
                  Các loại cá
                </Text>
                <VStack mb={1}>
                  {cardList.map((card) => (
                    <AddFishCard
                      key={card.id}
                      id={card.id}
                      deleteCard={deleteCard}
                      updateCard={updateCard}
                    />
                  ))}
                </VStack>
                <Button
                  style={styles.button}
                  alignSelf="center"
                  onPress={addCard}
                >
                  Thêm loại cá
                </Button>
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
                  Lưu thông tin hồ câu
                </Button>
                <Button
                  style={styles.button}
                  variant="outline"
                  alignSelf="center"
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
