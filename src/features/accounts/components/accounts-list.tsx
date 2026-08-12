"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { useAccounts } from "../hooks/use-accounts";
import { Account } from "../types";
import { useAuthStore } from "@/store/auth-store";

import { AccountsTable } from "./AccountsTable";
import { usePagination } from "@/lib/usePagination";
import { AccountsPagination } from "./AccountsPagination";
import { ErrorBox } from "@/components/ErrorBox";
import CreateAccountDialog from "./create-account-dialog";
import EditAccountDialog from "./edit-account-dialog";
import DeleteAccountDialog from "./delete-account-dialog";

export default function AccountsList() {
  const email = useAuthStore((state) => state.email);

  const { data = [], isLoading, error } = useAccounts(email);

  const [createOpen, setCreateOpen] = useState(false);
  // Pagination managed by usePagination hook

  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);

  if (isLoading) {
    return (
      <div className="glass-card overflow-hidden p-5">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-16 rounded bg-muted" />
              <div className="h-4 w-12 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-4 w-16 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorBox message={(error as Error).message} />;
  }

  if (!email) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-muted-foreground">Please login first.</p>
      </div>
    );
  }

  const pageSize = 10; // show 10 accounts per page
  const { page, setPage, pageCount, pagedItems: pagedData } = usePagination(data ?? [], pageSize);

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>Add Account</Button>
      </div>

      {data.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-sm text-muted-foreground">No accounts found.</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Create your first account.
          </p>
        </div>
      ) : (
        <>
          <AccountsTable
            accounts={pagedData}
            onEdit={(account) => {
              setEditingAccount(account);
              setEditOpen(true);
            }}
            onDelete={(account) => {
              setDeletingAccount(account);
            }}
          />

          {/* Pagination controls */}
          <AccountsPagination page={page} pageCount={pageCount} setPage={setPage} />
        </>
      )}

      <CreateAccountDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <EditAccountDialog
        open={editOpen}
        account={editingAccount}
        onClose={() => {
          setEditingAccount(null);
          setEditOpen(false);
        }}
      />

      <DeleteAccountDialog
        open={!!deletingAccount}
        account={deletingAccount}
        onClose={() => setDeletingAccount(null)}
      />
    </div>
  );
}
