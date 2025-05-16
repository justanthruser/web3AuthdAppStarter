// This is a mock implementation of Civic SDK interactions.
// In a real application, you would use the @civic/auth-web3 SDK.

import type { User } from '@/contexts/auth-context';

// Simulate a delay to mimic network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const civicService = {
  login: async (): Promise<{ user: User; walletAddress: string }> => {
    await delay(1000);
    // Simulate successful login
    const mockUser: User = { id: 'civic-user-123' };
    // Simulate embedded wallet address generation
    const mockWalletAddress = `0x${Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
    console.log('Mock Civic Login: User authenticated, wallet generated:', mockWalletAddress);
    return { user: mockUser, walletAddress: mockWalletAddress };
  },

  logout: async (): Promise<void> => {
    await delay(500);
    // Simulate logout
    console.log('Mock Civic Logout: User logged out');
  },

  sendTransaction: async (from: string, to: string, amount: string): Promise<boolean> => {
    await delay(1500);
    // Simulate transaction sending
    // In a real scenario, this would involve signing with the embedded wallet
    // and broadcasting to the blockchain.
    if (!to || !amount || parseFloat(amount) <= 0) {
      console.error('Mock Civic Send Transaction: Invalid transaction details.', { from, to, amount });
      return false;
    }
    console.log(`Mock Civic Send Transaction: Simulating sending ${amount} ETH from ${from} to ${to}`);
    // Simulate a 90% success rate
    const success = Math.random() < 0.9;
    if (success) {
      console.log('Mock Civic Send Transaction: Transaction successful (simulated)');
    } else {
      console.error('Mock Civic Send Transaction: Transaction failed (simulated)');
    }
    return success;
  },

  // This function would typically initialize the Civic SDK client.
  // For this mock, it does nothing.
  initialize: () => {
    console.log('Mock Civic SDK Initialized (simulated)');
  },
};

// Call initialize on script load (simulated)
civicService.initialize();
