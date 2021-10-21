import { Box, Center, Divider } from "native-base";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

import AvatarCard from "../components/AvatarCard";
import HeaderTab from "../components/HeaderTab";

const userList = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0987654321",
    image:
      "https://cdns-images.dzcdn.net/images/artist/4099da261a61666f58bb3598f0c4c37f/264x264.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    phone: "0987654321",
    image:
      "https://i.zoomtventertainment.com/story/Lisa_0.png?tr=w-400,h-300,fo-auto",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    phone: "0987654321",
    image:
      "http://pm1.narvii.com/7145/8e99f6f6f2e12a708ea03fcbe8264f311d859842r1-409-512v2_uhq.jpg",
  },
];

const AdminAccountManagementScreen = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  return (
    <>
      <HeaderTab name="Quản lý tài khoản" />
      <Center flex={1} alignItems="center">
        <Box w="100%" alignItems="center" flex={1}>
          <SearchBar
            placeholder="Nhập tên hoặc số điện thoại"
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

          <Box w="90%">
            <FlatList
              data={userList}
              renderItem={({ item }) => (
                <AvatarCard
                  nameUser={item.name}
                  subText={`SĐT: ${item.phone}`}
                  image={item.image}
                  onPress={() => {}}
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
