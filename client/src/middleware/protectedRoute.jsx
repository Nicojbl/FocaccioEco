import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ isAuthenticated, redirectTo, component }) => {
  console.log(isAuthenticated);
    return isAuthenticated ? component : <Navigate to={redirectTo} replace />;
  };
