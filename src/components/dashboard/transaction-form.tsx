"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SendHorizonal, Loader2 } from 'lucide-react';

export function TransactionForm() {
  const { sendTransaction, isLoading: authLoading } = useAuth();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toAddress || !amount) {
      // Basic validation, can be improved with react-hook-form
      alert('Please fill in both address and amount.');
      return;
    }
    setIsSending(true);
    await sendTransaction(toAddress, amount);
    setIsSending(false);
    // Optionally clear form:
    // setToAddress('');
    // setAmount('');
  };

  const effectiveLoading = authLoading || isSending;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2">
          <SendHorizonal className="h-7 w-7" /> Send Transaction (Simulated)
        </CardTitle>
        <CardDescription>
          Use your embedded wallet to send a simulated transaction.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="toAddress" className="text-foreground">Recipient Address</Label>
            <Input
              id="toAddress"
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              required
              className="bg-background focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.01"
              step="any"
              required
              className="bg-background focus:ring-primary focus:border-primary"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={effectiveLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-shadow">
            {effectiveLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SendHorizonal className="mr-2 h-4 w-4" />
            )}
            {isSending ? 'Sending...' : (authLoading ? 'Processing...' : 'Send Simulated Transaction')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
