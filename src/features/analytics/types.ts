// src/features/analytics/types.ts

export interface NetWorth {
  amount: number;
  date: string; // ISO date string
}

export interface CategorySpending {
  categoryId: string;
  categoryName: string;
  amount: number;
}

export interface MonthlyTrend {
  month: string; // YYYY‑MM
  income: number;
  expense: number;
}

export interface AnalyticsSummary {
  netWorth: NetWorth;
  totalIncome: number;
  totalExpense: number;
  savingsRate: number; // 0‑1
  expenseByCategory: CategorySpending[];
  monthlyTrends: MonthlyTrend[];
}
