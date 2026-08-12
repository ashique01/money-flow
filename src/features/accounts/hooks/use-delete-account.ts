"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { deleteAccount } from "../services/accounts.service";

import { useAuthStore } from "@/store/auth-store";
export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      const currentEmail = useAuthStore.getState().email;
      if (!currentEmail) {
        throw new Error('User email missing');
      }
      return deleteAccount(id, currentEmail);
    },

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });

      toast.success("Account deleted");
    },

    onError(error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account",
      );
    },
  });
}