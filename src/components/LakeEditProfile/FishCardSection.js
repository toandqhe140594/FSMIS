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
    name: "cards",
    // Cards will be unregistered when unmount
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
      {/* fields controls each object with field fishType, amount, totalWeight and isReleased */}
      {fields.map(({ id }, index) => (
        <View style={styles.cardWrapper} key={id}>
          <Controller
            name={`cards[${index}].fishType`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                mt={2}
                fontSize="md"
                placeholder="Chọn loại cá"
                onValueChange={onChange}
                selectedValue={value}
              >
                <Select.Item label="Cá diếc" value={1} />
                <Select.Item label="Cá chép" value={2} />
              </Select>
            )}
          />
          {/* Check error message of fishType field of a specific object in the fieldArray */}
          {errors.cards?.[index]?.fishType?.message && (
            <Text style={styles.error}>
              {errors?.cards?.[index].fishType?.message}
            </Text>
          )}
          <View style={styles.rowWrapper}>
            <Controller
              name={`cards[${index}].minWeight`}
              control={control}
              render={() => (
                <Input
                  w="48%"
                  fontSize="md"
                  placeholder="Biểu nhỏ nhất"
                  keyboardType="number-pad"
                />
              )}
            />
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>-</Text>
            <Controller
              name={`cards[${index}].maxWeight`}
              control={control}
              render={() => (
                <Input
                  w="48%"
                  fontSize="md"
                  placeholder="Biểu lớn nhất"
                  keyboardType="number-pad"
                />
              )}
            />
          </View>
          {(errors.cards?.[index]?.minWeight?.message && (
            <Text style={styles.error}>
              {errors?.cards?.[index].minWeight?.message}
            </Text>
          )) ||
            (errors.cards?.[index]?.maxWeight?.message && (
              <Text style={styles.error}>
                {errors?.cards?.[index].maxWeight?.message}
              </Text>
            ))}
          <Controller
            name={`cards[${index}].amount`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                mt={2}
                fontSize="md"
                placeholder="Nhập số cá (con)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="number-pad"
              />
            )}
          />
          {/* Check error message of amount feld of a specific object in the fieldArray */}
          {errors.cards?.[index]?.amount?.message && (
            <Text style={styles.error}>
              {errors.cards?.[index].amount?.message}
            </Text>
          )}
          <Controller
            name={`cards[${index}].totalWeight`}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                mt={2}
                fontSize="md"
                placeholder="Tổng cân nặng (kg)"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="number-pad"
              />
            )}
          />
          {/* Check error message of totalWeight field of a specific object in the fieldArray */}
          {errors.cards?.[index]?.totalWeight?.message && (
            <Text style={styles.error}>
              {errors.cards?.[index].totalWeight?.message}
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
