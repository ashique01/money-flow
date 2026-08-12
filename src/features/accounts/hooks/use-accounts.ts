"use client";

import { useQuery } from "@tanstack/react-query";

import { getAccounts } from "../services/accounts.service";

export function useAccounts(email: string | null) {
  return useQuery({
    queryKey: ["accounts", email],

    queryFn: () => getAccounts(email!),

    enabled: !!email,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
}
