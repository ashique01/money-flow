import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import React from 'react';

// Sheet = Dialog styled as a side panel (common pattern).
export const SheetRoot = RadixDialog.Root;
export const SheetTrigger = RadixDialog.Trigger;
export const SheetClose = RadixDialog.Close;
export const SheetTitle = RadixDialog.Title;
export const SheetDescription = RadixDialog.Description;

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>((props, ref) => {
  const { className, side = 'right', ...rest } = props as any;
  const baseClasses =
    'fixed inset-y-0 bg-white shadow-lg p-6 transform transition-transform duration-300';
  const sideClass = side === 'left' ? 'left-0 translate-x-0' : 'right-0 translate-x-0';
  return (
    <RadixDialog.Content
      ref={ref}
      className={cn(baseClasses, sideClass, className)}
      {...rest}
    />
  );
});
SheetContent.displayName = 'SheetContent';
