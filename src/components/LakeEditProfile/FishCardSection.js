import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Input, Select } from "native-base";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

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
    marginTop: 8,
  },
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
});

const FishCardSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fishInLakeList",
    // fishInLakeList will be unregistered when unmount
    shouldUnregister: true,
  });
  /**
   * Append a card ready to use
   */
  useEffect(() => {
    const initCard = () => append({});
    initCard();
  }, []);
  return (
    <>
      {/* fields controls each object with field fishSpeciesId, quantity, totalWeight and isReleased */}
      {fields.map(({ id }, index) => (
        <View style={styles.cardWrapper} key={id}>
          <Controller
            name={`fishInLakeList[${index}].fishSpeciesId`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                mt={2}
                fontSize="md"
                placeholder="Chọn loại cá"
                onValueChange={onChange}
                selectedValue={value}
              >
                <Select.Item label="Cá diếc" value={6} />
                <Select.Item label="Cá chép" value={7} />
              </Select>
            )}
          />
          {/* Check error message of fishSpeciesId field of a specific object in the fieldArray */}
          {errors.fishInLakeList?.[index]?.fishSpeciesId?.message && (
            <Text style={styles.error}>
              {errors?.fishInLakeList?.[index].fishSpeciesId?.message}
            </Text>
          )}
          <View style={styles.rowWrapper}>
            <Controller
              name={`fishInLakeList[${index}].minWeight`}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  w="48%"
                  type="number"
                  fontSize="md"
                  placeholder="Min"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="number-pad"
                  InputLeftElement={
                    <Text
                      style={{
                        marginLeft: 12,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Biểu
                    </Text>
                  }
                />
              )}
            />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>-</Text>
            <Controller
              name={`fishInLakeList[${index}].maxWeight`}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  w="48%"
                  type="text"
                  fontSize="md"
                  placeholder="Max"
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  InputLeftElement={
                    <Text
                      style={{
                        marginLeft: 12,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Biểu
                    </Text>
                  }
                />
              )}
            />
          </View>
          {(errors.fishInLakeList?.[index]?.minWeight?.message ||
            errors.fishInLakeList?.[index]?.maxWeight?.message) && (
            <Text style={styles.error}>
              {errors?.fishInLakeList?.[index].minWeight?.message}{" "}
              {errors?.fishInLakeList?.[index].maxWeight?.message}
            </Text>
          )}
          <Controller
            name={`fishInLakeList[${index}].quantity`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                mt={2}
                type="text"
                fontSize="md"
                placeholder="Nhập số con thả hồ"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="number-pad"
                InputLeftElement={
                  <FontAwesome5
                    style={{ marginLeft: 12 }}
                    name="fish"
                    size={24}
                    color="black"
                  />
                }
              />
            )}
          />
          {/* Check error message of quantity feld of a specific object in the fieldArray */}
          {errors.fishInLakeList?.[index]?.quantity?.message && (
            <Text style={styles.error}>
              {errors.fishInLakeList?.[index].quantity?.message}
            </Text>
          )}
          <Controller
            name={`fishInLakeList[${index}].totalWeight`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                mt={2}
                type="text"
                fontSize="md"
                placeholder="Nhập tổng cân nặng (kg)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="number-pad"
                InputLeftElement={
                  <MaterialCommunityIcons
                    style={{ marginLeft: 12 }}
                    name="weight-kilogram"
                    size={28}
                    color="#262626"
                  />
                }
              />
            )}
          />
          {/* Check error message of totalWeight field of a specific object in the fieldArray */}
          {errors.fishInLakeList?.[index]?.totalWeight?.message && (
            <Text style={styles.error}>
              {errors.fishInLakeList?.[index].totalWeight?.message}
            </Text>
          )}
          <Button
            fontSize="md"
            w="45%"
            mt={2}
            alignSelf="flex-end"
            onPress={() => remove(index)}
          >
            Xoá
          </Button>
        </View>
      ))}
      <Button w="90%" mt={3} alignSelf="center" onPress={() => append({})}>
        Thêm thẻ
      </Button>
    </>
  );
};

export default FishCardSection;
