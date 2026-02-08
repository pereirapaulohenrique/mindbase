'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/ui';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils/dates';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageIcon, Mic, Calendar } from 'lucide-react';
import type { Item, Destination } from '@/types/database';

interface InboxGridViewProps {
  items: Item[];
  destinations: Destination[];
  onUpdate: (id: string, updates: Partial<Item>) => void;
  onDelete: (id: string) => void;
  onProcess: (item: Item) => void;
}

export function InboxGridView({
  items,
  destinations,
  onUpdate,
  onDelete,
  onProcess,
}: InboxGridViewProps) {
  const { openProcessingPanel } = useUIStore();

  const handleComplete = (item: Item) => {
    onUpdate(item.id, {
      is_completed: !item.is_completed,
      completed_at: item.is_completed ? null : new Date().toISOString(),
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const hasImages = Array.isArray(item.attachments) && (item.attachments as any[]).some((a: any) => a.type === 'image');
          const hasAudio = Array.isArray(item.attachments) && (item.attachments as any[]).some((a: any) => a.type === 'audio');

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.02 }}
              className={cn(
                'group rounded-2xl bg-[var(--bg-surface)] p-4 shadow-[var(--shadow-card)] border border-[var(--border-subtle)] cursor-pointer transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-px',
                item.is_completed && 'opacity-50'
              )}
              onClick={() => openProcessingPanel(item.id)}
            >
              {/* Header: checkbox + title */}
              <div className="flex items-start gap-2.5">
                <div
                  className="pt-0.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete(item);
                  }}
                >
                  <Checkbox
                    checked={item.is_completed}
                    className={cn(
                      'h-[16px] w-[16px] rounded-full',
                      item.is_completed && 'border-[var(--layer-commit)] bg-[var(--layer-commit)] text-white data-[state=checked]:bg-[var(--layer-commit)] data-[state=checked]:border-[var(--layer-commit)]'
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    'text-sm font-medium leading-snug text-[var(--text-primary)] line-clamp-2',
                    item.is_completed && 'line-through text-[var(--text-muted)]'
                  )}
                >
                  {item.title}
                </h3>
              </div>

              {/* Notes preview */}
              {item.notes && (
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-3">
                  {item.notes}
                </p>
              )}

              {/* Footer: meta info */}
              <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-disabled)]">
                {hasImages && <ImageIcon className="h-3 w-3" />}
                {hasAudio && <Mic className="h-3 w-3" />}
                {item.scheduled_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                  </span>
                )}
                <span className="ml-auto">{formatRelativeTime(item.created_at)}</span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
