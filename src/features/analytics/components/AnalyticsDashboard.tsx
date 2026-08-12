// src/features/analytics/components/AnalyticsDashboard.tsx
'use client';
import { useAnalytics } from '../hooks/useAnalytics';
import { NetWorthCard } from './NetWorthCard';
import { CategoryBreakdownChart } from './CategoryBreakdownChart';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MonthlyTrendCard } from './MonthlyTrendCard';
import { Spinner } from '@/components/ui/spinner';

export const AnalyticsDashboard = () => {
  const { data, isLoading, error } = useAnalytics();

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  if (!data) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <NetWorthCard netWorth={data.netWorth} />
      <MonthlyTrendCard />
      <CategoryBreakdownChart data={data.expenseByCategory} />
    </div>
  );
};
