import { JSX } from "react";
import { Navigate, Outlet } from "react-router";


function ProtectedRoutes(): JSX.Element {
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") ?? "") : "";
  const isAuthenticated: boolean = user?._id ?? false;
  return isAuthenticated ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default ProtectedRoutes;
