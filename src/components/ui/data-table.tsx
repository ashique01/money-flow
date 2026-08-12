import React from 'react';
import { cn } from '@/lib/utils';

type Column<T> = {
  header: string;
  accessor: keyof T & string;
  render?: (value: any) => React.ReactNode;
  onHeaderClick?: () => void;
  sortIcon?: React.ReactNode;
};

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

export function DataTable<T extends Record<string, any>>({ data, columns, className }: DataTableProps<T>) {
  return (
    <table className={cn('w-full border-collapse', className)}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th
              key={i}
              className="border-b p-2 text-left cursor-pointer"
              onClick={col.onHeaderClick}
            >
              <div className="flex items-center">
                {col.header}
                {col.sortIcon && <span className="ml-1">{col.sortIcon}</span>}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, ri) => (
          <tr key={ri} className={ri % 2 === 0 ? 'bg-gray-50' : ''}>
            {columns.map((col, ci) => {
              const value = row[col.accessor as string];
              return (
                <td key={ci} className="border-b p-2">
                  {col.render ? col.render(value) : String(value)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
