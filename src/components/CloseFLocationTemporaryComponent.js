import { useStoreActions } from "easy-peasy";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

import styles from "../config/styles";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const CloseFLocationTemporaryComponent = ({ name, isClosed }) => {
  const closeFishingLocation = useStoreActions(
    (actions) => actions.FManageModel.closeFishingLocationTemporary,
  );

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const closeAction = () => {
    showAlertConfirmBox(
      `Bạn muốn ${isClosed ? "mở lại" : "tạm đóng"} khu hồ này?`,
      `"${name}" ${isClosed ? "được mở lại" : "sẽ bị tạm đóng"}.`,
      () => {
        closeFishingLocation({ setDeleteSuccess });
      },
    );
  };

  useEffect(() => {
    if (deleteSuccess) {
      const message = isClosed ? "Đóng hồ thành công" : "Mở cửa thành công";
      showToastMessage(message);
    }
    setDeleteSuccess(null);
  }, [deleteSuccess]);

  return (
    <View style={styles.menuScreenListItemView}>
      <ListItem
        onPress={() => {
          closeAction();
        }}
      >
        <Icon
          name={isClosed ? "unlock" : "lock"}
          size={26}
          type="antdesign"
          key={isClosed}
        />
        <ListItem.Content style={{ height: 40 }}>
          <ListItem.Title key={isClosed}>
            {isClosed ? "Mở lại khu hồ" : "Đóng hồ tạm thời"}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};
CloseFLocationTemporaryComponent.propTypes = {
  name: PropTypes.string.isRequired,
  isClosed: PropTypes.bool,
};
CloseFLocationTemporaryComponent.defaultProps = {
  isClosed: false,
};

export default CloseFLocationTemporaryComponent;
