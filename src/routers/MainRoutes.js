import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default MainRoutes;
