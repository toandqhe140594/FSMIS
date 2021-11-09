import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Divider } from "react-native-elements";

import EmployeeCard from "../components/EmployeeCard";
import HeaderTab from "../components/HeaderTab";
import { goToFManageAddStaffScreen } from "../navigations";

const FManageEmployeeManagementScreen = () => {
  const navigation = useNavigation();
  const listOfStaff = useStoreState(
    (states) => states.FManageModel.listOfStaff,
  );
  const getListOfStaff = useStoreActions(
    (actions) => actions.FManageModel.getListOfStaff,
  );
  const [displayedList, setDisplayedList] = useState(listOfStaff);

  useEffect(() => {
    getListOfStaff();
  }, []);

  useEffect(() => {
    setDisplayedList(listOfStaff);
  }, [listOfStaff]);

  return (
    <>
      <HeaderTab name="Quản lý nhân viên" />
      <Box flex={1} alignItems="center">
        <Center w="80%" my={5}>
          <Button
            onPress={() => {
              goToFManageAddStaffScreen(navigation);
            }}
          >
            Thêm nhân viên
          </Button>
        </Center>
        <Box flex={1} w="100%">
          <FlatList
            data={displayedList}
            renderItem={({ item }) => {
              const { id, name, phone, avatar } = item;
              return (
                <EmployeeCard
                  employee={{
                    id,
                    name,
                    phoneNumber: phone,
                    image: avatar,
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
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
