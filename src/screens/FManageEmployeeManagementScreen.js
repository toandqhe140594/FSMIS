import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text } from "react-native";
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

  const memoizedStyle = useMemo(
    () =>
      listOfStaff && listOfStaff.length > 0
        ? null
        : { flex: 1, justifyContent: "center" },
    [listOfStaff && listOfStaff.length > 0],
  );

  const navigateToAddStaffScreen = () => {
    goToFManageAddStaffScreen(navigation);
  };

  const renderItem = ({ item }) => {
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
  };

  const renderEmpty = () => (
    <Text style={{ color: "gray", alignSelf: "center" }}>
      Điểm câu chưa có nhân viên
    </Text>
  );

  const keyExtractor = (item) => item.id.toString();

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
        <Center w="80%" my={3}>
          <Button onPress={navigateToAddStaffScreen}>Thêm nhân viên</Button>
        </Center>
        <FlatList
          style={{ width: "100%" }}
          data={displayedList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Divider}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={memoizedStyle}
        />
      </Box>
    </>
  );
};

export default FManageEmployeeManagementScreen;
