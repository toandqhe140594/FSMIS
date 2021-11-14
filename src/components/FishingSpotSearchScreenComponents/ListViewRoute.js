import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Button, Icon, ScrollView, VStack } from "native-base";
import React from "react";

import { goToAdvanceSearchScreen } from "../../navigations";
import FLocationCard from "../FLocationCard";

const ListViewRoute = () => {
  const navigation = useNavigation();
  const advancedLocationList = useStoreState(
    (states) => states.MapSearchModel.advancedLocationList,
  );

  // Show/hide overlay
  const goToAdvanceSearchFilterScreen = () => {
    goToAdvanceSearchScreen(navigation);
  };

  return (
    <ScrollView>
      <Box
        flex={1}
        alignItems="center"
        w={{ base: "90%", md: "50%", lg: "30%" }}
        alignSelf="center"
      >
        <Button
          mt={5}
          leftIcon={<Icon as={Ionicons} name="search" size="sm" />}
          onPress={goToAdvanceSearchFilterScreen}
        >
          Tìm kiếm
        </Button>

        {/* Draft view only */}
        <VStack mt={3} space={3} w="100%">
          {advancedLocationList.map((location) => (
            <FLocationCard
              id={location.id}
              address={location.address}
              name={location.name}
              rate={location.rate}
              isVerifed={location.isVerifed}
              image={location.mainImage}
              key={location.id}
            />
          ))}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default ListViewRoute;
