"use client";

import { useQuery } from "@tanstack/react-query";

import { getDashboard } from "../services/dashboard.service";

export function useDashboard(period: string, email: string | null) {
  return useQuery({
    queryKey: ["dashboard", period, email],
    queryFn: () => {
      if (!email) {
        throw new Error("Missing email");
      }
      return getDashboard(period, email);
    },
    enabled: Boolean(email),
    // Cache the dashboard data for 5 minutes to avoid refetch on every navigation.
    staleTime: 1000 * 60 * 5,
    // Keep previous data while loading new data to avoid UI blank states.
    // Don't refetch on window focus; navigation itself will bring fresh data when needed.
    refetchOnWindowFocus: false,
  });
}
