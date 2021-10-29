import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import { Divider, SearchBar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import FishingMethodModel from "../models/FishingMethodModel";
import { goToAdminFishingMethodEditScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FishingMethodModel", FishingMethodModel);

const FishingMethodManagementCard = ({ id, name }) => {
  const navigation = useNavigation();

  const showDeleteAlert = () => {
    Alert.alert(
      "Bạn muốn xóa loại hình câu này?",
      `"${name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: async () => {},
        },
      ],
    );
  };

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
          <Button
            onPress={() => {
              showDeleteAlert();
            }}
          >
            Xóa
          </Button>
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

  const fishingMethodList = useStoreState(
    (states) => states.FishingMethodModel.fishingMethodList,
  );
  const getFishingMethodList = useStoreActions(
    (actions) => actions.FishingMethodModel.getFishingMethodList,
  );

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(fishingMethodList);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onClear = () => {
    setDisplayedList(fishingMethodList);
  };

  const onEndEditing = () => {
    // If the list is empty
    if (!fishingMethodList) return;
    // Filter all element in the data list whose name includes search key
    const filteredList = fishingMethodList.filter((method) =>
      method.name.toUpperCase().includes(search.toUpperCase()),
    );
    setDisplayedList(filteredList);
  };

  useEffect(() => {
    getFishingMethodList();
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Test
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    setDisplayedList(fishingMethodList);
    if (fishingMethodList) setIsLoading(false);
  }, [fishingMethodList]);

  if (isLoading)
    return (
      <Center flex={1}>
        <ActivityIndicator size="large" color="blue" />
      </Center>
    );

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
            onEndEditing={onEndEditing}
            onClear={onClear}
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
              data={displayedList}
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
