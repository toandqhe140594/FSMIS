import { action, createStore, reducer, thunk } from "easy-peasy";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

import { AUTH_TOKEN } from "../config/constants";
import http, { removeAuthToken, setAuthToken } from "./Http";

const initialLoginState = {
  authToken: null,
  phone: null,
  isLoading: true,
};

const Store = createStore({
  errorMessage: "",
  loginState: reducer((state = initialLoginState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          phone: action.phone,
          authToken: action.authToken,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          phone: null,
          authToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          phone: action.phone,
          authToken: action.authToken,
          isLoading: false,
        };
      case "RETRIEVE_TOKEN":
        return {
          ...state,
          authToken: action.authToken,
          isLoading: false,
        };
      default:
        return { ...state };
    }
  }),
  setErrorMessage: action((state, payload) => {
    state.errorMessage = payload;
  }),
  login: thunk(async (actions, payload, { dispatch }) => {
    const { data } = await http.post("auth/login", {
      phone: "0963372727", // Test only
      password: "Asdf2k@!",
    });
    let authToken = null;
    try {
      authToken = data.authToken;
      await SecureStore.setItemAsync(AUTH_TOKEN, authToken);
      setAuthToken(authToken);
    } catch (e) {
      actions.setErrorMessage(e); // Test only
    }
    dispatch({
      type: "LOGIN",
      phone: payload.phoneNumber,
      authToken,
    });
  }),
  logOut: thunk(async (actions, payload, { dispatch }) => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN);
      removeAuthToken();
    } catch (e) {
      actions.setErrorMessage(e); // Test only
    }
    dispatch({ type: "LOGOUT" });
  }),
  retrieveToken: thunk(async (actions, payload, { dispatch }) => {
    let authToken = null;
    try {
      authToken = await SecureStore.getItemAsync(AUTH_TOKEN);
    } catch (e) {
      actions.setErrorMessage(e);
    }
    if (authToken) {
      const { exp } = jwtDecode(authToken);
      const isExpire = Date.now() >= exp * 1000;
      if (!isExpire) dispatch({ type: "RETRIEVE_TOKEN", authToken });
      setAuthToken(authToken);
      return;
    }
    dispatch({ type: "LOGOUT" });
  }),
});

export default Store;
