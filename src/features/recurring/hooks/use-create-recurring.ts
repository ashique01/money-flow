"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { createRecurring } from "../services/recurring.service";

import { CreateRecurringInput } from "../types";

export function useCreateRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRecurringInput) => createRecurring(data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["recurring"],
      });

      toast.success("Recurring transaction created");
    },

    onError(error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create recurring transaction",
      );
    },
  });
}
