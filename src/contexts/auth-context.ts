import type { ReactNode } from 'react';
import { createContext } from 'react';

export interface User {
  id: string;
  // Add other user properties if needed
}

export interface AuthContextType {
  user: User | null;
  walletAddress: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  sendTransaction: (to: string, amount: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
