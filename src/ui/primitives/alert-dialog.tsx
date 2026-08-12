import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';
import React from 'react';

export const AlertDialogRoot = RadixAlertDialog.Root;
export const AlertDialogTrigger = RadixAlertDialog.Trigger;
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixAlertDialog.Content
      ref={ref}
      className={cn('bg-white rounded-md p-6 shadow-lg', className)}
      {...rest}
    />
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';
export const AlertDialogTitle = RadixAlertDialog.Title;
export const AlertDialogDescription = RadixAlertDialog.Description;
export const AlertDialogCancel = RadixAlertDialog.Cancel;
export const AlertDialogAction = RadixAlertDialog.Action;
