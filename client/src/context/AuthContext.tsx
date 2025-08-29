import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "@meloprojects/shared";

type AuthContextType = {
  authToken: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  user: User | undefined;
  setUser: (user: User) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken) setAuthToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));

    setLoading(false);
  }, []);

  const login = (token: string, user: User) => {
    setAuthToken(token);
    setUser(user);

    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  const logout = () => {
    setAuthToken(null);
    setUser(undefined);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
