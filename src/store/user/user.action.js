import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

export const login = createAsyncThunk(
  "/auth/login",
  async (body, thunkApi) => {
      try {
        const response = await AuthService.userLogin(body);
        return response.data;
      } catch (error) {
        return "";
      }
    
  }
);

export const logout = createAsyncThunk("auth/logout", () => {});
