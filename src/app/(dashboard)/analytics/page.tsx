"use client";

import PageContainer from "@/components/layout/page-container";
import { useAnalytics } from "@/features/analytics/hooks/useAnalytics";
import { NetWorthCard } from "@/features/analytics/components/NetWorthCard";
import { CategoryBreakdownChart } from "@/features/analytics/components/CategoryBreakdownChart";

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <PageContainer title="Analytics">
        <div className="animate-pulse space-y-4">
          <div className="h-24 w-full bg-muted rounded" />
          <div className="h-64 w-full bg-muted rounded" />
        </div>
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer title="Analytics">
        <div className="glass-card p-8 text-center">
          <p className="text-destructive">Error loading analytics data.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Analytics">
      <div className="grid gap-6 md:grid-cols-2">
        <NetWorthCard netWorth={data.netWorth} />
        <CategoryBreakdownChart data={data.expenseByCategory} />
      </div>
    </PageContainer>
  );
}
