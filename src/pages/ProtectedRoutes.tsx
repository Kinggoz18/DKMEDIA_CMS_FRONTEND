import { JSX } from "react";
import { Navigate, Outlet } from "react-router";


function ProtectedRoutes(): JSX.Element {
  const isAuthenticated: boolean = true;
  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
