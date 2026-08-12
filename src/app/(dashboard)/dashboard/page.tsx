"use client";

import { useState } from "react";

import PageContainer from "@/components/layout/page-container";

import DashboardFilter from "@/features/dashboard/components/dashboard-filter";
import DashboardSummary from "@/features/dashboard/components/dashboard-summary";
import { DashboardLoading } from "@/features/dashboard/components/DashboardLoading";
import dynamic from "next/dynamic";

const ExpenseCategoryChart = dynamic(() => import("@/features/dashboard/components/expense-category-chart"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 bg-muted rounded" />, // placeholder while loading
});

const MonthlyOverviewChart = dynamic(() => import("@/features/dashboard/components/monthly-overview-chart"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-64 bg-muted rounded" />, // placeholder while loading
});
import RecentTransactions from "@/features/dashboard/components/recent-transactions";

import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
import type { DashboardPeriod } from "@/features/dashboard/types";

import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";

export default function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>("month");

  const email = useAuthStore((s) => s.email);

  const hydrated = useAuthStore((s) => s.hydrated);

  const { data, isLoading, error } = useDashboard(period, email);

  /*
  ==========================
  WAIT FOR ZUSTAND
  ==========================
  */

  if (!hydrated) {
    return (
      <PageContainer title="Dashboard">
        <div className="flex h-40 items-center justify-center">Loading...</div>
      </PageContainer>
    );
  }

  /*
  ==========================
  NO USER
  ==========================
  */

  if (!email) {
    return (
      <PageContainer title="Dashboard">
        <div className="glass-card p-8 text-center space-y-4">
          <p className="text-destructive">Please login first.</p>
          <Link href="/login" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            Go to Login
          </Link>
        </div>
      </PageContainer>
    );
  }

  /*
  ==========================
  LOADING DATA
  ==========================
  */

  if (isLoading) {
    return (
      <PageContainer title="Dashboard">
        <DashboardLoading />
      </PageContainer>
    );
  }

  /*
  ==========================
  ERROR
  ==========================
  */

  if (error || !data) {
    return (
      <PageContainer title="Dashboard">
        <div className="glass-card p-8 text-center">
          <p className="text-destructive">Error loading dashboard data.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Dashboard"

      subtitle="Your financial overview at a glance"
    >
      <div className="mb-5 flex justify-end">
        <DashboardFilter
          value={period}

          onChange={setPeriod}
        />
      </div>

      <DashboardSummary data={data.summary} />

      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseCategoryChart data={data.categories} />

        <MonthlyOverviewChart data={data.monthly} />
      </div>

      <RecentTransactions data={data.recentTransactions} />
    </PageContainer>
  );
}
