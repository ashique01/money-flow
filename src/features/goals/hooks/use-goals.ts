"use client";

import { useQuery } from "@tanstack/react-query";

import { getGoals } from "../services/goals.service";

export function useGoals(email: string) {
  return useQuery({
    queryKey: ["goals", email],

    queryFn: () => getGoals(email),

    enabled: Boolean(email),
  });
}