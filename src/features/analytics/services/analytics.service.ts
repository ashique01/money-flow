// src/features/analytics/services/analytics.service.ts
import { AnalyticsSummary } from '../types';

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const resp = await fetch('/api/analytics/summary');
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Analytics fetch failed: ${resp.status} ${text}`);
  }
  return resp.json();
}
