import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';
import React from 'react';

export const CheckboxRoot = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>((props, ref) => (
  <RadixCheckbox.Root ref={ref} className={cn('size-4 rounded border', props.className)} {...props} />
));
CheckboxRoot.displayName = 'CheckboxRoot';

export const CheckboxIndicator = RadixCheckbox.Indicator;
