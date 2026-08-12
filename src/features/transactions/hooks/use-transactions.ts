"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "../services/transaction.service";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],

    queryFn: getTransactions,

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
