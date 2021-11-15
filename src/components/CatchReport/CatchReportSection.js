import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Checkbox } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

import InputComponent from "../common/InputComponent";
import SelectComponent from "../common/SelectComponent";

const FishIcon = () => (
  <FontAwesome5
    style={{ marginLeft: 12 }}
    name="fish"
    size={24}
    color="black"
  />
);

const WeightIcon = () => (
  <MaterialCommunityIcons
    style={{ marginLeft: 12 }}
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
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
});

const CatchReportSection = ({ fishList }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "catchesDetailList",
    // catchesDetailList will be unregistered when unmount
    shouldUnregister: true,
  });
  const handleAppend = () => {
    append({
      fishSpeciesId: 1,
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
      {/* fields controls each object with field fishType, catches, totalWeight and isReleased */}
      {fields.map(({ id }, index) => (
        <View style={styles.cardWrapper} key={id}>
          <SelectComponent
            myStyles={{ marginBottom: 8 }}
            data={fishList}
            itemKeyIdentifier="fishInLakeId"
            placeholder="Chọn loại cá bắt được"
            controllerName={`catchesDetailList[${index}].fishSpeciesId`}
            useCustomError
            myError={errors.catchesDetailList?.[index]?.fishSpeciesId}
          />
          <InputComponent
            myStyles={{ marginBottom: 8 }}
            placeholder="Nhập số con bắt được"
            leftIcon={<FishIcon />}
            controllerName={`catchesDetailList[${index}].quantity`}
            useCustomError
            myError={errors.catchesDetailList?.[index]?.quantity}
          />
          <InputComponent
            placeholder="Nhập cân nặng bắt được (kg)"
            leftIcon={<WeightIcon />}
            controllerName={`catchesDetailList[${index}].weight`}
            useCustomError
            myError={errors.catchesDetailList?.[index]?.weight}
          />
          <View style={styles.rowWrapper}>
            <Controller
              name={`catchesDetailList[${index}].returnToOwner`}
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
