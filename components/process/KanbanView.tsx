'use client';

import { useCallback, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import {
  Calendar,
  MoreHorizontal,
  Trash2,
  Check,
  RotateCcw,
  Inbox,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ICON_MAP, COLOR_PALETTE } from '@/components/icons';
import type { Item, Destination } from '@/types/database';

interface KanbanViewProps {
  items: Item[];
  destinations: Destination[];
  onMoveToDestination: (itemId: string, destinationId: string) => void;
  onUpdateItem: (id: string, updates: Partial<Item>) => void;
  onDeleteItem: (id: string) => void;
  onScheduleItem: (itemId: string, scheduledAt: string) => void;
  onItemClick?: (item: Item) => void;
}

export function KanbanView({
  items,
  destinations,
  onMoveToDestination,
  onUpdateItem,
  onDeleteItem,
  onScheduleItem,
  onItemClick,
}: KanbanViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group items by destination
  const itemsByDestination = destinations.reduce(
    (acc, dest) => {
      acc[dest.id] = items.filter((item) => item.destination_id === dest.id);
      return acc;
    },
    {} as Record<string, Item[]>
  );

  // Uncategorized items
  const uncategorizedItems = items.filter((item) => !item.destination_id);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const activeItemId = active.id as string;
      const overId = over.id as string;

      // Check if dropped on a destination column
      const targetDestination = destinations.find((d) => d.id === overId);
      if (targetDestination) {
        const activeItem = items.find((i) => i.id === activeItemId);
        if (activeItem && activeItem.destination_id !== targetDestination.id) {
          onMoveToDestination(activeItemId, targetDestination.id);
        }
        return;
      }

      // Check if dropped on uncategorized zone
      if (overId === 'uncategorized') {
        const activeItem = items.find((i) => i.id === activeItemId);
        if (activeItem && activeItem.destination_id !== null) {
          // Move to uncategorized (remove destination)
          onUpdateItem(activeItemId, { destination_id: null });
        }
        return;
      }

      // Check if dropped on another item
      const overItem = items.find((i) => i.id === overId);
      if (overItem && overItem.destination_id) {
        const activeItem = items.find((i) => i.id === activeItemId);
        if (activeItem && activeItem.destination_id !== overItem.destination_id) {
          onMoveToDestination(activeItemId, overItem.destination_id);
        }
      }
    },
    [destinations, items, onMoveToDestination, onUpdateItem]
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    // Visual feedback handled by CSS
  }, []);

  const activeItem = activeId ? items.find((i) => i.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {/* Uncategorized column */}
        {uncategorizedItems.length > 0 && (
          <KanbanColumn
            id="uncategorized"
            title="Uncategorized"
            iconName="inbox"
            items={uncategorizedItems}
            destinations={destinations}
            onUpdateItem={onUpdateItem}
            onDeleteItem={onDeleteItem}
            onMoveToDestination={onMoveToDestination}
            onScheduleItem={onScheduleItem}
            onItemClick={onItemClick}
          />
        )}

        {/* Destination columns */}
        {destinations.map((destination) => (
          <KanbanColumn
            key={destination.id}
            id={destination.id}
            title={destination.name}
            iconName={destination.icon}
            color={destination.color}
            items={itemsByDestination[destination.id] || []}
            destinations={destinations}
            onUpdateItem={onUpdateItem}
            onDeleteItem={onDeleteItem}
            onMoveToDestination={onMoveToDestination}
            onScheduleItem={onScheduleItem}
            onItemClick={onItemClick}
          />
        ))}
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeItem && (
          <div className="rounded-lg border border-primary bg-card p-3 shadow-lg opacity-90">
            <p className="text-sm font-medium text-foreground">{activeItem.title}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

// Kanban Column Component
interface KanbanColumnProps {
  id: string;
  title: string;
  iconName: string;
  color?: string;
  items: Item[];
  destinations: Destination[];
  onUpdateItem: (id: string, updates: Partial<Item>) => void;
  onDeleteItem: (id: string) => void;
  onMoveToDestination: (itemId: string, destinationId: string) => void;
  onScheduleItem: (itemId: string, scheduledAt: string) => void;
  onItemClick?: (item: Item) => void;
}

function KanbanColumn({
  id,
  title,
  iconName,
  color,
  items,
  destinations,
  onUpdateItem,
  onDeleteItem,
  onMoveToDestination,
  onScheduleItem,
  onItemClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useSortable({
    id,
    data: {
      type: 'column',
    },
  });

  const Icon = ICON_MAP[iconName] || Inbox;
  const colorOption = color ? COLOR_PALETTE.find(c => c.value === color) : null;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex w-72 shrink-0 flex-col rounded-lg border p-3 transition-colors',
        isOver ? 'border-primary bg-primary/5' : 'border-border bg-card/50'
      )}
    >
      {/* Column header */}
      <div className="mb-3 flex items-center gap-2">
        <div className={cn(
          'flex h-6 w-6 items-center justify-center rounded',
          colorOption?.bgSubtle || 'bg-muted'
        )}>
          <Icon className={cn('h-4 w-4', colorOption?.text || 'text-muted-foreground')} />
        </div>
        <h3 className="flex-1 font-medium text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">{items.length}</span>
      </div>

      {/* Items */}
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-2 min-h-[100px]">
          {items.map((item) => (
            <SortableKanbanCard
              key={item.id}
              item={item}
              destinations={destinations}
              onUpdate={onUpdateItem}
              onDelete={onDeleteItem}
              onMoveToDestination={onMoveToDestination}
              onSchedule={onScheduleItem}
              onClick={() => onItemClick?.(item)}
            />
          ))}
          {items.length === 0 && (
            <div className="flex h-20 items-center justify-center rounded-md border-2 border-dashed border-border text-sm text-muted-foreground">
              Drop items here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

// Sortable Kanban Card Component
interface SortableKanbanCardProps {
  item: Item;
  destinations: Destination[];
  onUpdate: (id: string, updates: Partial<Item>) => void;
  onDelete: (id: string) => void;
  onMoveToDestination: (itemId: string, destinationId: string) => void;
  onSchedule: (itemId: string, scheduledAt: string) => void;
  onClick?: () => void;
}

function SortableKanbanCard({
  item,
  destinations,
  onUpdate,
  onDelete,
  onMoveToDestination,
  onSchedule,
  onClick,
}: SortableKanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: 'item',
      item,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleQuickSchedule = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    onSchedule(item.id, tomorrow.toISOString());
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'group rounded-lg border border-border bg-card p-3 transition-colors hover:border-border-emphasis cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50',
        item.is_completed && 'opacity-60'
      )}
      layout
    >
      <div className="flex items-start gap-2">
        {/* Content */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <h4
            className={cn(
              'text-sm font-medium text-foreground cursor-pointer',
              item.is_completed && 'line-through text-muted-foreground'
            )}
          >
            {item.title}
          </h4>
          {item.notes && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
              {item.notes}
            </p>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              handleQuickSchedule();
            }}
            title="Schedule for tomorrow"
          >
            <Calendar className="h-3 w-3" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onUpdate(item.id, { is_completed: !item.is_completed })}
              >
                {item.is_completed ? (
                  <RotateCcw className="mr-2 h-4 w-4" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                {item.is_completed ? 'Mark incomplete' : 'Mark complete'}
              </DropdownMenuItem>
              {destinations.map((dest) => {
                const DestIcon = ICON_MAP[dest.icon] || Inbox;
                return (
                  <DropdownMenuItem
                    key={dest.id}
                    onClick={() => onMoveToDestination(item.id, dest.id)}
                    className={item.destination_id === dest.id ? 'bg-accent' : ''}
                  >
                    <DestIcon className="mr-2 h-4 w-4" />
                    Move to {dest.name}
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuItem
                onClick={() => onDelete(item.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
}
