import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTE_NAMES } from "../constants";
import UtilModel from "../models/UtilModel";
import BanNoticeScreen from "../screens/BanNoticeScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import RegisterInformationScreen from "../screens/RegisterInformationScreen";
import RegisterScreen from "../screens/RegisterScreen";
import store from "../utilities/Store";

store.addModel("UtilModel", UtilModel);

const AuthenticationStack = createNativeStackNavigator();

const AuthenticationStackNavigator = () => {
  return (
    <AuthenticationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTE_NAMES.LOGIN}
    >
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.LOGIN}
        component={LoginScreen}
      />
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.REGISTER}
        component={RegisterScreen}
      />
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.REGISTER_INFORMATION}
        component={RegisterInformationScreen}
      />
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.OTP_SCREEN}
        component={OTPScreen}
      />
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.PASSWORD_FORGOT}
        component={ForgotPasswordScreen}
      />
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.PASSWORD_CHANGE}
        component={ChangePasswordScreen}
      />
      <AuthenticationStack.Screen
        name={ROUTE_NAMES.BAN_NOTICE_SCREEN}
        component={BanNoticeScreen}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationStackNavigator;
