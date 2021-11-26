import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

import { ROLE_USER } from "../constants";
import AddressModel from "../models/AddressModel";
import AdminStackNavigator from "../navigations/AdminStackNavigator";
import AuthenticationStackNavigator from "../navigations/AuthenticationStackNavigator";
import RootStackNavigator from "../navigations/RootStackNavigator";
import LogoScreen from "../screens/LogoScreen";
import { setRequestErrorMessageHandling } from "./Http";
import { showToastMessage } from "./index";
import store from "./Store";

store.addModel("AddressModel", AddressModel);

const AuthenticationContainer = () => {
  const loginState = useStoreState((states) => states.loginState);
  const userRole = useStoreState((states) => states.userRole);
  const errorMessage = useStoreState((states) => states.errorMessage);
  const retrieveToken = useStoreActions((actions) => actions.retrieveToken);
  const setErrorMessage = useStoreActions((actions) => actions.setErrorMessage);
  const getAllProvince = useStoreActions(
    (actions) => actions.AddressModel.getAllProvince,
  );
  useEffect(() => {
    getAllProvince().catch(() => {
      console.log("loi api get all provine"); // dev only
    });
    setTimeout(async () => {
      await retrieveToken();
    }, 1500);
    setRequestErrorMessageHandling(setErrorMessage);
  }, []);

  useEffect(() => {
    if (errorMessage.error === "BANNED") {
      console.log("ban");
    }
    if (errorMessage.responseText) showToastMessage(errorMessage.responseText);
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
