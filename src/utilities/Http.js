import axios from "axios";
// import * as SecureStore from "expo-secure-store";

// Create axios client, pre-configured with baseURL
const http = axios.create({
  baseURL: "http://103.170.123.80/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${SecureStore.getItemAsync("userToken")}`,
  },
});

// Set JSON Web Token in Client to be included in all calls
export const setAuthToken = (authToken) => {
  http.defaults.headers.common.Authorization = authToken;
};

// Remove JSON Web Token in Client to be included in all calls
export const removeAuthToken = () => {
  delete http.defaults.headers.common.Authorization;
};

export default http;
