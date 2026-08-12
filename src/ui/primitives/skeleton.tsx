import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width in Tailwind spacing (e.g., "w-32") */
  width?: string;
  /** Height in Tailwind spacing (e.g., "h-4") */
  height?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width = 'w-full', height = 'h-4', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('animate-pulse rounded bg-gray-200', width, height, className)}
      {...props}
    />
  )
);
Skeleton.displayName = 'Skeleton';
