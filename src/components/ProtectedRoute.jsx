import { Navigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext.jsx";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
};
