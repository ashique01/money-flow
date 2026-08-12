export interface DashboardSummary {
  balance: number;

  income: number;

  expense: number;

  savingRate: number;
}

export interface MonthlySummary {
  income: number;

  expense: number;
}

export interface DashboardAccount {
  name: string;

  type: string;

  balance: number;

  currency: string;
}

export interface CategoryExpense {
  name: string;

  amount: number;
}

export interface RecentTransaction {
  transaction_id: string;

  date: string;

  person: string;

  type: string;

  category: string;

  account: string;

  payment_method: string;

  amount: number;

  currency: string;

  note: string;

  tags: string;

  recurring_id?: string;
}

export type DashboardPeriod =
  "today" | "week" | "month" | "last_month" | "year" | "all";

export interface DashboardData {
  period: string;

  accounts: DashboardAccount[];

  summary: DashboardSummary;

  monthly: MonthlySummary;

  categories: CategoryExpense[];

  people: Record<string, number>;

  recentTransactions: RecentTransaction[];
}
