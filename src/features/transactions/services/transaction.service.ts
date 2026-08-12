import { api } from "@/lib/api";

import { API } from "@/lib/endpoints";

import {
  TransactionResponse,
  CreateTransactionInput,
  Transaction,
} from "../types";

export async function getTransactions() {
  return api.get<TransactionResponse>(API.TRANSACTIONS);
}

export async function getTransaction(id: string) {
  return api.get<Transaction>(API.TRANSACTION, {
    id,
  });
}

export async function createTransaction(data: CreateTransactionInput) {
  return api.post<Transaction>(
    API.CREATE_TRANSACTION,

    data,
  );
}

export async function updateTransaction(
  transaction_id: string,
  data: Partial<Transaction>,
) {
  return api.post<{
    message: string;
  }>(API.UPDATE_TRANSACTION, {
    transaction_id,

    ...data,
  });
}

export async function deleteTransaction(transaction_id: string) {
  return api.post<{
    message: string;
  }>(
    API.DELETE_TRANSACTION,

    {
      transaction_id,
    },
  );
}
