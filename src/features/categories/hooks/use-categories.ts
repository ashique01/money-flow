"use client";

import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../services/categories.service";

export function useCategories(email: string) {
  return useQuery({
    queryKey: ["categories", email],

    queryFn: () => getCategories(email),

    enabled: Boolean(email),
  });
}
