import { useContext } from "react";
import UserContext from "../contexts/user/userContext";

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export const ValidateUser = ({ children }) => {
  // Context for user selected
  const userData = localStorage.getItem("user");
  const { user, updateUser } = useContext(UserContext);

  if (userData && (!user || Object.keys(user).length === 0)) {
    updateUser(isJson(userData));
  }

  return children;
};
