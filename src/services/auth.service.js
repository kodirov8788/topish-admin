import { toast } from "react-toastify";
import axios from "../api/api";

const AuthService = {
  async userLogin(body) {
    try {
      const response = await axios.post("/auth/sign-in/", body);
      console.log(body);
      if (response?.status === 200) {
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
        toast.success("Muvaffaqqiyatli saytga kirdingiz!", {
          position: toast.POSITION.TOP_RIGHT,
        });        return response;
      }
    } catch (error) {
      if (error?.response?.status == 400) {
        console.log(error);
        return error.response.data.error;
      }
    }
  },
};

export default AuthService;
