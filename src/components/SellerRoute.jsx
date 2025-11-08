import React from "react";
import { Navigate ,useNavigate } from "react-router-dom";
import UnauthorizedCard from "./UnauthorizedCard";
import { useAuthStore } from "../store/authStore";



const SellerRoute = ({ children }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // if seller, render children
  if (user && user.role === "seller") {
    return children;
  }

  // if authenticated but not a seller, show nice unauthorized UI
  if (user && user.role === "user") {
    return <UnauthorizedCard onBack={() => navigate(-1)} />;
  }

  // not authenticated -> redirect to login
  return <Navigate to="/login" replace />;
};

export default SellerRoute;