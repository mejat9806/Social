import { UserContext } from "@/context/userContext";
import React, { ReactNode, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { user } = useContext<any>(UserContext);
  console.log(user);
  return user?.email ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
