import { useMemo } from 'react';
import { useReports } from '../hooks/useReports';
import { useAccountName } from './useAccountName';
import { useCategoryName } from './useCategoryName';
import { ReportResult } from '../types';

/**
 * Returns enriched rows ready for display.
 * Each row is extended with `accountName` and `categoryName`.
 */
export const useEnrichedRows = (filters: any) => {
  const { data } = useReports(filters);
  const getAccountName = useAccountName();
  const getCategoryName = useCategoryName();

  return useMemo(() => {
    if (!data?.rows) return [] as ReportResult['rows'];
    return data.rows.map((r) => ({
      ...r,
      accountName: getAccountName(r.accountId),
      categoryName: getCategoryName(r.categoryId),
    }));
  }, [data, getAccountName, getCategoryName]);
};
