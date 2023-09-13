import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const account = useSelector((state) => state.user);
  if (!account.isAuthenticated) return <Navigate to="/signin" />;
  return <div>{children}</div>;
};

export default PrivateRoute;
