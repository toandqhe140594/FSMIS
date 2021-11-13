import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { Avatar, Divider, SearchBar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import styles from "../config/styles";
import FishModel from "../models/FishModel";
import { goToAdminFishEditScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";
import store from "../utilities/Store";

store.addModel("FishModel", FishModel);

const FishManagementCard = ({ id, name, image }) => {
  const navigation = useNavigation();

  const deleteFish = useStoreActions((actions) => actions.FishModel.deleteFish);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const showDeleteAlert = () => {
    showAlertConfirmBox(
      "Bạn muốn xóa loài cá này?",
      `"${name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
      () => {
        setDeleteLoading(true);
      },
    );
  };

  useEffect(() => {
    return () => {
      if (deleteSuccess) {
        showToastMessage("Xóa thành công");
      }
    };
  }, []);

  useEffect(() => {
    if (deleteLoading === true) deleteFish({ id, setDeleteSuccess });
  }, [deleteLoading]);

  useEffect(() => {
    if (deleteSuccess === false) {
      showToastMessage("Xóa thất bại");
    }
    setDeleteLoading(false);
    setDeleteSuccess(null);
  }, [deleteSuccess]);

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
            isDisabled={deleteLoading}
          >
            Chỉnh sửa
          </Button>
          <Button
            onPress={() => {
              showDeleteAlert();
            }}
            isLoading={deleteLoading}
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
  const [isLoading, setIsLoading] = useState(true);
  const [displayedList, setDisplayedList] = useState(fishList);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onClear = () => {
    setDisplayedList(fishList);
  };

  const onEndEditing = () => {
    // If the list is empty
    if (!fishList) return;
    // Filter all element in the data list whose name includes search key
    const filteredList = fishList.filter((fish) =>
      fish.name.toUpperCase().includes(search.toUpperCase()),
    );
    setDisplayedList(filteredList);
  };

  useEffect(() => {
    setDisplayedList(fishList);
    if (fishList) setIsLoading(false);
  }, [fishList]);

  useEffect(() => {
    setIsLoading(true);
    getFishList();
    // Hide the activity indicator after 5 seconds aka request timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const ListView = () => {
    if (isLoading)
      return (
        <Center flex={1}>
          <ActivityIndicator size="large" color="blue" />
        </Center>
      );

    return (
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
    );
  };

  return (
    <>
      <HeaderTab name="Quản lý loại cá" />
      <Center flex={1} alignItems="center">
        <Box w="100%" alignItems="center" flex={1}>
          <SearchBar
            placeholder="Tìm kiếm theo tên"
            onChangeText={updateSearch}
            value={search}
            containerStyle={styles.searchBar}
            lightTheme
            blurOnSubmit
            onEndEditing={onEndEditing}
            onClear={onClear}
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

          <ListView />
        </Box>
      </Center>
    </>
  );
};

export default AdminFishManagementScreen;
