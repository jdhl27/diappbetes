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
  const { user } = useContext(UserContext);
  console.log("TOKEN: ", authToken);
  console.log("user: ", user);

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
