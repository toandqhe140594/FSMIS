import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Button, Card, Text } from "react-native-elements";

import OverlayLoading from "../components/common/OverlayLoading";
import HeaderTab from "../components/HeaderTab";
import OverlayInputSection from "../components/LakeProfile/OverlayInputSection";
import {
  goBack,
  goToFManageFishAddScreen,
  goToFManageLakeEditScreen,
} from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const CustomText = ({ title, text, mt }) => {
  return (
    <Text style={{ marginTop: mt }}>
      <Text style={{ fontWeight: "bold" }}>{title}: </Text>
      {text}
    </Text>
  );
};
CustomText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mt: PropTypes.number,
};
CustomText.defaultProps = {
  text: "",
};
CustomText.defaultProps = {
  mt: 4,
};

const FishCard = ({
  id,
  name,
  imageUrl,
  minWeight,
  maxWeight,
  quantity,
  totalWeight,
  toggleEditOverlay,
  onDeleteFish,
}) => {
  const handleDeleteFish = () => {
    onDeleteFish(id);
  };
  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{ uri: imageUrl }}
        style={{ resizeMode: "contain" }}
      />
      <CustomText title="Biểu" text={`${minWeight} - ${maxWeight} kg`} mt={8} />
      <CustomText title="Số lượng còn lại ước tính" text={quantity} />
      <CustomText title="Tổng cân nặng ước tính" text={`${totalWeight} kg`} />
      <Box flexDir="row">
        <Button
          title="Xóa"
          type="clear"
          titleStyle={{ color: "#f43f5e" }}
          onPress={handleDeleteFish}
        />
        <Button
          title="Bồi cá"
          type="clear"
          // DucHM ADD_START 8/11/2021
          onPress={() => {
            toggleEditOverlay({ id, name, visible: true });
          }}
          // DucHM ADD_END 8/11/2021
        />
      </Box>
    </Card>
  );
};
FishCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  minWeight: PropTypes.number.isRequired,
  maxWeight: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  totalWeight: PropTypes.number,
  toggleEditOverlay: PropTypes.func,
  onDeleteFish: PropTypes.func,
};
FishCard.defaultProps = {
  quantity: 0,
  totalWeight: 0,
  toggleEditOverlay: () => {},
  onDeleteFish: () => {},
};

const FManageEmployeeManagementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [overlayState, setOverlayState] = useState({ visible: false });
  const lakeDetail = useStoreState((states) => states.FManageModel.lakeDetail);
  const getLakeDetailByLakeId = useStoreActions(
    (actions) => actions.FManageModel.getLakeDetailByLakeId,
  );

  // DucHM ADD_START 8/11/2021
  const deleteFishFromLake = useStoreActions(
    (actions) => actions.FManageModel.deleteFishFromLake,
  );
  const setLakeDetail = useStoreActions(
    (actions) => actions.FManageModel.setLakeDetail,
  );

  const handleLakeEditNavigate = () => {
    goToFManageLakeEditScreen(navigation);
  };

  const handleAddFishNavigate = () => {
    goToFManageFishAddScreen(navigation);
  };

  const keyExtractor = (item) => item.id.toString();

  const promptForFishDelete = (id) => {
    const handleFishDelete = () => {
      deleteFishFromLake({ id })
        .then(() => {
          showToastMessage("Cá đã được xóa khỏi hồ");
        })
        .catch(() => {});
    };
    showAlertConfirmBox(
      "Thông báo",
      "Bạn chắc chắn muốn xóa loài cá này khỏi hồ?",
      handleFishDelete,
    );
  };

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
    const loadingId = setTimeout(() => setIsLoading(false), 10000);
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
            title="Thông tin hồ câu"
            containerStyle={{ width: "40%" }}
            onPress={handleLakeEditNavigate}
          />
          <Button
            title="Thêm loại cá"
            containerStyle={{ width: "40%" }}
            onPress={handleAddFishNavigate}
          />
        </Center>
        <Box flex={1} w="100%">
          <FlatList
            data={lakeDetail.fishInLake}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </Box>
      </Box>
    </>
  );
};

export default FManageEmployeeManagementScreen;
