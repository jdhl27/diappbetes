import { useContext } from "react";
import UserContext from "../contexts/user/userContext";

export const ValidateUser = ({ children }) => {
  // Context for user selected
  const userData = localStorage.getItem("user");
  const { user, updateUser } = useContext(UserContext);

  if (userData && (!user || Object.keys(user).length === 0)) {
    updateUser(JSON.parse(userData));
  }

  return children;
};
