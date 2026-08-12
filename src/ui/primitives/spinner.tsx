import React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6';
    return (
      <div
        ref={ref}
        className={cn(
          sizeClass,
          'border-2 border-t-transparent border-gray-300 rounded-full animate-spin',
          className
        )}
        {...props}
      />
    );
  }
);
Spinner.displayName = 'Spinner';
