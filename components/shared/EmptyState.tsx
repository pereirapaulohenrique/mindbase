'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ICON_MAP } from '@/components/icons';

interface EmptyStateProps {
  icon?: React.ReactNode | string;
  iconName?: string; // Lucide icon name from ICON_MAP
  title: string;
  description: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function EmptyState({
  icon,
  iconName,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  // Resolve icon
  let IconComponent: LucideIcon | null = null;
  if (iconName) {
    IconComponent = ICON_MAP[iconName] || null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      {IconComponent ? (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <IconComponent className="h-8 w-8 text-muted-foreground" />
        </div>
      ) : icon ? (
        <div className="mb-4 text-4xl text-muted-foreground">{icon}</div>
      ) : null}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">{description}</p>
      {action && (
        action.href ? (
          <Button asChild variant="default">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        ) : action.onClick ? (
          <Button onClick={action.onClick} variant="default">
            {action.label}
          </Button>
        ) : null
      )}
    </motion.div>
  );
}
