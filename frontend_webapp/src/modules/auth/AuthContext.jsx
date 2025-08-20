import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../../services/mock/authService';

/**
 * Authentication context holding user state and actions.
 */
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Returns the auth context value: { user, login, signup, logout, loading, error } */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides authentication state and actions to the component tree.
   * Restores user from localStorage on mount and uses mock auth service.
   */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hms_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore storage issues
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, role) => {
    setError('');
    try {
      const u = await authService.login(email, password, role);
      setUser(u);
      localStorage.setItem('hms_user', JSON.stringify(u));
      return u;
    } catch (e) {
      setError(e.message || 'Login failed');
      throw e;
    }
  };

  const signup = async (payload) => {
    setError('');
    try {
      const u = await authService.signup(payload);
      setUser(u);
      localStorage.setItem('hms_user', JSON.stringify(u));
      return u;
    } catch (e) {
      setError(e.message || 'Signup failed');
      throw e;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('hms_user');
  };

  const value = useMemo(() => ({ user, login, signup, logout, loading, error }), [user, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
