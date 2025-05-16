"use client";

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { WalletCards, LogOut, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function CivicAuthButton() {
  const { isAuthenticated, isLoading, login, logout, walletAddress, user } = useAuth();

  if (isLoading) {
    return (
      <Button disabled variant="outline" className="w-[180px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && walletAddress) {
    const shortAddress = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 shadow-sm">
             <Avatar className="h-6 w-6">
              <AvatarImage src={`https://placehold.co/40x40/3F51B5/FFFFFF.png?text=${shortAddress.substring(2,4).toUpperCase()}`} alt={user?.id || "User"} data-ai-hint="abstract geometric" />
              <AvatarFallback>{shortAddress.substring(2,4).toUpperCase()}</AvatarFallback>
            </Avatar>
            {shortAddress}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <span className="text-xs text-muted-foreground">Wallet:</span>
            <span className="ml-1 text-xs font-mono">{shortAddress}</span>
          </DropdownMenuItem>
           <DropdownMenuItem disabled>
             <span className="text-xs text-muted-foreground">User ID:</span>
            <span className="ml-1 text-xs">{user?.id}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={login} variant="default" className="shadow-md hover:shadow-lg transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground">
      <WalletCards className="mr-2 h-5 w-5" />
      Connect with Civic
    </Button>
  );
}
