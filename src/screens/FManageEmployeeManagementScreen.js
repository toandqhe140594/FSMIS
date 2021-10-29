import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EmployeeCard from "../components/EmployeeCard";
import HeaderTab from "../components/HeaderTab";
import { goToFManageAddStaff } from "../navigations";

const FManageEmployeeManagementScreen = () => {
  const navigation = useNavigation();
  const listOfEmployees = useStoreState(
    (actions) => actions.FManageModel.listOfStaff,
  );
  const [employeeListData, setEmployeeListData] = useState(listOfEmployees);
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
          <Button
            onPress={() => {
              goToFManageAddStaff(navigation);
            }}
          >
            Thêm nhân viên
          </Button>
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

export default FManageEmployeeManagementScreen;
