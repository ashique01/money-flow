"use client";

import { useQuery } from "@tanstack/react-query";

import { getRecurring } from "../services/recurring.service";

export function useRecurring() {
  return useQuery({
    queryKey: ["recurring"],

    queryFn: getRecurring,
  });
}
