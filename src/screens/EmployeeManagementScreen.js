import { Box, Button, Center } from "native-base";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EmployeeCard from "../components/EmployeeCard";
import HeaderTab from "../components/HeaderTab";

const data = [
  {
    id: "1",
    name: "Đào Quốc Toản",
    phoneNumber: "098765432",
  },
  {
    id: "2",
    name: "Nguyễn Đình Đạt",
    phoneNumber: "098765432",
    image: "https://picsum.photos/200",
  },
  {
    id: "3",
    name: "Nguyễn Hoàng Đức32323dsdsdsdsdsabcd",
    phoneNumber: "098765432",
    image: "https://picsum.photos/200",
  },
];

const EmployeeManagementScreen = () => {
  const [employeeListData, setEmployeeListData] = useState(data);
  const deleteEmployee = (id) => {
    setEmployeeListData(
      employeeListData.filter((employee) => employee.id !== id),
    );
  };
  return (
    <>
      <HeaderTab name="Quản lý nhân viên" />
      <Box flex={1} alignItems="center">
        <Center w="80%" my={5}>
          <Button>Thêm nhân viên</Button>
        </Center>
        <Box flex={1} w="100%">
          <FlatList
            data={employeeListData}
            renderItem={({ item }) => (
              <EmployeeCard employee={item} deleteEmployee={deleteEmployee} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Divider}
            ListHeaderComponent={Divider}
            ListFooterComponent={Divider}
          />
        </Box>
      </Box>
    </>
  );
};

export default EmployeeManagementScreen;
