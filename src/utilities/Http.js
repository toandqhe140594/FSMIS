import axios from "axios";

// Create axios client, pre-configured with baseURL
const http = axios.create({
  baseURL: "http://103.170.123.80/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTYzMzcyNzI3IiwiaWF0IjoxNjM0NzAxMTkxLCJleHAiOjE2MzQ3ODc1OTF9.1tjdZKLGctxorCXi3NOAkZVN6FhLVvCRoGdpNxqQh1U",
  },
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  http.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default http;
