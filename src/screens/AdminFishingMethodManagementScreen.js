import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Divider, SearchBar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import { goToAdminFishingMethodEditScreen } from "../navigations";

const fishList = [
  {
    id: 1,
    name: "Câu đơn",
  },
  {
    id: 2,
    name: "Câu đài",
  },
  {
    id: 3,
    name: "Câu lăng xê",
  },
];

const FishingMethodManagementCard = ({ id, name }) => {
  const navigation = useNavigation();
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      py={2}
      px={3}
    >
      <Box flex={1} justifyContent="center" pr={1}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={2}>
          {name}
        </Text>
      </Box>
      <Box w="35%" alignItems="flex-end">
        <Button.Group>
          <Button
            onPress={() => {
              goToAdminFishingMethodEditScreen(navigation, { id, name });
            }}
          >
            Chỉnh sửa
          </Button>
          <Button>Xóa</Button>
        </Button.Group>
      </Box>
    </Box>
  );
};

FishingMethodManagementCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const AdminFishingMethodManagementScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  return (
    <>
      <HeaderTab name="Quản lý loại hình câu" />
      <Center flex={1} alignItems="center">
        <Box w="100%" alignItems="center" flex={1}>
          <SearchBar
            placeholder="Tìm kiếm theo tên"
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
            onEndEditing={() => {
              console.log("end edit", search); // Test only
            }}
          />
          <Button
            my={2}
            w="70%"
            onPress={() => {
              goToAdminFishingMethodEditScreen(navigation, {
                id: null,
                name: null,
              });
            }}
          >
            Thêm loại hình câu
          </Button>

          <Box flex={1} w="100%">
            <FlatList
              data={fishList}
              renderItem={({ item }) => (
                <FishingMethodManagementCard id={item.id} name={item.name} />
              )}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={Divider}
            />
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default AdminFishingMethodManagementScreen;
