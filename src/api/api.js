import axios from "axios";

const Api = axios.create({
    // baseURL: 'http://localhost:5001/'
    // baseURL: 'https://testop-backned.onrender.com'
    baseURL: 'https://fastfind.uz'
});

export default Api

