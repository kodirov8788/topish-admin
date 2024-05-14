// import axios from "axios";

// const Api = axios.create({
//     // baseURL: 'http://localhost:5001/'
//     // baseURL: 'https://testop-backned.onrender.com'
//     baseURL: 'https://fastfind.uz'
// });

// export default Api

import axios from "axios";

axios.defaults.baseURL = "https://fastfind.uz";

export const BASE_URL = "https://fastfind.uz";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  const authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = authorization;
  return config;
});

export default axios;