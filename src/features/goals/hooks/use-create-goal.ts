"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createGoal } from "../services/goals.service";

import { CreateGoalInput } from "../types";

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGoalInput) => createGoal(data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["goals"],
      });

      toast.success("Goal created successfully");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create goal",
      );
    },
  });
}
