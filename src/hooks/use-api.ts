"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

export function useApi<T>(
  key: string,
  action: string
) {

  return useQuery({

    queryKey: [key],

    queryFn: () =>
      api.get<T>(action),

  });

}