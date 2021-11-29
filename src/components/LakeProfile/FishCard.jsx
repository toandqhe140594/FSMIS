import { Box } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Button, Card, Text } from "react-native-elements";

const CustomText = ({ title, text, mt }) => {
  return (
    <Text style={{ marginTop: mt }}>
      <Text style={{ fontWeight: "bold" }}>{title}: </Text>
      {text}
    </Text>
  );
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

  const handleToggleEditOverlay = () => {
    toggleEditOverlay({ id, name, visible: true });
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
        <Button title="Bồi cá" type="clear" onPress={handleToggleEditOverlay} />
      </Box>
    </Card>
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
