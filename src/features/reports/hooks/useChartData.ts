import { useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import { useCategoryName } from './useCategoryName';

/**
 * Generates chart data: total amount per category.
 */
export const useChartData = (filters: any) => {
  const { data } = useReports(filters);
  const getCategoryName = useCategoryName();

  return useMemo(() => {
    if (!data?.rows) return [] as { name: string; value: number }[];
    const map: Record<string, number> = {};
    data.rows.forEach((r) => {
      const name = getCategoryName(r.categoryId);
      map[name] = (map[name] ?? 0) + r.amount;
    });
    return Object.entries(map).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2)),
    }));
  }, [data, getCategoryName]);
};
