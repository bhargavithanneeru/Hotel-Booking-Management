

import { createContext, useEffect, useReducer } from "react";

function parse(value) {
  try {
    return JSON.parse(value);
  } catch (_) {
    return value;
  }
}

const INITIAL_STATE = {
  user: parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};


export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
    case "FORGOT_PASSWORD_START": // Add registration start action
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
    case "FORGOT_PASSWORD_SUCCESS": // Add registration success action
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
    case "FORGOT_PASSWORD_FAILURE": // Add registration failure action
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const logout = () => {
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;`;
    });
    dispatch({ type: "LOGOUT" });
    // Add any additional logout logic, such as clearing cookies
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};




