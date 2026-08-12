"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteGoal } from "../services/goals.service";

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGoal(id),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      toast.success("Goal deleted successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete goal",
      );
    },
  });
}
