import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect } from "react";

import RootStackNavigator from "../navigations/RootStackNavigator";
import Login from "../screens/LoginScreen";
import LogoScreen from "../screens/LogoScreen";

const AuthenticationContainer = () => {
  const loginState = useStoreState((states) => states.loginState);
  const errorMessage = useStoreState((states) => states.errorMessage);
  const retrieveToken = useStoreActions((actions) => actions.retrieveToken);

  useEffect(() => {
    setTimeout(async () => {
      retrieveToken();
    }, 1500);
  }, []);

  useEffect(() => {
    if (errorMessage) alert(errorMessage);
  }, [errorMessage]);

  if (loginState.isLoading) {
    return <LogoScreen />;
  }

  return (
    <>{loginState.authToken === null ? <Login /> : <RootStackNavigator />}</>
  );
};

export default AuthenticationContainer;
