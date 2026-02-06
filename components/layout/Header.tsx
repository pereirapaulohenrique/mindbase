'use client';

import { Search } from 'lucide-react';
import { useUIStore } from '@/stores/ui';
import { Button } from '@/components/ui/button';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  title?: string;
  user?: {
    email: string;
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
  mobileSidebar?: React.ReactNode;
}

export function Header({ title, user, mobileSidebar }: HeaderProps) {
  const { setCommandPaletteOpen, sidebarCollapsed } = useUIStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/70 px-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {mobileSidebar}
        {title && (
          <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Command palette trigger */}
        <Button
          variant="outline"
          className="hidden h-9 w-72 justify-between border-border/60 text-sm text-muted-foreground hover:border-border hover:text-foreground sm:flex"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" />
            <span>Search or command...</span>
          </div>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/60 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 sm:hidden"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* User menu */}
        <UserMenu user={user} />
      </div>
    </header>
  );
}
