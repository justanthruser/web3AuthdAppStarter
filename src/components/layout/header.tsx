"use client";

import Link from 'next/link';
import { Layers, BookText } from 'lucide-react';
import { CivicAuthButton } from '@/components/auth/civic-auth-button';
import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Layers className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Web3Auth Starter</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/documentation" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
            <BookText size={16} /> Documentation
          </Link>
          <CivicAuthButton />
        </nav>
      </div>
    </header>
  );
}
