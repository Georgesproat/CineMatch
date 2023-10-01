import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ redirectPath = "/login", children }) {
  const isAuthenticated = localStorage.getItem("token");


  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
