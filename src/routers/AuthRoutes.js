import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/LoginPage";
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<h1>Hello eee</h1>} />
    </Routes>
  );
}

export default AuthRoutes;
