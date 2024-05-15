import axios from "axios";

const Api = axios.create({
    // baseURL: 'http://localhost:5001/'
    // baseURL: 'https://testop-backned.onrender.com'
    baseURL: 'https://binaries.uz/api/v1'
});

export default Api

