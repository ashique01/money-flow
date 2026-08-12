// src/features/reports/services/reports.service.ts
import { ReportResult, ReportFilters } from '../types';

export async function fetchReport(filters: ReportFilters): Promise<ReportResult> {
  const qs = new URLSearchParams(filters as any).toString();
  const resp = await fetch(`/api/reports?${qs}`);
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Report fetch failed: ${resp.status} ${txt}`);
  }
  return resp.json();
}
