import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useStoreState } from "easy-peasy";
import { Button } from "native-base";
import React, { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

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
    name: "fishInLakeList",
    shouldUnregister: true,
  });
  const handleAppend = () => {
    append({
      quantity: 0,
      totalWeight: 0,
    });
  };
  const handleRemove = (index) => {
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
            placeholder="Chọn loại cá"
            data={fishList}
            controllerName={`fishInLakeList[${index}].fishSpeciesId`}
            useCustomError
            myError={errors.fishInLakeList?.[index]?.fishSpeciesId}
          />
          <View style={styles.rowWrapper}>
            <InputComponent
              myStyles={{ width: "48%" }}
              useNumPad
              placeholder="Min"
              leftIcon={<Text style={styles.leftIconText}>Biểu</Text>}
              controllerName={`fishInLakeList[${index}].minWeight`}
              useCustomError
              myError={errors.fishInLakeList?.[index]?.minWeight}
            />
            <InputComponent
              myStyles={{ width: "49%" }}
              useNumPad
              placeholder="Max"
              leftIcon={<Text style={styles.leftIconText}>Biểu</Text>}
              controllerName={`fishInLakeList[${index}].maxWeight`}
              useCustomError
              myError={errors.fishInLakeList?.[index]?.maxWeight}
            />
          </View>
          <Text style={styles.hint}>
            Lưu ý: Chỉ cần nhập một trong hai trường dưới đây
          </Text>
          <InputComponent
            myStyles={{ marginBottom: 8 }}
            useNumPad
            placeholder="Nhập số con thả hồ"
            leftIcon={<FishLeftIcon />}
            controllerName={`fishInLakeList[${index}].quantity`}
            useCustomError
            myError={errors.fishInLakeList?.[index]?.quantity}
          />
          <FieldWatcherResetter name={`fishInLakeList[${index}].quantity`} />
          <InputComponent
            useNumPad
            placeholder="Nhập tổng cân nặng (kg)"
            leftIcon={<WeightLeftIcon />}
            controllerName={`fishInLakeList[${index}].totalWeight`}
            useCustomError
            myError={errors.fishInLakeList?.[index]?.totalWeight}
          />
          <FieldWatcherResetter name={`fishInLakeList[${index}].totalWeight`} />
          <Button
            fontSize="md"
            w="45%"
            mt={2}
            alignSelf="flex-end"
            onPress={() => handleRemove(index)}
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
