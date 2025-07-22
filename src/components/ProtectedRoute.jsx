import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { Token,loading } = useAuth();
  console.log("Token in ProtectedRoute:", Token);
  if(loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>; 
  };    
  if (!Token) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
