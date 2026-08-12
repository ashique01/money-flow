// src/features/analytics/hooks/useAnalytics.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAnalyticsSummary } from '../services/analytics.service';
import { AnalyticsSummary } from '../types';

export const useAnalytics = () => {
  return useQuery<AnalyticsSummary, Error>({
    queryKey: ['analytics', 'summary'],
    queryFn: fetchAnalyticsSummary,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
