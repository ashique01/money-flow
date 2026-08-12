"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { Budget } from "../types";

import { deleteBudget } from "../services/budget.service";

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (budget_id: string) => deleteBudget(budget_id),

    async onMutate(budget_id) {
      await queryClient.cancelQueries({
        queryKey: ["budgets"],
      });

      const previousBudgets = queryClient.getQueryData<Budget[]>(["budgets"]);

      queryClient.setQueryData<Budget[]>(["budgets"], (old) => {
        if (!old) {
          return old;
        }

        return old.filter((budget) => budget.budget_id !== budget_id);
      });

      return {
        previousBudgets,
      };
    },

    onError(error, _budget_id, context) {
      if (context?.previousBudgets) {
        queryClient.setQueryData(["budgets"], context.previousBudgets);
      }

      toast.error(
        error instanceof Error ? error.message : "Failed to delete budget",
      );
    },

    onSuccess() {
      toast.success("Budget deleted successfully");
    },

    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });
}
