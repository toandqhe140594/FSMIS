import { Button, Checkbox, Input, Select } from "native-base";
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
    marginVertical: 8,
  },
  error: { color: "#f43f5e", fontSize: 12, fontStyle: "italic" },
});

const CatchReportSection = () => {
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
      {/* fields controls each object with field fishType, catches, totalWeight and isReleased */}
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
                <Select.Item label="Cá diếc" value={6} />
                <Select.Item label="Cá chép" value={8} />
              </Select>
            )}
          />
          {/* Check error message of fishType field of a specific object in the fieldArray */}
          {errors.cards?.[index]?.fishType?.message && (
            <Text style={styles.error}>
              {errors?.cards?.[index].fishType?.message}
            </Text>
          )}
          <Controller
            name={`cards[${index}].catches`}
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
          {/* Check error message of catches feld of a specific object in the fieldArray */}
          {errors.cards?.[index]?.catches?.message && (
            <Text style={styles.error}>
              {errors.cards?.[index].catches?.message}
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
                keyboardType="decimal-pad"
              />
            )}
          />
          {/* Check error message of totalWeight field of a specific object in the fieldArray */}
          {errors.cards?.[index]?.totalWeight?.message && (
            <Text style={styles.error}>
              {errors.cards?.[index].totalWeight?.message}
            </Text>
          )}
          <View style={styles.rowWrapper}>
            <Controller
              name={`cards[${index}].isReleased`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox value={value} onChange={onChange}>
                  <Text style={{ marginLeft: 10, fontSize: 16 }}>
                    Giao lại cho chủ hồ
                  </Text>
                </Checkbox>
              )}
            />
            <Button fontSize="md" w="40%" onPress={() => remove(index)}>
              Xoá
            </Button>
          </View>
        </View>
      ))}
      <Button w="90%" mt={3} alignSelf="center" onPress={() => append({})}>
        Thêm thẻ
      </Button>
    </>
  );
};

export default CatchReportSection;
