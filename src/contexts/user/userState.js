import React, { useReducer } from "react";

import UserReducer from "./userReducer";
import UserContext from "./userContext";

const UserState = ({ children }) => {
  const initialState = {};

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const updateUser = (data) => {
    dispatch({
      type: "UPDATE_USER",
      payload: data,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
