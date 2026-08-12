import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import React from 'react';

export const TabsRoot = RadixTabs.Root;
export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixTabs.List ref={ref} className={cn('flex space-x-2', className)} {...rest} />
  );
});
TabsList.displayName = 'TabsList';
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixTabs.Trigger ref={ref} className={cn('px-4 py-2 rounded', className)} {...rest} />
  );
});
TabsTrigger.displayName = 'TabsTrigger';
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixTabs.Content ref={ref} className={cn('mt-2', className)} {...rest} />
  );
});
TabsContent.displayName = 'TabsContent';
