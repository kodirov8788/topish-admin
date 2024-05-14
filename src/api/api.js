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
  let i18n = localStorage.getItem("_i18n");
  const authorization = token ? `Bearer ${token}` : "";
  config.headers.Authorization = authorization;
  config.headers["Accept-Language"] = `${i18n}`;
  return config;
});

export default axios;