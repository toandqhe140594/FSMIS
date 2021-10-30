import { Box, Button } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Avatar, Text } from "react-native-elements";

const EmployeeCard = ({ employee, deleteEmployee }) => {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Box flex={1} flexDirection="row">
        <Avatar
          rounded
          size="large"
          source={{
            uri: employee.image || "https://picsum.photos/200",
          }}
          containerStyle={{ padding: 10, margin: 5 }}
        />
        <Box flex={1} justifyContent="center" pr={1}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }} numberOfLines={2}>
            {employee.name}
          </Text>
          <Text>SĐT: {employee.phoneNumber}</Text>
        </Box>
      </Box>
      <Box w="35%" mr={4}>
        <Button
          onPress={() => {
            deleteEmployee(employee.id);
          }}
        >
          Xóa nhân viên
        </Button>
      </Box>
    </Box>
  );
};
EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  deleteEmployee: PropTypes.func.isRequired,
};

export default EmployeeCard;
