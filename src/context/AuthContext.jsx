import { createContext, useContext, useState } from 'react';
import * as authApi from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('skd_user');
    return stored ? JSON.parse(stored) : null;
  });

  function persist(authResponse) {
    // authResponse shape matches AuthResponseDTO: { token, fullName, email, role }
    const { token, ...userInfo } = authResponse;
    localStorage.setItem('skd_token', token);
    localStorage.setItem('skd_user', JSON.stringify(userInfo));
    setUser(userInfo);
  }

  async function login(credentials) {
    const { data } = await authApi.login(credentials);
    persist(data);
    return data;
  }

  async function register(details) {
    const { data } = await authApi.register(details);
    persist(data);
    return data;
  }

  function logout() {
    localStorage.removeItem('skd_token');
    localStorage.removeItem('skd_user');
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
