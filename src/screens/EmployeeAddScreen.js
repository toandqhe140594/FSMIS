import { Button, Center } from "native-base";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";

const EmployeeAddScreen = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  return (
    <>
      <HeaderTab name="Thêm nhân viên" />
      <Center flex={1} alignItems="center">
        <Center w="100%">
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{
              width: "100%",
              marginTop: 12,
              backgroundColor: "white",
              paddingHorizontal: 12,
            }}
            lightTheme
            blurOnSubmit
            keyboardType="phone-pad"
            onEndEditing={() => {
              console.log("end edit");
            }}
          />
        </Center>
        <EmployeeDetailBox
          name="Đào Quốc Toản"
          dob="15/10/2021"
          phoneNumber="098764434"
          gender
          address="Số 1 hồ Hoàng Kiếm Việt Nam Hà Nội Châu Á"
        />

        <Center w="70%" bg="lightBlue.100" mb={5}>
          <Button w="100%">Thêm nhân viên</Button>
        </Center>
      </Center>
    </>
  );
};

export default EmployeeAddScreen;
