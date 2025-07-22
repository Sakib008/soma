import { createContext, useContext, useState, useEffect, } from "react";
import { login, signup } from "../utils/services/index";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  // Use state for token and user
  const [Token, setToken] = useState("");
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // On mount, initialize from localStorage
  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setToken(storedToken ?? '');
    setUser(storedUser ?? null);
    setLoading(false);
  }, []);
  const loginHandler = async (username, password) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await login({ username, password });
      if (status === 200 || status === 201) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(foundUser));
        setToken(encodedToken);
        setUser(foundUser);
        console.log("Login successful, user set in context");
      }
    } catch (error) {
      console.error("Error in Login Handle", error.message);
      throw error;
    }
  };

  const signupUser = async (userdata) => {
    try {
      const { data: { createdUser, encodedToken }, status } = await signup(userdata);
      if (status === 200 || status === 201) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(createdUser));
        setToken(encodedToken);
        setUser(createdUser);
        
      }
    } catch (error) {
      console.error("Error : ", error.message);
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    console.log("All Auth deleted");
  };

  return (
    <AuthContext.Provider value={{ Token, loginHandler,loading, User, signupUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
