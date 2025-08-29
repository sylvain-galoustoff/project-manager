import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ToastEntity } from "../types/toast.entity";

type ToasterContextType = {
  toaster: ToastEntity[];
  addToast: (toast: ToastEntity) => void;
  removeToast: (index: number) => void;
  clearToasts: () => void;
};

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useToaster() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
}

type ToasterProviderProps = {
  children: ReactNode;
};

export const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  const [toaster, setToaster] = useState<ToastEntity[]>([]);

  const addToast = (toast: ToastEntity) => {
    setToaster((prev) => [...prev, toast]);
  };

  const removeToast = (index: number) => {
    setToaster((prev) => prev.filter((_, i) => i !== index));
  };

  const clearToasts = () => setToaster([]);

  return (
    <ToasterContext.Provider value={{ toaster, addToast, removeToast, clearToasts }}>
      {children}
    </ToasterContext.Provider>
  );
};
