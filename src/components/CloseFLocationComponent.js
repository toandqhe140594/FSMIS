import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

import styles from "../config/styles";
import { goToFManageSelectScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const CloseFLocationComponent = ({ name }) => {
  const navigation = useNavigation();

  const closeFishingLocation = useStoreActions(
    (actions) => actions.FManageModel.closeFishingLocation,
  );

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const closeAction = () => {
    showAlertConfirmBox(
      "Bạn muốn xóa khu hồ này?",
      `"${name}" sẽ bị xóa. Bạn không thể hoàn tác hành động này\nBạn cần xóa hết nhân viên khỏi hồ để đóng`,
      () => {
        closeFishingLocation({ setDeleteSuccess });
      },
    );
  };

  useEffect(() => {
    if (deleteSuccess) {
      showToastMessage("Đóng cửa khu hồ thành công");
      goToFManageSelectScreen(navigation);
    }
  }, [deleteSuccess]);

  return (
    <View style={styles.menuScreenListItemView}>
      <ListItem
        onPress={() => {
          closeAction();
        }}
      >
        <Icon name="delete" size={26} type="antdesign" color="red" />
        <ListItem.Content style={{ height: 40 }}>
          <ListItem.Title style={{ color: "red" }}>Xóa khu hồ</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};
CloseFLocationComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CloseFLocationComponent;
