import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, redirectTo, component }) => {
    return isAuthenticated ? component : <Navigate to={redirectTo} replace />;
  };

export default ProtectedRoute;