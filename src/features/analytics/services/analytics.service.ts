import { AnalyticsSummary } from "../types";

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const response = await fetch("/api/analytics/summary", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(`Analytics fetch failed: ${response.status} ${text}`);
  }

  return response.json();
}
