import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Shared/Loader";
import useAuth from "../hooks/useAuth";

const UserPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) return <Loader />;
  else if (user) return children;
  else return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default UserPrivateRoute;
