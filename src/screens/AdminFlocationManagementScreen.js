import { Select } from "native-base";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import InputComponent from "../components/common/InputComponent";
import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";

const styles = StyleSheet.create({
  wrapper: { width: "90%", marginTop: 12 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  card: {
    marginTop: 8,
  },
});

const APIList = [
  {
    id: "spot1",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot2",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot3",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: false,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot4",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot5",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: false,
    name: "Ho cau thuan viet",
    rate: 4,
  },
];

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Pressable onPress={() => {}}>
      <FLocationCard {...item} showImage={false} />
    </Pressable>
  </View>
);

const AdminFlocationManagementScreen = () => {
  const [fLocationList, setFLocationList] = useState(APIList);
  const [filter, setFilter] = useState("Tất cả");
  const methods = useForm();
  useEffect(() => {
    const getFilteredList = () => {
      switch (filter) {
        case "Tất cả":
          return APIList;
        case "Chưa xác thực":
          return APIList.filter(({ isVerifed }) => !isVerifed);
        case "Đã xác thực":
          return APIList.filter(({ isVerifed }) => isVerifed);
        default:
          return fLocationList;
      }
    };
    setFLocationList(getFilteredList());
  }, [filter]);
  return (
    <>
      <HeaderTab name="Quản lý xác thực Điểm câu" />
      <View style={styles.center}>
        <FormProvider {...methods}>
          <InputComponent
            myStyles={styles.wrapper}
            placeholder="Tìm kiếm theo tên hồ"
            controllerName="fLocationName"
          />
        </FormProvider>
        <View style={styles.wrapper}>
          <Select
            placeholder="Lọc danh sách"
            fontSize="md"
            onValueChange={setFilter}
            value={filter}
          >
            <Select.Item label="Tất cả" value="Tất cả" />
            <Select.Item label="Chưa xác thực" value="Chưa xác thực" />
            <Select.Item label="Đã xác thực" value="Đã xác thực" />
          </Select>
        </View>
        <FlatList
          style={styles.wrapper}
          data={fLocationList}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default AdminFlocationManagementScreen;
