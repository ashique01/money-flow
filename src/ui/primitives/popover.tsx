import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import React from 'react';

export const PopoverRoot = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>((props, ref) => {
  const { className, sideOffset = 4, ...rest } = props;
  return (
    <RadixPopover.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('rounded bg-white p-4 shadow-md', className)}
      {...rest}
    />
  );
});
PopoverContent.displayName = 'PopoverContent';
