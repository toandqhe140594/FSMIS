import { useNavigation } from "@react-navigation/native";
import { useStoreDispatch } from "easy-peasy";
import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";

import styles from "../config/styles";
import { ROUTE_NAMES } from "../constants";
import { goToFishingLocationOverviewScreen, goToScreen } from "../navigations";

const MenuScreen = ({ menuTitle, menuListItem, locationId }) => {
  const navigation = useNavigation();

  const dispatch = useStoreDispatch();

  const navigateToScreen = (route) => {
    if (route === ROUTE_NAMES.PROFILE_LOGOUT) dispatch({ type: "LOGOUT" });
    else if (route === ROUTE_NAMES.FMANAGE_LOCATION_OVERVIEW)
      goToFishingLocationOverviewScreen(navigation, { id: locationId });
    else goToScreen(navigation, route);
  };

  return (
    <View style={styles.menuScreenListItemView}>
      {menuTitle && (
        <Text style={styles.menuScreenListItemText}> {menuTitle}</Text>
      )}
      {menuListItem.map((item) => (
        <ListItem
          key={item.id}
          onPress={() => {
            navigateToScreen(item.route);
          }}
        >
          <Icon name={item.icon} size={26} type={item.type || "material"} />
          <ListItem.Content style={{ height: 40 }}>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
};

MenuScreen.propTypes = {
  menuTitle: PropTypes.string,
  menuListItem: PropTypes.arrayOf(PropTypes.object),
  locationId: PropTypes.number,
};
MenuScreen.defaultProps = {
  menuTitle: null,
  menuListItem: [],
  locationId: -1,
};
export default MenuScreen;
