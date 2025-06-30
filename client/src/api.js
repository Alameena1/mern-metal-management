import axios from "axios";
import { enqueueSnackbar } from "notistack";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GLOBAL ERROR HANDLER
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      enqueueSnackbar("You must be logged in to perform this action.", { variant: "error" });
    }
    return Promise.reject(error);
  }
);

export default API;
