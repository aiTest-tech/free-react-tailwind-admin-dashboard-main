// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSendloginCredentialsMutation, useRefreshTokenMutation } from '../features/authApi';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: any;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [sendLogin, { isLoading }] = useSendloginCredentialsMutation();
  const [refreshToken, { isLoading: isRefreshing }] = useRefreshTokenMutation();

  useEffect(() => {
    const refreshTokenCookie = Cookies.get('refresh_token');
    if (refreshTokenCookie) {
      refreshAccessToken(refreshTokenCookie);
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await sendLogin(credentials).unwrap();
      const { access, refresh } = response;
      localStorage.setItem('access_token', access);
      Cookies.set('refresh_token', refresh, { secure: true, sameSite: 'Strict' });
      setUser({ email: credentials.email });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    Cookies.remove('refresh_token');
    setUser(null);
  };

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await refreshToken({ refreshToken }).unwrap();
      const { access } = response;
      localStorage.setItem('access_token', access);
    } catch (error) {
      console.error('Session expired or refresh failed, logging out', error);
      logout();
    }
  };

  const autoRefreshToken = () => {
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const jwtPayload = JSON.parse(atob(accessToken.split('.')[1])); // Decode JWT
        const expTime = jwtPayload.exp * 1000; // Convert exp to ms
        const currentTime = Date.now();

        // If the token is about to expire in 30 seconds, refresh it
        if (expTime - currentTime <= 30000) {
          const refreshToken = Cookies.get('refresh_token');
          if (refreshToken) {
            refreshAccessToken(refreshToken);
          }
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const cleanup = autoRefreshToken();
    return cleanup;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
