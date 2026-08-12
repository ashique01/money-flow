"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteRecurring } from "../services/recurring.service";

export function useDeleteRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRecurring(id),

    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["recurring"],
      });

      toast.success("Recurring transaction deleted");
    },

    onError(error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    },
  });
}
