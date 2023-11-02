import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
