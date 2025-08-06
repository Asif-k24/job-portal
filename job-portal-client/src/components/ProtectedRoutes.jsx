import { Outlet, Navigate, useLocation } from "react-router-dom";

export const ProtectedRoutes = () => {
  const user = localStorage.getItem("token");
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname, error: "Login Required" }}
        replace
      />
    );
  }

  return <Outlet />;
};
