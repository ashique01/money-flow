"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateRecurring } from "../services/recurring.service";

import { RecurringFormData } from "../schemas/recurring.schema";

interface UpdateRecurringPayload {
  recurring_id: string;
  data: RecurringFormData;
}

export function useUpdateRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRecurringPayload) =>
      updateRecurring(payload.recurring_id, payload.data),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["recurring"],
      });

      toast.success("Recurring transaction updated");
    },

    onError(error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update recurring transaction",
      );
    },
  });
}