"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  createAccount,
  CreateAccountPayload,
} from "../services/accounts.service";

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountPayload) => createAccount(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });

      toast.success("Account created");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create account",
      );
    },
  });
}
