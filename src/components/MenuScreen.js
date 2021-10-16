import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, ListItem, Text } from "react-native-elements";

const styles = StyleSheet.create({
  view: {
    marginBottom: 6,
  },
  text: {
    textAlign: "left",
    padding: 2,
    fontSize: 19,
    marginBottom: 3,
    marginTop: 5,
    marginLeft: 11,
  },
});

const MenuScreen = ({ menuTitle, menuListItem }) => {
  const test = () => {
    console.log("text");
  };

  return (
    <View style={styles.view}>
      {menuTitle && <Text style={styles.text}> {menuTitle}</Text>}
      {menuListItem.map((item) => (
        <ListItem
          key={item.id}
          bottomDivider
          style={{ backgroundColor: "red" }}
          onPress={test}
        >
          <Icon name={item.icon} />
          <ListItem.Content style={{ height: 37 }}>
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
};
MenuScreen.defaultProps = {
  menuTitle: null,
  menuListItem: [
    {
      id: 1,
      title: "Appointments",
      icon: "av-timer",
    },
    {
      id: 2,
      title: "Trips",
    },
  ],
};
export default MenuScreen;
