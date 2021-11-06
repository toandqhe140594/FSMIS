import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Button, Card, Text } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import colors from "../config/colors";
import { goToFManageLakeEditScreen } from "../navigations";
import { showAlertAbsoluteBox } from "../utilities";

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
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  mt: PropTypes.number,
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
            showAlertAbsoluteBox("Delete box", `Id ${id}`);
          }}
        />
        <Button title="Bồi cá" type="clear" />
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
};
FishCard.defaultProps = {
  quantity: 0,
  totalWeight: 0,
};

const FManageEmployeeManagementScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const lakeDetail = useStoreState((states) => states.FManageModel.lakeDetail);
  const getLakeDetailByLakeId = useStoreActions(
    (actions) => actions.FManageModel.getLakeDetailByLakeId,
  );

  useEffect(() => {
    if (route.params.id) getLakeDetailByLakeId({ id: route.params.id });
  }, []);

  return (
    <>
      <HeaderTab name="Hồ vip" />
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
          <Button title="Thêm loại cá" containerStyle={{ width: "40%" }} />
        </Center>
        <Box flex={1} w="100%">
          <FlatList
            data={lakeDetail.fishInLake}
            renderItem={({ item }) => <FishCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </Box>
      </Box>
    </>
  );
};

export default FManageEmployeeManagementScreen;
