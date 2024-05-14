import axios from "../api/api";
import { message } from "antd";

const AuthService = {
  async userLogin(body) {
    try {
      const response = await axios.post("/auth/login/", body);
      return response;
    } catch (error) {
      if (error?.response?.status == 400) {
        message.error("Login yoki username xato");
      }
    }
  },
};

export default AuthService;
