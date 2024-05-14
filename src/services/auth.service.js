import axios from "../api/api";

const AuthService = {
  async userLogin(body) {
    try {
      const response = await axios.post("/auth/login/", body);
      return response;
    } catch (error) {
      if (error?.response?.status == 400) {
        return error.response.data.error;
      }
    }
  },
};

export default AuthService;
