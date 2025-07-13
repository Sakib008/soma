import { createContext, useContext } from "react";
import { login, signup } from "../utils/services/index";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const Token = JSON.parse(localStorage.getItem("token")) ?? "";
  const User = JSON.parse(localStorage.getItem("user")) ?? "";

  const loginHandler = async (username, password) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await login({ username, password });
      if (status === 200 || status === 201) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(foundUser));
      }
    } catch (error) {
      console.error("Error in Login Handle", error.message);
      throw error;
    }
  };

  const signupUser = async (userdata) => {
    try {
      const { data, status } = await signup(userdata);
      if (status === 200 || status === 201) {
        console.log("Data of the user : ", data);
      }
    } catch (error) {
      console.error("Error : ", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ Token, loginHandler, User, signupUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
