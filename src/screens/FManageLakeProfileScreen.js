import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center } from "native-base";
import PropTypes from "prop-types";
// DucHM ADD_START 8/11/2021
import React, { useEffect, useState } from "react";
// DucHM ADD_START 8/11/2021
import { ActivityIndicator, FlatList } from "react-native";
import { Button, Card, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
// DucHM ADD_START 8/11/2021
import OverlayInputSection from "../components/LakeProfile/OverlayInputSection";
// DucHM ADD_END 8/11/2021
import colors from "../config/colors";
import {
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
          titleStyle={{ color: colors.defaultPrimaryButton }}
          onPress={() => {
            // DucHM ADD_START 8/11/2021
            onDeleteFish(id);
            // DucHM ADD_END 8/11/2021
          }}
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
  const [overlayState, setOverlayState] = useState({ visible: false });
  const [deleteStatus, setDeleteStatus] = useState("");
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

  const handleDeleteFish = (id) => {
    showAlertConfirmBox(
      "Thông báo",
      "Bạn chắc chắn muốn xóa loài cá này khỏi hồ?",
      () => deleteFishFromLake({ id, setDeleteStatus }),
    );
  };
  // DucHM ADD_END 8/11/2021
  useEffect(() => {
    if (route.params.id) getLakeDetailByLakeId({ id: route.params.id });
    return () => {
      setLakeDetail({ id: null });
    };
  }, []);

  // DucHM ADD_START 8/11/2021
  useEffect(() => {
    if (deleteStatus === "SUCCESS") {
      showToastMessage("Cá đã được xóa khỏi hồ");
    } else if (deleteStatus === "FAILED") {
      showToastMessage("Đã xảy ra lỗi! Vui lòng thử lại.");
    }
  }, [deleteStatus]);
  // DucHM ADD_END 8/11/2021

  if (!lakeDetail.id)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" color="blue" />
      </Box>
    );

  return (
    <>
      <HeaderTab name={lakeDetail.name || "Hồ "} />
      {/* DucHM ADD_START 8/11/2021 */}
      <OverlayInputSection {...overlayState} toggleOverlay={setOverlayState} />
      {/* DucHM ADD_END 8/11/2021 */}
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
            buttonStyle={{ backgroundColor: "#2089DC" }}
            containerStyle={{ width: "40%" }}
            onPress={() => {
              goToFManageLakeEditScreen(navigation);
            }}
          />
          <Button
            title="Thêm loại cá"
            containerStyle={{ width: "40%" }}
            onPress={() => goToFManageFishAddScreen(navigation)}
          />
        </Center>
        <Box flex={1} w="100%">
          <FlatList
            data={lakeDetail.fishInLake}
            // DucHM ADD_START 8/11/2021
            renderItem={({ item }) => (
              <FishCard
                {...item}
                toggleEditOverlay={setOverlayState}
                onDeleteFish={handleDeleteFish}
              />
            )}
            // DucHM ADD_END 8/11/2021
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Box>
    </>
  );
};

export default FManageEmployeeManagementScreen;
