import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import UserContext from "../contexts/user/userContext";

export const ProtectedRoutes = ({
  children,
  isMedical = false,
  redirectTo = "/login",
}) => {
  // Context for user selected
  const { authToken } = useContext(AuthContext);
  const { user, updateUser } = useContext(UserContext);

  const userData = localStorage.getItem("user");

  if (userData && (!user || Object.keys(user).length === 0)) {
    updateUser(JSON.parse(userData));
  }

  if (!authToken) {
    return <Navigate to={redirectTo} />;
  }

  if (user.isMedical && isMedical) {
    return children ? children : <Outlet />;
  }

  if (!isMedical) {
    return children ? children : <Outlet />;
  }

  return <Navigate to={"/"} />;
};
