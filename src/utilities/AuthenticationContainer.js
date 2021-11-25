import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";

import { ROLE_USER } from "../constants";
import AddressModel from "../models/AddressModel";
import AdminStackNavigator from "../navigations/AdminStackNavigator";
import AuthenticationStackNavigator from "../navigations/AuthenticationStackNavigator";
import RootStackNavigator from "../navigations/RootStackNavigator";
import LogoScreen from "../screens/LogoScreen";
import store from "./Store";

store.addModel("AddressModel", AddressModel);

const AuthenticationContainer = () => {
  const loginState = useStoreState((states) => states.loginState);
  const userRole = useStoreState((states) => states.userRole);
  const errorMessage = useStoreState((states) => states.errorMessage);
  const retrieveToken = useStoreActions((actions) => actions.retrieveToken);
  const getAllProvince = useStoreActions(
    (actions) => actions.AddressModel.getAllProvince,
  );
  useEffect(() => {
    getAllProvince();
    setTimeout(async () => {
      await retrieveToken();
    }, 1500);
  }, []);

  useEffect(() => {
    if (errorMessage)
      ToastAndroid.showWithGravityAndOffset(
        errorMessage,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
  }, [errorMessage]);

  if (loginState.isLoading) {
    return <LogoScreen />;
  }

  return (
    <>
      {loginState.authToken === null && <AuthenticationStackNavigator />}
      {loginState.authToken !== null &&
        (userRole === ROLE_USER ? (
          <RootStackNavigator />
        ) : (
          <AdminStackNavigator />
        ))}
    </>
  );
};

export default AuthenticationContainer;
