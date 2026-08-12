"use client";

import { useState } from "react";

import { useTransactions } from "../hooks/use-transactions";
import { Transaction, TransactionFilters } from "../types";

import EditTransactionDialog from "./edit-transaction-dialog";
import DeleteTransactionDialog from "./delete-transaction-dialog";

import { ErrorBox } from "@/components/ErrorBox";

import { TransactionLoading } from "./TransactionLoading";
import { TransactionEmpty } from "./TransactionEmpty";
import { TransactionGrid } from "./TransactionGrid";
import { TransactionPagination } from "./TransactionPagination";

import { usePagination } from "@/lib/usePagination";

interface Props {
  filters?: TransactionFilters;
}

export default function TransactionTable({ filters = {} }: Props) {
  const { data, isLoading, error } = useTransactions();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteTransaction, setDeleteTransaction] =
    useState<Transaction | null>(null);

  const transactions = data?.transactions ?? [];

  const filteredTransactions = transactions.filter((transaction) => {
    const search = filters.search?.toLowerCase();

    const transactionDate = new Date(transaction.date)
      .toISOString()
      .split("T")[0];

    const matchSearch =
      !search ||
      transaction.note?.toLowerCase().includes(search) ||
      transaction.category?.toLowerCase().includes(search);

    const matchType = !filters.type || transaction.type === filters.type;

    const matchPerson =
      !filters.person || transaction.person === filters.person;

    const matchStartDate =
      !filters.startDate || transactionDate >= filters.startDate;

    const matchEndDate = !filters.endDate || transactionDate <= filters.endDate;

    const matchCategory =
      !filters.category || transaction.category === filters.category;

    return (
      matchSearch &&
      matchType &&
      matchPerson &&
      matchCategory &&
      matchStartDate &&
      matchEndDate
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (filters.sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();

      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();

      case "amount_high":
        return b.amount - a.amount;

      case "amount_low":
        return a.amount - b.amount;

      default:
        return 0;
    }
  });

  const {
    page,
    setPage,
    pageCount,
    pagedItems: pagedTransactions,
  } = usePagination(sortedTransactions, 20);

  if (isLoading) {
    return <TransactionLoading />;
  }

  if (error) {
    return (
      <ErrorBox
        message={
          error instanceof Error ? error.message : "Failed to load transactions"
        }
      />
    );
  }

  if (transactions.length === 0) {
    return <TransactionEmpty />;
  }

  return (
    <div>
      <div className="glass-card overflow-hidden">
        <TransactionGrid
          transactions={pagedTransactions}
          onEdit={(transaction) => {
            setSelectedTransaction(transaction);
            setEditOpen(true);
          }}
          onDelete={(transaction) => {
            setDeleteTransaction(transaction);
          }}
        />

        <TransactionPagination
          page={page}
          pageCount={pageCount}
          setPage={setPage}
        />
      </div>

      <EditTransactionDialog
        transaction={selectedTransaction}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedTransaction(null);
        }}
      />

      <DeleteTransactionDialog
        transaction={deleteTransaction}
        open={!!deleteTransaction}
        onClose={() => {
          setDeleteTransaction(null);
        }}
      />
    </div>
  );
}
