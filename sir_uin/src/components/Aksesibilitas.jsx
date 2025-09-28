import React from "react";
import { Navigate } from "react-router-dom";

function Aksesibilitas({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}

export default Aksesibilitas;
