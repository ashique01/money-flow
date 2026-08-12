import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn('inline-block h-10 w-10 rounded-full', className)}
      {...props}
    />
  )
);
Avatar.displayName = 'Avatar';
