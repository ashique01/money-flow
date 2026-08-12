// src/features/reports/types.ts
export type ReportPeriod = 'MONTHLY' | 'YEARLY';

export interface ReportFilters {
  period?: ReportPeriod;
  startDate?: string; // ISO
  endDate?: string;   // ISO
  accountIds?: string; // comma‑separated IDs
  categoryIds?: string; // comma‑separated IDs
}

export interface ReportRow {
  id: string;
  date: string;
  description: string;
  amount: number;
  accountId: string;
  categoryId: string;
}

export interface ReportResult {
  period: ReportPeriod;
  rows: ReportRow[];
  totals: {
    income: number;
    expense: number;
    net: number;
  };
}
