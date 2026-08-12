"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransaction } from "../services/transaction.service";
import { CreateTransactionInput } from "../types";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

interface UpdateTransactionPayload {
  transaction_id: string;
  data: CreateTransactionInput;
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const email = useAuthStore.getState().email;

  return useMutation({
    mutationFn: (payload: UpdateTransactionPayload) =>
      updateTransaction(payload.transaction_id, payload.data),

    onSuccess() {
      toast.success("Transaction updated");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"], exact: false });
      if (email) {
        queryClient.invalidateQueries({ queryKey: ["accounts", email] });
      }
    },

    onError(error) {
      toast.error(error.message);
    },
  });
}
