'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: null;
  role: null;
  loading: false;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{
      user: null,
      role: null,
      loading: false,
      signInWithGoogle: async () => {},
      logout: async () => {},
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
