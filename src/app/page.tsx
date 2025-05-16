"use client";

import { useAuth } from '@/hooks/use-auth';
import { TransactionForm } from '@/components/dashboard/transaction-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, SendHorizonal } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const { isAuthenticated, walletAddress, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading your Web3 experience...</p>
      </div>
    );
  }
  
  // Loader2 component (simple version for above)
  function Loader2({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
  }


  if (isAuthenticated && walletAddress) {
    return (
      <div className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-2">
              <ShieldCheck className="h-8 w-8" /> Your Secure Dashboard
            </CardTitle>
            <CardDescription>
              Welcome back! Your Civic-powered embedded wallet is active.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              Your Wallet Address: <strong className="font-mono text-primary break-all">{walletAddress}</strong>
            </p>
            <p className="text-muted-foreground">
              You can now send transactions using your secure, non-custodial wallet.
            </p>
          </CardContent>
        </Card>

        <TransactionForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center space-y-12 py-10">
      <Card className="w-full max-w-2xl p-8 shadow-xl">
        <CardHeader className="items-center">
           <Image src="https://placehold.co/120x120/3F51B5/FFFFFF.png?text=W3A" alt="Web3Auth Starter Logo" width={100} height={100} className="rounded-full mb-6" data-ai-hint="modern abstract" />
          <CardTitle className="text-4xl font-extrabold tracking-tight text-primary">
            Welcome to Web3Auth Starter
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2 max-w-md">
            Experience seamless and secure Web3 authentication powered by Civic. Get your own embedded wallet instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <p className="text-foreground">
            Click the button in the header to connect your wallet and explore Web3 functionalities.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-shadow">
            <Link href="/documentation">
              Learn More About Civic Integration <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl text-left">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary"><ShieldCheck /> Secure Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Leverage Civic Pass for robust identity verification and secure access to your dApp. Say goodbye to complex seed phrases.</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary"><SendHorizonal /> Embedded Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Each user gets a dedicated, non-custodial wallet, managed seamlessly by the Civic Auth Web3 SDK, enabling easy transactions.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
