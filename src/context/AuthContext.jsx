import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logoutAdmin, isAuthenticatedAdmin } from '../backend/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const status = isAuthenticatedAdmin();
    setIsAuthenticated(status);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginAdmin(email, password);
    if (res.success) {
      setIsAuthenticated(true);
    }
    return res;
  };

  const logout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
