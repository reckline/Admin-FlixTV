import { createContext, useEffect, useReducer } from "react";

// --- GLOBAL API CONFIG (AUTO-SWITCHING) ---
// Is logic se local aur live dono bina change kiye chalenge
export const API_URL = 
  window.location.hostname === "localhost" 
    ? "http://localhost:5000/api" 
    : (import.meta.env.VITE_API_URL || "https://moviesmode.org/api");

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, isFetching: true, error: false };
    case "LOGIN_SUCCESS":
      return { user: action.payload, isFetching: false, error: false };
    case "LOGIN_FAILURE":
      return { user: null, isFetching: false, error: true };
    case "LOGOUT":
      return { user: null, isFetching: false, error: false };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  user: (() => {
    try {
      const savedUser = localStorage.getItem("user");
      // Security check: Agar data corrupted hai toh null return karega
      return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
    } catch (e) { 
      console.error("Local Storage Parse Error:", e);
      return null; 
    }
  })(),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    // Sync User with Local Storage
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        API_URL, // Auto-switching URL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};