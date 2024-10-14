import React, { createContext, useState, ReactNode, FC, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  isLoading: boolean;
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setUserToken(token);
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = (token: string) => {
    setUserToken(token);
    AsyncStorage.setItem('token', token);
    setIsLoading(false);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('id');
    await AsyncStorage.removeItem('token');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isLoading, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
