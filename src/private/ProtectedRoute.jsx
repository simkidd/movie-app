import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../firebase";

const ProtectedRoute = () => {
  const { currentUser } = auth;

  return currentUser ? <Outlet /> : <Navigate to="/account/login" />;
};

export default ProtectedRoute;
