import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

export const TooltipProvider = RadixTooltip.Provider;
export const TooltipRoot = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>((props, ref) => {
  const { className, sideOffset = 4, ...rest } = props;
  return (
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('rounded bg-neutral-800 px-2 py-1 text-xs text-white', className)}
      {...rest}
    />
  );
});
TooltipContent.displayName = 'TooltipContent';
