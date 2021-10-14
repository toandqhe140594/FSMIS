import { Box, VStack } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import HeaderTab from "../HeaderTab";
import LakeCard from "../LakeCard";

const LakeListViewRoute = () => {
  return (
    <ScrollView>
      <Box>
        <HeaderTab name="Hồ câu thuần việt" isVerified flagable />
        <Divider />
        <Box mx="7%">
          <VStack mt={5} space={2}>
            <LakeCard
              image="https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D\&ixlib=rb-1.2.1\&w=1000\&q=80"
              listOfFishes={["Cá chép", "Cá chuối", "Cá diếc"]}
              name="Hồ thường"
            />
            <LakeCard
              image="https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/photos/term-bg-1-c98135712157fb21286eafd480f610f9.jpg"
              listOfFishes={["Cá chép", "Cá chuối", "Cá diếc", "Cá trắm đen"]}
              name="Hồ Vip"
            />
          </VStack>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default LakeListViewRoute;
