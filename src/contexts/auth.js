import { createContext } from "react";
import React, { useReducer } from "react";

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const token = window.localStorage.token;
  const initialState = token;

  const Reducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
      case "UPDATE_AUTH":
        return payload;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateToken = (data) => {
    dispatch({
      type: "UPDATE_AUTH",
      payload: data,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken: state,
        updateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
