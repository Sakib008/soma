import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { Token } = useAuth();

  if (!Token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
