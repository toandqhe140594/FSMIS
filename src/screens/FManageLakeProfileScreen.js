import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text } from "react-native";
import { Button } from "react-native-elements";

import OverlayLoading from "../components/common/OverlayLoading";
import HeaderTab from "../components/HeaderTab";
import FishCard from "../components/LakeProfile/FishCard";
import OverlayInputSection from "../components/LakeProfile/OverlayInputSection";
import { DEFAULT_TIMEOUT, DICTIONARY, KEY_EXTRACTOR } from "../constants";
import {
  goBack,
  goToFManageFishAddScreen,
  goToFManageLakeEditScreen,
} from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const FManageEmployeeManagementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [overlayState, setOverlayState] = useState({ visible: false });
  const lakeDetail = useStoreState((states) => states.FManageModel.lakeDetail);
  const getLakeDetailByLakeId = useStoreActions(
    (actions) => actions.FManageModel.getLakeDetailByLakeId,
  );
  const deleteFishFromLake = useStoreActions(
    (actions) => actions.FManageModel.deleteFishFromLake,
  );
  const setLakeDetail = useStoreActions(
    (actions) => actions.FManageModel.setLakeDetail,
  );

  const memoizedStyle = useMemo(
    () =>
      lakeDetail.fishInLake && lakeDetail.fishInLake.length > 0
        ? null
        : {
            flex: 1,
            justifyContent: "center",
          },
    [lakeDetail.fishInLake && lakeDetail.fishInLake.length > 0],
  );

  const handleLakeEditNavigate = () => {
    goToFManageLakeEditScreen(navigation);
  };

  const handleAddFishNavigate = () => {
    goToFManageFishAddScreen(navigation);
  };

  const promptForFishDelete = (id) => {
    const handleFishDelete = () => {
      deleteFishFromLake({ id })
        .then(() => {
          showToastMessage(DICTIONARY.TOAST_FISH_DELETE_SUCCESS_MSG);
        })
        .catch(() => {});
    };
    showAlertConfirmBox(
      DICTIONARY.ALERT_TITLE,
      DICTIONARY.ALERT_DELTE_FISH_PROMPT_MSG,
      handleFishDelete,
    );
  };

  const renderEmpty = () => (
    <Text style={{ color: "gray", alignSelf: "center" }}>
      Chưa có cá trong hồ
    </Text>
  );

  const renderItem = ({ item }) => (
    <FishCard
      {...item}
      toggleEditOverlay={setOverlayState}
      onDeleteFish={promptForFishDelete}
    />
  );

  useEffect(() => {
    if (route.params.id) {
      getLakeDetailByLakeId({ id: route.params.id })
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          goBack(navigation);
        });
    }
    const loadingId = setTimeout(() => setIsLoading(false), DEFAULT_TIMEOUT);
    return () => {
      setLakeDetail({ id: null });
      clearTimeout(loadingId);
    };
  }, []);

  if (isLoading) return <OverlayLoading coverScreen />;
  return (
    <>
      <HeaderTab name={lakeDetail.name || "Hồ "} />
      <OverlayInputSection {...overlayState} toggleOverlay={setOverlayState} />
      <Box flex={1} alignItems="center">
        <Center
          w="100%"
          my={2}
          mx={3}
          flexDirection="row"
          justifyContent="space-evenly"
        >
          <Button
            title={DICTIONARY.LAKE_INFORMATION_BUTTON_LABEL}
            containerStyle={{ width: "40%" }}
            onPress={handleLakeEditNavigate}
          />
          <Button
            title={DICTIONARY.ADD_FISH_BUTTON_LABEL}
            containerStyle={{ width: "40%" }}
            onPress={handleAddFishNavigate}
          />
        </Center>
        <Box flex={1} w="100%">
          <FlatList
            data={lakeDetail.fishInLake}
            renderItem={renderItem}
            keyExtractor={KEY_EXTRACTOR}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={memoizedStyle}
          />
        </Box>
      </Box>
    </>
  );
};

export default FManageEmployeeManagementScreen;
