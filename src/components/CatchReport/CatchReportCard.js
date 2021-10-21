import { Box, Button, Checkbox, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";

import InlineInputComponent from "../common/InlineInputComponent";
import InlineSelectComponent from "../common/InlineSelectComponent";

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const CatchReportCard = ({ id, deleteCard, updateCard }) => {
  const [fishType, setFishType] = useState("");
  const [catches, setCatches] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [isReleased, setReleased] = useState(false);
  useEffect(() => {
    updateCard(id, "fishType", fishType);
  }, [fishType]);
  useEffect(() => {
    updateCard(id, "catches", catches);
  }, [catches]);
  useEffect(() => {
    updateCard(id, "totalWeight", totalWeight);
  }, [totalWeight]);
  useEffect(() => {
    updateCard(id, "isReleased", isReleased);
  }, [isReleased]);
  return (
    <VStack
      shadow={2}
      backgroundColor="trueGray.50"
      space={2}
      style={styles.cardWrapper}
    >
      <InlineSelectComponent
        label="Chọn loài cá"
        placeholder="Nhấp để chọn cá"
        data={["Cá diếc", "Cá chép"]}
        value={fishType}
        handleOnChange={setFishType}
      />
      <InlineInputComponent
        label="Số lượng (con)"
        placeholder="Nhập số lượng con"
        value={catches}
        handleOnChange={setCatches}
      />
      <InlineInputComponent
        label="Tổng cân nặng (kg)"
        placeholder="Nhập tổng cân nặng"
        value={totalWeight}
        handleOnChange={setTotalWeight}
      />
      <Box style={styles.rowWrapper}>
        <Checkbox isChecked={isReleased} onChange={setReleased}>
          <Text style={{ marginLeft: 10 }}>Giao lại cho chủ hồ</Text>
        </Checkbox>
        <Button w="40%" onPress={() => deleteCard(id)}>
          Xoá
        </Button>
      </Box>
    </VStack>
  );
};

CatchReportCard.propTypes = {
  id: PropTypes.string,
  deleteCard: PropTypes.func,
  updateCard: PropTypes.func,
};
CatchReportCard.defaultProps = {
  id: "",
  deleteCard: () => {},
  updateCard: () => {},
};
export default CatchReportCard;
