"use client";

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { AuthContext, type User } from '@/contexts/auth-context';
import { civicService } from '@/lib/civic'; // Mock service
import { useToast } from '@/hooks/use-toast';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true to check initial auth status
  const { toast } = useToast();

  // Simulate checking auth status on mount
  useEffect(() => {
    // In a real app, you might check local storage or make an API call
    // For now, we assume the user is not logged in initially.
    setIsLoading(false);
  }, []);

  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      const { user: loggedInUser, walletAddress: newWalletAddress } = await civicService.login();
      setUser(loggedInUser);
      setWalletAddress(newWalletAddress);
      setIsAuthenticated(true);
      toast({
        title: "Connected Successfully",
        description: `Wallet: ${newWalletAddress.substring(0, 6)}...${newWalletAddress.substring(newWalletAddress.length - 4)}`,
      });
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      toast({
        title: "Connection Failed",
        description: "Could not connect with Civic. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await civicService.logout();
      setUser(null);
      setWalletAddress(null);
      setIsAuthenticated(false);
      toast({
        title: "Disconnected",
        description: "You have been successfully disconnected.",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Disconnection Failed",
        description: "Could not disconnect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const sendTransaction = useCallback(async (to: string, amount: string): Promise<boolean> => {
    if (!walletAddress) {
      toast({
        title: "Transaction Error",
        description: "Not authenticated or no wallet address found.",
        variant: "destructive",
      });
      return false;
    }
    setIsLoading(true);
    try {
      const success = await civicService.sendTransaction(walletAddress, to, amount);
      if (success) {
        toast({
          title: "Transaction Sent (Simulated)",
          description: `Successfully sent ${amount} to ${to.substring(0,6)}...`,
        });
      } else {
        toast({
          title: "Transaction Failed (Simulated)",
          description: "The simulated transaction could not be completed.",
          variant: "destructive",
        });
      }
      return success;
    } catch (error) {
      console.error("Send transaction failed:", error);
      toast({
        title: "Transaction Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, toast]);

  return (
    <AuthContext.Provider
      value={{ user, walletAddress, isAuthenticated, isLoading, login, logout, sendTransaction }}
    >
      {children}
    </AuthContext.Provider>
  );
}
