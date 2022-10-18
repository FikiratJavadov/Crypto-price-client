import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoutes = () => {
  const value = useSelector((state) => state.auth);
  

  return <>{!value.token ? <Outlet /> : <Navigate to="/" />}</>;
};

export default AuthRoutes;
