// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" replace />;
}
