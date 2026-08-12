"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import TransactionFilter from "@/features/transactions/components/transaction-filter";
import TransactionSummary from "@/features/transactions/components/transaction-summary";
import TransactionTable from "@/features/transactions/components/transaction-table";
import CreateTransactionDialog from "@/features/transactions/components/create-transaction-dialog";
import { TransactionFilters } from "@/features/transactions/types";

export default function TransactionsPage() {
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [open, setOpen] = useState(false);

  return (
    <PageContainer
      title="Transactions"
      subtitle="Track, filter, and manage all your transactions"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Transactions</h2>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} className="mr-1.5" />
            Create Transaction
          </Button>
        </div>

        <TransactionSummary />

        <TransactionFilter filters={filters} setFilters={setFilters} />

        <TransactionTable filters={filters} />

        <CreateTransactionDialog
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </PageContainer>
  );
}