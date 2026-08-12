"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateGoal } from "../services/goals.service";

import { Goal } from "../types";

export function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Goal>) => updateGoal(data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      toast.success("Goal updated successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update goal",
      );
    },
  });
}
