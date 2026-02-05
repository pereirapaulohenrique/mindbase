'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COLOR_PALETTE, type ColorOption } from '@/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  showLabel?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  className,
  triggerClassName,
  showLabel = true,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  const selectedColor = COLOR_PALETTE.find((c) => c.value === value);

  const handleSelect = (colorValue: string) => {
    onChange(colorValue);
    setOpen(false);
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
          {selectedColor ? (
            <>
              <div
                className={cn('w-4 h-4 rounded-full', selectedColor.bg)}
              />
              {showLabel && <span>{selectedColor.name}</span>}
            </>
          ) : (
            <span>Select color...</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-auto p-3', className)} align="start">
        <div className="grid grid-cols-6 gap-2">
          {COLOR_PALETTE.map((color) => {
            const isSelected = value === color.value;

            return (
              <motion.button
                key={color.value}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(color.value)}
                className={cn(
                  'relative w-8 h-8 rounded-full transition-all',
                  color.bg,
                  isSelected && 'ring-2 ring-offset-2 ring-offset-background ring-white'
                )}
                title={color.name}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="h-4 w-4 text-white drop-shadow-md" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Inline color display component (just a circle)
interface ColorDotProps {
  color: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorDot({ color, className, size = 'md' }: ColorDotProps) {
  const colorOption = COLOR_PALETTE.find((c) => c.value === color);

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  if (!colorOption) {
    return (
      <div
        className={cn(
          'rounded-full bg-muted',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full',
        colorOption.bg,
        sizeClasses[size],
        className
      )}
    />
  );
}

// Combined icon + color picker for inline forms
interface IconColorPickerInlineProps {
  icon: string;
  color: string;
  onIconChange: (value: string) => void;
  onColorChange: (value: string) => void;
  className?: string;
}

export function IconColorPickerInline({
  icon,
  color,
  onIconChange,
  onColorChange,
  className,
}: IconColorPickerInlineProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      <div className="flex-1">
        {/* Import IconPicker dynamically to avoid circular imports */}
        <ColorPicker value={color} onChange={onColorChange} showLabel={false} />
      </div>
    </div>
  );
}
