import { GitFork } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-6 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Web3Auth Starter. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          This is a demo application showcasing Civic Auth integration.
        </p>
        <a 
          href="https://github.com/civicteam" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
          aria-label="Civic GitHub"
        >
          <GitFork size={16} /> Visit Civic on GitHub
        </a>
      </div>
    </footer>
  );
}
