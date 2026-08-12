import { api } from "@/lib/api";
import { API } from "@/lib/endpoints";
import type { DashboardData } from "../types";

export async function getDashboard(
  period: string,
  email: string,
): Promise<DashboardData> {
  return api.get<DashboardData>(API.DASHBOARD, { action: "dashboard",
    period,
    email,
  });
}
