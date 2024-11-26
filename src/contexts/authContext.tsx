'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AlertContext } from './alertContext';
import { useTranslations } from 'next-intl';

export interface AuthContextProps {
  verify: () => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: string;
}

interface AuthProviderProps {
  children: ReactNode;
  initialToken: string | null;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialToken }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialToken));
  const [user, setUser] = useState('');
  const { catchAlert } = useContext(AlertContext);
  const t = useTranslations('Errors');

  const verify = async () => {
    try {
      const response = await fetch('/api/verifyToken', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.token) {
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        catchAlert({ type: 'error', message: err.message });
      } else {
        catchAlert({ type: 'error', message: t('unknown_err') });
      }
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ verify, isAuthenticated, setIsAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
