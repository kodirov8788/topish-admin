import axios from "axios";
axios.defaults.baseURL = "https://binaries.uz/api/v1";
export const BASE_URL = "https://binaries.uz/api/v1";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  const authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = authorization;
  return config;
});

export default axios;