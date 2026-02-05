'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ICON_PICKER_OPTIONS, ICON_CATEGORIES, ICON_MAP, type IconOption } from '@/components/icons';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
}

export function IconPicker({ value, onChange, className, triggerClassName }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredIcons = useMemo(() => {
    let icons = ICON_PICKER_OPTIONS;

    if (search) {
      const searchLower = search.toLowerCase();
      icons = icons.filter(
        icon =>
          icon.name.toLowerCase().includes(searchLower) ||
          icon.category.toLowerCase().includes(searchLower)
      );
    }

    if (activeCategory) {
      icons = icons.filter(icon => icon.category === activeCategory);
    }

    return icons;
  }, [search, activeCategory]);

  const groupedIcons = useMemo(() => {
    if (activeCategory) {
      return { [activeCategory]: filteredIcons };
    }

    return filteredIcons.reduce((acc, icon) => {
      if (!acc[icon.category]) {
        acc[icon.category] = [];
      }
      acc[icon.category].push(icon);
      return acc;
    }, {} as Record<string, IconOption[]>);
  }, [filteredIcons, activeCategory]);

  const SelectedIcon = value ? ICON_MAP[value] : null;

  const handleSelect = (iconValue: string) => {
    onChange(iconValue);
    setOpen(false);
    setSearch('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-start gap-2',
            !value && 'text-muted-foreground',
            triggerClassName
          )}
        >
          {SelectedIcon ? (
            <>
              <SelectedIcon className="h-4 w-4" />
              <span className="capitalize">{value.replace(/-/g, ' ')}</span>
            </>
          ) : (
            <span>Select icon...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-80 p-0', className)} align="start">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="p-2 border-b border-border flex flex-wrap gap-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              'px-2 py-1 text-xs rounded-md transition-colors',
              !activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
            )}
          >
            All
          </button>
          {ICON_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-2 py-1 text-xs rounded-md transition-colors',
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Icons grid */}
        <div className="max-h-64 overflow-y-auto p-2">
          <AnimatePresence mode="popLayout">
            {Object.entries(groupedIcons).map(([category, icons]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-3 last:mb-0"
              >
                {!activeCategory && (
                  <h4 className="text-xs font-medium text-muted-foreground mb-2 px-1">
                    {category}
                  </h4>
                )}
                <div className="grid grid-cols-8 gap-1">
                  {icons.map((icon) => {
                    const Icon = icon.icon;
                    const isSelected = value === icon.value;

                    return (
                      <motion.button
                        key={icon.value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelect(icon.value)}
                        className={cn(
                          'relative flex items-center justify-center w-8 h-8 rounded-md transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted text-foreground'
                        )}
                        title={icon.name}
                      >
                        <Icon className="h-4 w-4" />
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="h-2 w-2 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredIcons.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No icons found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Inline icon display component
interface IconDisplayProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IconDisplay({ name, className, size = 'md' }: IconDisplayProps) {
  const Icon = ICON_MAP[name];

  if (!Icon) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return <Icon className={cn(sizeClasses[size], className)} />;
}
