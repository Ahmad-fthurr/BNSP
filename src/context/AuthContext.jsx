import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "https://fathur.petik.or.id";

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      // Handle different API response structures
      let userData = response.data.user || response.data.data;
      
      if (!userData && response.data.token) {
        try {
          const payload = JSON.parse(atob(response.data.token.split('.')[1]));
          userData = payload;
        } catch (e) {
          console.error("Token decode error:", e);
        }
      }

      if (!userData) {
        userData = response.data;
      }
      
      if (userData && (userData.email || userData.nama || userData.name || response.data.token)) {
        // Ensure role exists, default to 'customer' if not provided
        if (!userData.role) {
          userData.role = response.data.role || ((userData.email && userData.email.includes("admin")) ? "admin" : "customer");
        }
        
        if (!userData.nama && !userData.name && response.data.msg) {
           userData.nama = response.data.msg.replace("Login berhasil ", "");
        }
        
        if (response.data.token) {
          userData.token = response.data.token;
        }
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, message: "Data user tidak ditemukan" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: error.response?.data?.msg || error.response?.data?.message || "Login failed" };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, userData);
      if (response.data) {
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.msg || error.response?.data?.message || "Registration failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
