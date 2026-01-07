import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../api/apiService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUserParams = async () => {
      try {
        const response = await apiService.fetchUserProfile();
        if (response.data.successstatus) {
          setUser(response.data.data);
        }
      } catch (error) {
        // Not logged in or error
        console.log("User not logged in");
      } finally {
        setLoading(false);
      }
    };
    checkUserParams();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
    setUser(null);
    // Clear any local storage if used, but we rely on cookies mostly
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
