"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateAccount } from "../services/accounts.service";

import { UpdateAccountInput } from "../types";

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAccountInput) => updateAccount(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });

      toast.success("Account updated");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update account",
      );
    },
  });
}
