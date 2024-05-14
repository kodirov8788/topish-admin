import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "/auth/login",
  async (body, thunkApi) => {}
);

export const logout = createAsyncThunk("auth/logout", () => {});
