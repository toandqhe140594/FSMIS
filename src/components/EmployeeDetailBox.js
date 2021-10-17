import { Box, Center, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";
import { Avatar, Text } from "react-native-elements";

import styles from "../config/styles";

const EmployeeDetailBox = ({
  name,
  dob,
  phoneNumber,
  gender,
  address,
  image,
  isDetailed,
}) => {
  return (
    <Center flex={1} w="80%">
      <Box mb={5} alignItems="center">
        <Avatar
          rounded
          size="xlarge"
          icon={{ name: "user", type: "font-awesome" }}
          source={{
            uri: image,
          }}
          containerStyle={[styles.p1, styles.mb1]}
        />
        <Text style={[styles.nameTextLg]}>{name}</Text>
        {!isDetailed && (
          <Text style={[styles.boldText, styles.mt1]}>
            Số điện thoại: <Text>{phoneNumber}</Text>
          </Text>
        )}
      </Box>
      {isDetailed && (
        <VStack space={2} w="100%">
          <Text style={styles.boldText}>
            Ngày sinh: <Text>{dob}</Text>
          </Text>
          <Text style={styles.boldText}>
            Số điện thoại: <Text>{phoneNumber}</Text>
          </Text>
          <Text style={styles.boldText}>
            Giới tính: <Text>{gender}</Text>
          </Text>
          <Text style={styles.boldText}>
            Địa chỉ: <Text>{address}</Text>
          </Text>
        </VStack>
      )}
    </Center>
  );
};
EmployeeDetailBox.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  dob: PropTypes.string,
  address: PropTypes.string,
  gender: PropTypes.bool,
  image: PropTypes.string,
  isDetailed: PropTypes.bool,
};
EmployeeDetailBox.defaultProps = {
  dob: "",
  gender: true,
  image: "https://picsum.photos/200",
  address: "",
  isDetailed: false,
};
export default EmployeeDetailBox;
