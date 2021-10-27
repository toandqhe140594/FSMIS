import { useNavigation } from "@react-navigation/native";
import { Box, Button, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { Avatar, Divider, SearchBar, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import { goToAdminFishEditScreen } from "../navigations";

const fishList = [
  {
    id: 1,
    name: "Cá he vàng",
    image:
      "https://3.bp.blogspot.com/-e_zPS-jj8uc/WgL9uZWdIII/AAAAAAAASZk/dCH8qqu-Vck-vOcQ3Tzow1ETM8Y2sgV4ACLcBGAs/s1600/ca-he-vang-barbonymus_altus.jpg",
  },
  {
    id: 2,
    name: "Cá chép",
    image:
      "https://st.quantrimang.com/photos/image/2020/12/01/phan-biet-cac-loai-ca-1.jpg",
  },
  {
    id: 3,
    name: "Cá vàng",
    image:
      "https://cacanhtuanphong.com/wp-content/uploads/2016/10/ca-vang-gold-fish-5_thumb.jpg",
  },
];

const FishManagementCard = ({ id, name, image }) => {
  const navigation = useNavigation();

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
          <Button>Xóa</Button>
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

const AdminAccountManagementScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
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
            containerStyle={{
              width: "100%",
              marginTop: 12,
              backgroundColor: "white",
              paddingHorizontal: 12,
            }}
            lightTheme
            blurOnSubmit
            onEndEditing={() => {
              console.log("end edit");
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
              data={fishList}
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

export default AdminAccountManagementScreen;
