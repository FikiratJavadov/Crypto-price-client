import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
  const value = useSelector((state) => state.auth);

  return <>{value?.token ? <Outlet /> : <Navigate to="login" />}</>;
};

export default RequireAuth;
