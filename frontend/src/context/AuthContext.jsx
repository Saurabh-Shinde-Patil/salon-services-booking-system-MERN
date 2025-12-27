import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // THIS IS WHERE useEffect GOES
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await api.get("/auth/getme");
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []); //  VERY IMPORTANT

  //  LOGIN FUNCTION
  const login = async (data) => {
    try {
      await api.post("/auth/login", data);   // sets cookie
      const res = await api.get("/auth/getme"); // reads cookie
      setUser(res.data);                      // updates state
    } catch (error) {
      throw error; // Re-throw the error to be caught by the component
    }
  };

  // LOGOUT FUNCTION (optional now)
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
