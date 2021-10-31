import { action, createStore, reducer, thunk } from "easy-peasy";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

import { AUTH_TOKEN, USER_PROFILE, USER_ROLE } from "../constants";
import http, { removeAuthToken, setAuthToken } from "./Http";

const initialLoginState = {
  authToken: null,
  phone: null,
  isLoading: true,
};

const Store = createStore({
  errorMessage: "",
  // eslint-disable-next-line no-shadow
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
  userRole: null,
  userProfile: null,
  setErrorMessage: action((state, payload) => {
    state.errorMessage = payload;
  }),
  setUserRole: action((state, payload) => {
    state.userRole = payload;
  }),
  setUserProfile: action((state, payload) => {
    state.userProfile = payload;
  }),

  /**
   * Call the API to get authentcation token
   * @param {Object} [payload] the payload pass to the function
   * @param {String} [payload.phone] the account phone number
   * @param {String} [payload.password] the password
   */
  login: thunk(async (actions, payload, { dispatch }) => {
    const { data } = await http.post("auth/login", {
      ...payload,
    });
    let authToken = null;
    try {
      authToken = data.authToken;
      await SecureStore.setItemAsync(AUTH_TOKEN, authToken);
      await SecureStore.setItemAsync(USER_ROLE, data.roles);
      await SecureStore.setItemAsync(USER_PROFILE, JSON.stringify(data));
      await setAuthToken(authToken);
      actions.setUserRole(data.roles);
      actions.setUserProfile(data);
    } catch (e) {
      actions.setErrorMessage(e); // Test only
    }
    dispatch({
      type: "LOGIN",
      phone: payload.phoneNumber,
      authToken,
    });
  }),
  /**
   * Remove the authentication token from SecureStore
   */
  logOut: thunk(async (actions, payload, { dispatch }) => {
    try {
      await SecureStore.deleteItemAsync(AUTH_TOKEN);
      await SecureStore.deleteItemAsync(USER_PROFILE);
      removeAuthToken();
    } catch (e) {
      actions.setErrorMessage(e); // Test only
    }
    dispatch({ type: "LOGOUT" });
  }),
  /**
   * Retrieve authentication token from SecureStore to login
   */
  retrieveToken: thunk(async (actions, payload, { dispatch }) => {
    let authToken = null;
    let userRole = null;
    let userProfile = null;
    try {
      authToken = await SecureStore.getItemAsync(AUTH_TOKEN);
      userRole = await SecureStore.getItemAsync(USER_ROLE);
      const userProfileJSONData = await SecureStore.getItemAsync(USER_PROFILE);
      userProfile = JSON.parse(userProfileJSONData);
    } catch (e) {
      actions.setErrorMessage(e);
    }
    // If there was an authentication on the device
    if (authToken) {
      const { exp } = jwtDecode(authToken);
      const isExpire = Date.now() >= exp * 1000;
      // If the token has not yet expired
      if (!isExpire) {
        dispatch({ type: "RETRIEVE_TOKEN", authToken });
        await setAuthToken(authToken);
        actions.setUserRole(userRole);
        actions.setUserProfile(userProfile);
        return;
      }
    }
    // If there was not an authentication or the token had expired
    dispatch({ type: "LOGOUT" });
  }),
});

export default Store;
