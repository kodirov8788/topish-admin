import { toast } from "react-toastify";
import axios from "../api/api";


const AuthService = {
  async userLogin(body) {
    try {
      const response = await axios.post("/auth/sign-in/", body);
      console.log(body);
      if (response?.status === 200) {
        localStorage.setItem("userTokenId", JSON.stringify(response?.data?.data.id));
        toast.success("Muvaffaqqiyatli saytga kirdingiz!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.replace('/admin')
        return response;
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        console.log(error);
        toast.error("Telefon raqam yoki parol xato!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return error.response.data.error;
      }
    }
  },
};

export default AuthService;
