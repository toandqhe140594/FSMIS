import { Box, Button, Center, FlatList } from "native-base";
import React, { useState } from "react";

import HeaderTab from "../components/HeaderTab";
import LakeCard from "../components/LakeCard";

const data = [
  {
    id: "1",
    name: "Hồ vip",
    image: "https://picsum.photos/200",
  },
  {
    id: "2",
    name: "Hồ vip2",
    image: "https://picsum.photos/200",
  },
  {
    id: "3",
    name: "Hồ vi3",
    image: "https://picsum.photos/200",
  },
  {
    id: "4",
    name: "Hồ vi3",
    image: "https://picsum.photos/200",
  },
  {
    id: "5",
    name: "Hồ vi3",
    image: "https://picsum.photos/200",
  },
  {
    id: "6",
    name: "Hồ vi3",
    image: "https://picsum.photos/200",
  },
];
const LakeListManagementScreen = () => {
  const [lakeListData, setLakeListData] = useState(data);

  const Separator = () => {
    return <Box h={3} />;
  };

  return (
    <Box flex={1}>
      <HeaderTab name="Quản lý hồ câu" />
      <Box flex={1} alignItems="center">
        <Center w="80%" my={5}>
          <Button>Thêm hồ câu</Button>
        </Center>
        <Center w="80%">
          <FlatList
            data={lakeListData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LakeCard name={item.name} image={item.image} />
            )}
            ItemSeparatorComponent={Separator}
            w="100%"
          />
        </Center>
      </Box>
    </Box>
  );
};

export default LakeListManagementScreen;