import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

import { ROLE_USER } from "../constants";
import AddressModel from "../models/AddressModel";
import BanNoticeScreen from "../screens/BanNoticeScreen";
import LogoScreen from "../screens/LogoScreen";
import {
  setBeforeRequestFunction,
  setRequestErrorMessageHandling,
} from "../utilities/Http";
import { showToastMessage } from "../utilities/index";
import store from "../utilities/Store";
import AdminStackNavigator from "./AdminStackNavigator";
import AuthenticationStackNavigator from "./AuthenticationStackNavigator";
import RootStackNavigator from "./RootStackNavigator";

store.addModel("AddressModel", AddressModel);

const AuthenticationContainer = () => {
  const loginState = useStoreState((states) => states.loginState);
  const userRole = useStoreState((states) => states.userRole);
  const errorMessage = useStoreState((states) => states.errorMessage);
  const retrieveToken = useStoreActions((actions) => actions.retrieveToken);
  const setErrorMessage = useStoreActions((actions) => actions.setErrorMessage);
  const logOut = useStoreActions((actions) => actions.logOut);
  const getAllProvince = useStoreActions(
    (actions) => actions.AddressModel.getAllProvince,
  );
  useEffect(() => {
    getAllProvince().catch(() => {});
    setTimeout(async () => {
      await retrieveToken();
    }, 1500);
    setRequestErrorMessageHandling(setErrorMessage);
    setBeforeRequestFunction(() => setErrorMessage({}));
  }, []);

  useEffect(() => {
    if (errorMessage.responseText) showToastMessage(errorMessage.responseText);
    if (errorMessage.error === "BANNED") logOut();
  }, [errorMessage]);

  if (loginState.isLoading) {
    return <LogoScreen />;
  }
  if (errorMessage && errorMessage.error === "BANNED")
    return <BanNoticeScreen bannedInformation={errorMessage} />;
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
