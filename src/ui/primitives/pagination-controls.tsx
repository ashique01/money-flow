import React from 'react';
import { cn } from '@/lib/utils';

interface PaginationControlsProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  current,
  total,
  onPageChange,
  className,
}) => {
  const goPrev = () => onPageChange(Math.max(1, current - 1));
  const goNext = () => onPageChange(Math.min(total, current + 1));
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <button
        onClick={goPrev}
        disabled={current <= 1}
        className={cn('px-2 py-1 rounded disabled:opacity-50')}
      >
        Prev
      </button>
      <span>
        Page {current} of {total}
      </span>
      <button
        onClick={goNext}
        disabled={current >= total}
        className={cn('px-2 py-1 rounded disabled:opacity-50')}
      >
        Next
      </button>
    </div>
  );
};
