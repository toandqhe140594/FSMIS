import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useStoreState } from "easy-peasy";
import { Button } from "native-base";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { DICTIONARY } from "../../constants";
import FieldWatcherResetter from "../common/FieldWatcherResetter";
import InputComponent from "../common/InputComponent";
import SelectComponent from "../common/SelectComponent";

const FishLeftIcon = () => (
  <FontAwesome5
    style={{ marginHorizontal: 8 }}
    name="fish"
    size={24}
    color="black"
  />
);

const WeightLeftIcon = () => (
  <MaterialCommunityIcons
    style={{ marginHorizontal: 8 }}
    name="weight-kilogram"
    size={28}
    color="#262626"
  />
);

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  leftIconText: { marginHorizontal: 8, fontSize: 12, fontWeight: "bold" },
  hint: {
    fontStyle: "italic",
    fontSize: 12,
    marginVertical: 6,
    alignSelf: "center",
  },
});

const FishCardSection = () => {
  const { fishList } = useStoreState((state) => state.FishModel);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: DICTIONARY.FORM_FIELD_FISH_CARD,
    shouldUnregister: true,
  });
  const handleAppend = () => {
    append({
      [DICTIONARY.SELECT_FISH_CARD_QUANTITY_PLACEHOLDER]: 0,
      [DICTIONARY.FORM_FIELD_FISH_TOTAL_WEIGHT]: 0,
    });
  };
  const handleRemove = (index) => () => {
    remove(index);
  };
  /**
   * Append a card ready to use
   */
  useEffect(() => {
    handleAppend();
  }, []);
  return (
    <>
      {/* fields controls each object with field fishSpeciesId, quantity, totalWeight and isReleased */}
      {fields.map(({ id }, index) => (
        <View style={styles.cardWrapper} key={id}>
          <SelectComponent
            placeholder={DICTIONARY.SELECT_FISH_CARD_FISH_SPECIES_PLACEHOLDER}
            data={fishList}
            controllerName={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_SPECIES}`}
            useCustomError
            myError={
              errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.[index]?.[
                DICTIONARY.FORM_FIELD_FISH_SPECIES
              ]
            }
          />
          <View style={styles.rowWrapper}>
            <InputComponent
              myStyles={{ width: "48%" }}
              useNumPad
              placeholder={DICTIONARY.SELECT_FISH_CARD_MIN_WEIGHT_PLACEHOLDER}
              leftIcon={<Text style={styles.leftIconText}>Biểu</Text>}
              controllerName={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_MIN_WEIGHT}`}
              useCustomError
              myError={
                errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.[index]?.[
                  DICTIONARY.FORM_FIELD_FISH_MIN_WEIGHT
                ]
              }
            />
            <InputComponent
              myStyles={{ width: "49%" }}
              useNumPad
              placeholder={DICTIONARY.SELECT_FISH_CARD_MAX_WEIGHT_PLACEHOLDER}
              leftIcon={<Text style={styles.leftIconText}>Biểu</Text>}
              controllerName={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_MAX_WEIGHT}`}
              useCustomError
              myError={
                errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.[index]?.[
                  DICTIONARY.FORM_FIELD_FISH_MAX_WEIGHT
                ]
              }
            />
          </View>
          <Text style={styles.hint}>
            Lưu ý: Chỉ cần nhập một trong hai trường dưới đây
          </Text>
          <InputComponent
            myStyles={{ marginBottom: 8 }}
            useNumPad
            placeholder={DICTIONARY.SELECT_FISH_CARD_QUANTITY_PLACEHOLDER}
            leftIcon={<FishLeftIcon />}
            controllerName={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_QUANTITY}`}
            useCustomError
            myError={
              errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.[index]?.[
                DICTIONARY.FORM_FIELD_FISH_QUANTITY
              ]
            }
          />
          <FieldWatcherResetter
            name={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_QUANTITY}`}
          />
          <InputComponent
            useNumPad
            placeholder={DICTIONARY.SELECT_FISH_CARD_TOTAL_WEIGHT_PLACEHOLDER}
            leftIcon={<WeightLeftIcon />}
            controllerName={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_TOTAL_WEIGHT}`}
            useCustomError
            myError={
              errors[DICTIONARY.FORM_FIELD_FISH_CARD]?.[index]?.[
                DICTIONARY.FORM_FIELD_FISH_TOTAL_WEIGHT
              ]
            }
          />
          <FieldWatcherResetter
            name={`${DICTIONARY.FORM_FIELD_FISH_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_TOTAL_WEIGHT}`}
          />
          <Button
            fontSize="md"
            w="45%"
            mt={2}
            alignSelf="flex-end"
            onPress={handleRemove(index)}
          >
            Xoá
          </Button>
        </View>
      ))}
      <Button w="90%" mt={3} alignSelf="center" onPress={handleAppend}>
        Thêm thẻ
      </Button>
    </>
  );
};

export default FishCardSection;
