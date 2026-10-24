import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing session on load only if on admin path or admin flag is set
  useEffect(() => {
    async function checkAuth() {
      const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';
      const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
      const hasSessionFlag = typeof localStorage !== 'undefined' && localStorage.getItem('admin_session') === '1';

      // Don't poll /auth/me on initial /admin/login visit if no stored session flag
      if ((isLoginPage && !hasSessionFlag) || (!isAdminRoute && !hasSessionFlag)) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.admin.me();
        if (res?.success && res.admin) {
          setAdmin(res.admin);
          localStorage.setItem('admin_session', '1');
        } else {
          localStorage.removeItem('admin_session');
          localStorage.removeItem('admin_token');
        }
      } catch (err) {
        setAdmin(null);
        localStorage.removeItem('admin_session');
        localStorage.removeItem('admin_token');
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
      localStorage.setItem('admin_session', '1');
      if (res.token) {
        localStorage.setItem('admin_token', res.token);
      }
    }
    return res;
  };

  const logout = async () => {
    try {
      await api.admin.logout();
    } finally {
      setAdmin(null);
      localStorage.removeItem('admin_session');
      localStorage.removeItem('admin_token');
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
