"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../services/transaction.service";
import { TransactionResponse } from "../types";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const email = useAuthStore.getState().email;

  return useMutation({
    mutationFn: (transaction_id: string) => deleteTransaction(transaction_id),

    async onMutate(transaction_id) {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousTransactions =
        queryClient.getQueryData<TransactionResponse>(["transactions"]);

      queryClient.setQueryData<TransactionResponse>(["transactions"], (old) => {
        if (!old) return old;
        return {
          ...old,
          transactions: old.transactions.filter(
            (transaction) => transaction.transaction_id !== transaction_id,
          ),
          count: old.count - 1,
        };
      });

      return { previousTransactions };
    },

    onError(error, _transaction_id, context) {
      if (context?.previousTransactions) {
        queryClient.setQueryData(["transactions"], context.previousTransactions);
      }
      toast.error(error.message || "Delete failed");
    },

    onSuccess() {
      toast.success("Transaction deleted");
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"], exact: false });
      if (email) {
        queryClient.invalidateQueries({ queryKey: ["accounts", email] });
      }
    },
  });
}
