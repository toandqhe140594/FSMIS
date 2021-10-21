import axios from "axios";

// Create axios client, pre-configured with baseURL
const http = axios.create({
  baseURL: "http://103.170.123.80/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
