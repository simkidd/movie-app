import React from "react";
import auth from "../firebase";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = auth;

  return currentUser ? <Outlet /> : <Navigate to="/account/login" />;
};

export default ProtectedRoute;
