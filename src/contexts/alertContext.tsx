'use client';
import { Alert } from '@/components/alert/Alert';
import React, { createContext, ReactNode, useRef, useState } from 'react';

interface AlertContextProps {
  catchAlert: (message: AlertStatus) => void;
}

export type AlertStatus = { type: 'error' | 'successful' | null; message: string | null };

export const AlertContext = createContext<AlertContextProps>({
  catchAlert: () => {},
});
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AlertStatus>({ type: null, message: null });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const catchAlert = (status: AlertStatus) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setStatus(status);
    timeoutRef.current = setTimeout(() => {
      setStatus({ type: null, message: null });
    }, 2500);
  };

  return (
    <AlertContext.Provider value={{ catchAlert }}>
      {children}
      <div>{status.type && status.message ? <Alert status={status} /> : null}</div>
    </AlertContext.Provider>
  );
};
