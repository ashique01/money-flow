// src/features/reports/hooks/useReports.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchReport } from '../services/reports.service';
import { ReportResult, ReportFilters } from '../types';

export const useReports = (
  filters: ReportFilters,
  options?: UseQueryOptions<ReportResult, Error>
) => {
  return useQuery({
    queryKey: ['reports', filters],
    queryFn: () => fetchReport(filters),
    staleTime: 0,
        ...options,
  });
};
