import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import React from 'react';

export const DropdownMenuRoot = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdownMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixDropdownMenu.Content
      ref={ref}
      className={cn('bg-white rounded-md shadow-md p-2', className)}
      {...rest}
    />
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';
export const DropdownMenuItem = RadixDropdownMenu.Item;
export const DropdownMenuSeparator = RadixDropdownMenu.Separator;
