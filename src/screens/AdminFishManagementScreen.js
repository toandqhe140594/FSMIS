import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { Avatar, Divider, SearchBar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import FishModel from "../models/FishModel";
import { goToAdminFishEditScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FishModel", FishModel);

const FishManagementCard = ({ id, name, image }) => {
  const navigation = useNavigation();

  const showDeleteAlert = () => {
    Alert.alert(
      "Bạn muốn xóa loài cá này?",
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
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Box flex={1} flexDirection="row">
        <Avatar
          size="large"
          source={{
            uri: image,
          }}
          containerStyle={{ padding: 10, margin: 5 }}
          imageProps={{
            resizeMode: "contain",
          }}
        />
        <Box flex={1} justifyContent="center" pr={1}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={2}>
            {name}
          </Text>
        </Box>
      </Box>
      <Box w="35%" mx={2} alignItems="flex-end">
        <Button.Group>
          <Button
            onPress={() => {
              goToAdminFishEditScreen(navigation, { id, name, image });
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

FishManagementCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

FishManagementCard.defaultProps = {
  image: "https://picsum.photos/200",
};

const AdminFishManagementScreen = () => {
  const navigation = useNavigation();

  const fishList = useStoreState((states) => states.FishModel.fishList);
  const getFishList = useStoreActions(
    (actions) => actions.FishModel.getFishList,
  );

  const [search, setSearch] = useState("");
  const [displayedList, setDisplayedList] = useState(fishList);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onEndEdit = () => {
    if (!fishList) return;
    const filteredList = fishList.filter((fish) =>
      fish.name.toUpperCase().includes(search.toUpperCase()),
    );
    setDisplayedList(filteredList);
  };

  useFocusEffect(
    useCallback(() => {
      getFishList();
      return () => {};
    }, []),
  );

  useEffect(() => {
    setDisplayedList(fishList);
  }, [fishList]);

  return (
    <>
      <HeaderTab name="Quản lý loại cá" />
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
              onEndEdit();
            }}
            onClear={() => {
              setDisplayedList(fishList);
            }}
          />
          <Button
            my={2}
            w="70%"
            onPress={() => {
              goToAdminFishEditScreen(navigation, { id: null });
            }}
          >
            Thêm loại cá
          </Button>

          <Box flex={1} w="100%">
            <FlatList
              data={displayedList}
              renderItem={({ item }) => (
                <FishManagementCard
                  id={item.id}
                  name={item.name}
                  image={item.image}
                />
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

export default AdminFishManagementScreen;
