"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../services/transaction.service";
import {
  CreateTransactionInput,
  TransactionResponse,
  Transaction,
} from "../types";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const email = useAuthStore.getState().email;

  return useMutation({
    mutationFn: (data: CreateTransactionInput) => createTransaction(data),

    async onMutate(data) {
      await queryClient.cancelQueries({ queryKey: ["transactions"] });

      const previousTransactions =
        queryClient.getQueryData<TransactionResponse>(["transactions"]);

      const temporaryTransaction: Transaction = {
        transaction_id: `temp-${Date.now()}`,
        date: data.date,
        person: data.person,
        type: data.type,
        category: data.category,
        account: data.account || "",
        payment_method: data.payment_method || "",
        amount: data.amount,
        currency: data.currency || "AUD",
        note: data.note || "",
        tags: data.tags || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<TransactionResponse>(["transactions"], (old) => {
        if (!old) return old;
        return {
          ...old,
          count: old.count + 1,
          transactions: [temporaryTransaction, ...old.transactions],
        };
      });

      return { previousTransactions };
    },

    onError(error, _data, context) {
      if (context?.previousTransactions) {
        queryClient.setQueryData(["transactions"], context.previousTransactions);
      }
      toast.error(error.message || "Failed to create transaction");
    },

    onSuccess() {
      toast.success("Transaction created");
    },

    onSettled() {
      // Refresh data across the app
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"], exact: false });
      if (email) {
        queryClient.invalidateQueries({ queryKey: ["accounts", email] });
      }
    },
  });
}
