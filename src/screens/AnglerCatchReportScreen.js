import "react-native-get-random-values";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Divider,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";

import CatchReportCard from "../components/CatchReport/CatchReportCard";
import MultiImageSection from "../components/common/MultiImageSection";
import SelectComponent from "../components/common/SelectComponent";
import TextAreaComponent from "../components/common/TextAreaComponent";
import HeaderTab from "../components/HeaderTab";

const validationSchema = yup.object().shape({
  aCaption: yup.string().required("Họ và tên không thể bỏ trống"),
  aLakeType: yup.number().required("Loại hồ không được để trống"),
  isPublic: yup.bool(),
});

const styles = StyleSheet.create({
  sectionWrapper: {
    width: "90%",
  },
  button: {
    width: "90%",
  },
});

const AnglerCatchReportScreen = () => {
  const initCatchCard = {
    id: uuidv4(),
    fishType: "",
    catches: "",
    totalWeight: "",
    isReleased: false,
  };
  const [cardList, setCardList] = useState([initCatchCard]);
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const { control, handleSubmit } = methods;
  const onSubmit = (data) => {
    console.log(data);
    console.log(cardList);
  };
  const addCard = () => {
    const newCard = initCatchCard;
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
      <HeaderTab name="Báo cá" />
      <ScrollView>
        <FormProvider {...methods}>
          <VStack space={3} divider={<Divider />}>
            <Center>
              <Stack space={2} style={styles.sectionWrapper}>
                {/* Impage picker section */}
                <MultiImageSection imageLimit={3} />
                {/* Textarea input field */}
                <TextAreaComponent
                  placeholder="Mô tả ngày câu của bạn"
                  numberOfLines={6}
                  controllerName="aCaption"
                />
              </Stack>
            </Center>

            <Center>
              <SelectComponent
                myStyle={styles.sectionWrapper}
                isTitle
                label="Vị trí hồ câu"
                placeholder="Chọn hồ câu"
                data={[
                  { label: "Hồ thường", val: 1 },
                  { label: "Hồ VIP", val: 2 },
                ]}
                controllerName="aLakeType"
              />
            </Center>

            <Center>
              <Stack style={styles.sectionWrapper} space={2}>
                <Text bold fontSize="md">
                  Thông tin cá
                </Text>
                {/* Catch Report card list */}
                <VStack mb={1}>
                  {cardList.map((card) => (
                    <CatchReportCard
                      key={card.id}
                      id={card.id}
                      deleteCard={deleteCard}
                      updateCard={updateCard}
                    />
                  ))}
                </VStack>
                {/* Add catch report card button */}
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
                {/* Public checkbox field */}
                <Controller
                  control={control}
                  name="isPublic"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      mb={1}
                      alignItems="flex-start"
                      isChecked={value}
                      onChange={onChange}
                    >
                      Công khai thông tin
                    </Checkbox>
                  )}
                />
                {/* Submit button */}
                <Button
                  style={styles.button}
                  alignSelf="center"
                  onPress={handleSubmit(onSubmit)}
                >
                  Gửi và checkout
                </Button>
              </Box>
            </Center>
          </VStack>
        </FormProvider>
      </ScrollView>
    </>
  );
};

export default AnglerCatchReportScreen;
