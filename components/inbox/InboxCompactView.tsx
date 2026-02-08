'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/ui';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils/dates';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageIcon, Mic } from 'lucide-react';
import type { Item, Destination } from '@/types/database';

interface InboxCompactViewProps {
  items: Item[];
  destinations: Destination[];
  onUpdate: (id: string, updates: Partial<Item>) => void;
  onDelete: (id: string) => void;
  onProcess: (item: Item) => void;
}

export function InboxCompactView({
  items,
  destinations,
  onUpdate,
  onDelete,
  onProcess,
}: InboxCompactViewProps) {
  const { openProcessingPanel } = useUIStore();

  const handleComplete = (item: Item) => {
    onUpdate(item.id, {
      is_completed: !item.is_completed,
      completed_at: item.is_completed ? null : new Date().toISOString(),
    });
  };

  return (
    <div className="rounded-2xl bg-[var(--bg-surface)] shadow-[var(--shadow-card)] border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)]">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const hasAttachments = Array.isArray(item.attachments) && (item.attachments as any[]).length > 0;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: index * 0.01 }}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-[var(--bg-hover)] transition-colors',
                item.is_completed && 'opacity-50'
              )}
              onClick={() => openProcessingPanel(item.id)}
            >
              {/* Checkbox */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleComplete(item);
                }}
              >
                <Checkbox
                  checked={item.is_completed}
                  className={cn(
                    'h-[15px] w-[15px] rounded-full',
                    item.is_completed && 'border-[var(--layer-commit)] bg-[var(--layer-commit)] text-white data-[state=checked]:bg-[var(--layer-commit)] data-[state=checked]:border-[var(--layer-commit)]'
                  )}
                />
              </div>

              {/* Title */}
              <span
                className={cn(
                  'flex-1 text-sm text-[var(--text-primary)] truncate',
                  item.is_completed && 'line-through text-[var(--text-muted)]'
                )}
              >
                {item.title}
              </span>

              {/* Attachment indicator */}
              {hasAttachments && (
                <span className="flex items-center gap-0.5 text-[var(--text-disabled)]">
                  {(item.attachments as any[]).some((a: any) => a.type === 'image') && <ImageIcon className="h-3 w-3" />}
                  {(item.attachments as any[]).some((a: any) => a.type === 'audio') && <Mic className="h-3 w-3" />}
                </span>
              )}

              {/* Time */}
              <span className="text-xs text-[var(--text-disabled)] whitespace-nowrap">
                {formatRelativeTime(item.created_at)}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
