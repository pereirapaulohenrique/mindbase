'use client';

import { useState, useEffect } from 'react';
import { ImageIcon, Mic } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Item } from '@/types/database';

interface Attachment {
  id: string;
  type: 'image' | 'audio';
  url: string;
  filename: string;
  size: number;
  duration?: number;
  created_at: string;
}

interface ItemEditModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Item>) => Promise<void>;
}

export function ItemEditModal({ item, isOpen, onClose, onSave }: ItemEditModalProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setNotes(item.notes || '');
    }
  }, [item]);

  const handleSave = async () => {
    if (!item) return;
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    setIsSaving(true);
    try {
      await onSave(item.id, { title: title.trim(), notes: notes || null });
      toast.success('Item updated');
      onClose();
    } catch {
      toast.error('Failed to update item');
    } finally {
      setIsSaving(false);
    }
  };

  const attachments = Array.isArray(item?.attachments)
    ? (item.attachments as unknown as Attachment[])
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-[var(--shadow-float)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--text-primary)]">Edit Item</DialogTitle>
          <DialogDescription className="text-[var(--text-muted)]">
            Update the title, notes, or view attachments.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-[var(--text-secondary)]">Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Item title..."
              autoFocus
              className="rounded-xl border-[var(--border-default)] bg-[var(--bg-inset)]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-notes" className="text-[var(--text-secondary)]">Notes</Label>
            <Textarea
              id="edit-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              className="min-h-[120px] resize-none rounded-xl border-[var(--border-default)] bg-[var(--bg-inset)]"
            />
          </div>
          {attachments.length > 0 && (
            <div className="space-y-2">
              <Label className="text-[var(--text-secondary)]">Attachments</Label>
              <div className="flex flex-wrap gap-2">
                {attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-1.5 rounded-xl bg-[var(--bg-hover)] px-2.5 py-1.5 text-xs text-[var(--text-muted)]"
                  >
                    {att.type === 'image' ? (
                      <ImageIcon className="h-3 w-3" />
                    ) : (
                      <Mic className="h-3 w-3" />
                    )}
                    <span className="truncate max-w-[120px]">{att.filename}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-[var(--border-default)]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !title.trim()}
            className="rounded-xl bg-[var(--accent-base)] text-white hover:bg-[var(--accent-hover)]"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
