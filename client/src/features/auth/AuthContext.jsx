import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing session on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await api.admin.me();
        if (res?.success && res.admin) {
          setAdmin(res.admin);
        }
      } catch (err) {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.admin.login({ email, password });
    if (res?.success && res.admin) {
      setAdmin(res.admin);
    }
    return res;
  };

  const logout = async () => {
    try {
      await api.admin.logout();
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
