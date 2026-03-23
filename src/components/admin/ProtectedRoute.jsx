import { Navigate } from "react-router-dom";
import { getAuthToken } from "../../services/api";

const ProtectedRoute = ({ children }) => {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/admin/auth/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
