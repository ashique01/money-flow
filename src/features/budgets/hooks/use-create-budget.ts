"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBudget } from "../services/budget.service";

import { CreateBudgetInput } from "../types";

import { toast } from "sonner";

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetInput) => createBudget(data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });

      toast.success("Budget created successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create budget",
      );
    },
  });
}
