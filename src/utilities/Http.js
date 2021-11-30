import axios from "axios";

import envs from "../config/env";

// Create axios client, pre-configured with baseURL
const http = axios.create({
  baseURL: envs.API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${SecureStore.getItemAsync("userToken")}`,
  },
});

/**
 * Set JSON Web Token in Client to be included in all calls
 * @param {String} authToken jwt authentication token
 */
export const setAuthToken = (authToken) => {
  http.defaults.headers.common.Authorization = authToken;
};

/**
 * Remove JSON Web Token in Client to be included in all calls
 */
export const removeAuthToken = () => {
  delete http.defaults.headers.common.Authorization;
};

/**
 * Set a function to be call before each request
 * @param {Function} beforeRequestFunction function that will be execute before each request
 */
export const setBeforeRequestFunction = (beforeRequestFunction) => {
  http.interceptors.request.use((config) => {
    beforeRequestFunction();
    return config;
  });
};

/**
 * Set a function that will set error message for the app after each fail request
 * @param {Function} setErrorMessage a function to set error message get from request for the app
 */
export const setRequestErrorMessageHandling = (setErrorMessage) => {
  http.interceptors.response.use(
    (response) => response,
    (error) => {
      setErrorMessage(error.response?.data || {});
      throw error;
    },
  );
};

export default http;
