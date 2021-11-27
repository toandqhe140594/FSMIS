import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Checkbox } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import { DICTIONARY } from "../../constants";
import FieldWatcherResetter from "../common/FieldWatcherResetter";
import InputComponent from "../common/InputComponent";
import SelectComponent from "../common/SelectComponent";
import DependentFieldWatcher from "./DependentFieldWatcher";

const FishIcon = () => (
  <FontAwesome5
    style={{ marginHorizontal: 8 }}
    name="fish"
    size={24}
    color="black"
  />
);

const WeightIcon = () => (
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
    alignItems: "center",
    marginVertical: 8,
  },
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
  hint: {
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 12,
    alignSelf: "center",
  },
});

const CatchReportSection = ({ fishList }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD,
    shouldUnregister: true,
  });
  const handleAppend = () => {
    append({ fishSpeciesId: 0, weight: 0, quantity: 0 });
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
      {/* fields controls each object with field fishType, catches, totalWeight and isReleased */}
      {fields.map(({ id }, index) => (
        <View style={styles.cardWrapper} key={id}>
          <SelectComponent
            myStyles={{ marginBottom: 8 }}
            data={fishList}
            itemKeyIdentifier={DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_IN_LAKE}
            placeholder={DICTIONARY.SELECT_CATCH_REPORT_SPECIES_PLACEHOLDER}
            controllerName={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_IN_LAKE}`}
            useCustomError
            myError={
              errors[DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD]?.[index]?.[
                DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_IN_LAKE
              ]
            }
          />
          <DependentFieldWatcher
            name={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_IN_LAKE}`}
            dependentField={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_FISH_SPECIES}`}
            data={fishList}
          />
          <Text style={styles.hint}>
            Lưu ý: Chỉ cần nhập một trong hai trường dưới đây
          </Text>
          <InputComponent
            useNumPad
            myStyles={{ marginBottom: 8 }}
            placeholder={DICTIONARY.INPUT_CATCH_REPORT_QUANTITY_PLACEHOLDER}
            leftIcon={<FishIcon />}
            controllerName={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_QUANTITY}`}
            useCustomError
            myError={
              errors[DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD]?.[index]?.[
                DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_QUANTITY
              ]
            }
          />
          <FieldWatcherResetter
            name={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_QUANTITY}`}
          />
          <InputComponent
            useNumPad
            placeholder={DICTIONARY.INPUT_CATCH_REPORT_WEIGHT_PLACEHOLDER}
            leftIcon={<WeightIcon />}
            controllerName={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_WEIGHT}`}
            useCustomError
            myError={
              errors[DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD]?.[index]?.[
                DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_WEIGHT
              ]
            }
          />
          <FieldWatcherResetter
            name={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_WEIGHT}`}
          />
          <View style={styles.rowWrapper}>
            <Controller
              name={`${DICTIONARY.FORM_FIELD_CATCH_REPORT_CARD}[${index}].${DICTIONARY.FORM_FIELD_CATCH_REPORT_FISH_RETURN_TO_OWNER}`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox value={value} onChange={onChange}>
                  <Text style={{ marginLeft: 12, fontSize: 16 }}>
                    Giao lại cho chủ hồ
                  </Text>
                </Checkbox>
              )}
            />
            <Button fontSize="md" w="40%" onPress={handleRemove(index)}>
              Xoá
            </Button>
          </View>
        </View>
      ))}
      <Button w="90%" mt={3} alignSelf="center" onPress={handleAppend}>
        Thêm thẻ
      </Button>
    </>
  );
};
CatchReportSection.propTypes = {
  fishList: PropTypes.arrayOf(PropTypes.object),
};

CatchReportSection.defaultProps = {
  fishList: [{}],
};
export default CatchReportSection;
