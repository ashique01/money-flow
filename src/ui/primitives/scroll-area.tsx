import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';
import React from 'react';

export const ScrollAreaRoot = RadixScrollArea.Root;
export const ScrollAreaViewport = React.forwardRef<
  React.ElementRef<typeof RadixScrollArea.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixScrollArea.Viewport>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <RadixScrollArea.Viewport ref={ref} className={cn('h-full w-full', className)} {...rest} />
  );
});
ScrollAreaViewport.displayName = 'ScrollAreaViewport';
export const ScrollAreaScrollbar = RadixScrollArea.Scrollbar;
export const ScrollAreaThumb = RadixScrollArea.Thumb;
