import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import React from 'react';

export const DialogRoot = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;
export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixDialog.Content
      ref={ref}
      className={cn('bg-white rounded-md p-6 shadow-lg', className)}
      {...rest}
    />
  );
});
DialogContent.displayName = 'DialogContent';
