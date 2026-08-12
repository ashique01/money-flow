"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { Budget, CreateBudgetInput } from "../types";

import { updateBudget } from "../services/budget.service";

interface UpdateBudgetPayload {
  budget_id: string;

  data: CreateBudgetInput;
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBudgetPayload) =>
      updateBudget(payload.budget_id, payload.data),

    async onMutate(payload) {
      await queryClient.cancelQueries({
        queryKey: ["budgets"],
      });

      const previousBudgets = queryClient.getQueryData<Budget[]>(["budgets"]);

      queryClient.setQueryData<Budget[]>(["budgets"], (old) => {
        if (!old) {
          return old;
        }

        return old.map((budget) => {
          if (budget.budget_id === payload.budget_id) {
            return {
              ...budget,
              ...payload.data,
            };
          }

          return budget;
        });
      });

      return {
        previousBudgets,
      };
    },

    onError(error, _payload, context) {
      if (context?.previousBudgets) {
        queryClient.setQueryData(["budgets"], context.previousBudgets);
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to update budget",
      );
    },

    onSuccess() {
      toast.success("Budget updated successfully");
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });
}
