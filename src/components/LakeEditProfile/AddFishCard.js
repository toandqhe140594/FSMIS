import { Button, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import InlineInputComponent from "../common/InlineInputComponent";
import InlineSelectComponent from "../common/InlineSelectComponent";

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
  },
});

const AddFishCard = ({ id, deleteCard, updateCard }) => {
  const [fish, setFish] = useState("");
  const [weightDescription, setWeightDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  /* 
    Still cannot figure out how to use one useEffect only and
    find which depencies cause the change so I wrote 5 useEffect
    for each state
  */
  // This shit gonna cause so many render/changes
  useEffect(() => {
    updateCard(id, "fish", fish);
  }, [fish]);
  useEffect(() => {
    updateCard(id, "weightDescription", weightDescription);
  }, [weightDescription]);
  useEffect(() => {
    updateCard(id, "amount", amount);
  }, [amount]);
  useEffect(() => {
    updateCard(id, "totalWeight", totalWeight);
  }, [totalWeight]);
  return (
    <VStack
      shadow={2}
      backgroundColor="trueGray.50"
      space={2}
      style={styles.cardWrapper}
    >
      <InlineSelectComponent
        compact
        label="Loại cá"
        placeholder="Chọn loại cá"
        data={["Cá diếc", " Cá chép"]}
        value={fish}
        handleOnChange={setFish}
      />
      <InlineInputComponent
        compact
        label="Biểu"
        placeholder="Miêu tả biểu cá"
        value={weightDescription}
        handleOnChange={setWeightDescription}
      />
      <InlineInputComponent
        compact
        label="Số lượng (con)"
        placeholder="Nhập số lượng con"
        value={amount}
        handleOnChange={setAmount}
      />
      <InlineInputComponent
        compact
        label="Tổng cân nặng (kg)"
        placeholder="Nhập tổng cân nặng"
        value={totalWeight}
        handleOnChange={setTotalWeight}
      />
      <Button
        w="40%"
        style={{ alignSelf: "flex-end" }}
        onPress={() => deleteCard(id)}
      >
        Xoá
      </Button>
    </VStack>
  );
};

AddFishCard.propTypes = {
  id: PropTypes.string.isRequired,
  deleteCard: PropTypes.func,
  updateCard: PropTypes.func,
};

AddFishCard.defaultProps = {
  deleteCard: () => {},
  updateCard: () => {},
};

export default AddFishCard;
