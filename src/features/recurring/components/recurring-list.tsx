"use client";

import { useState } from "react";
import { Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecurring } from "../hooks/use-recurring";
import { RecurringGrid } from "./RecurringGrid";
import { RecurringLoading } from "./RecurringLoading";
import { RecurringEmpty } from "./RecurringEmpty";
import { RecurringPagination } from "./RecurringPagination";
import CreateRecurringDialog from "./create-recurring-dialog";
import EditRecurringDialog from "./edit-recurring-dialog";
import DeleteRecurringDialog from "./delete-recurring-dialog";
import { RecurringTransaction } from "../types";

export default function RecurringList() {
  const { data, isLoading, error } = useRecurring();

  const [createOpen, setCreateOpen] = useState(false);
  const [selectedRecurring, setSelectedRecurring] =
    useState<RecurringTransaction | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteRecurring, setDeleteRecurring] =
    useState<RecurringTransaction | null>(null);

  const items = data ?? [];

  // Pagination state – must be declared before any early returns
  const [page, setPage] = useState(1);
  const pageSize = 6; // 2 rows per grid on mobile, 6 on desktop
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) return <RecurringLoading />;

  if (error) {
    return (
      <div className="space-y-5">
        <div className="flex justify-end">
          <Button onClick={() => setCreateOpen(true)}>Add Recurring</Button>
        </div>
        <div className="glass-card p-8 text-center">
          <Repeat size={40} className="mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-sm text-destructive">
            Failed to load recurring transactions.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>Add Recurring</Button>
      </div>

      {items.length === 0 ? (
        <RecurringEmpty />
      ) : (
        <>
          <RecurringGrid
            items={pagedItems}
            onEdit={(r) => {
              setSelectedRecurring(r);
              setEditOpen(true);
            }}
            onDelete={setDeleteRecurring}
          />
          <RecurringPagination page={page} pageCount={pageCount} setPage={setPage} />
        </>
      )}

      <CreateRecurringDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <EditRecurringDialog
        recurring={selectedRecurring}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedRecurring(null);
        }}
      />

      <DeleteRecurringDialog
        recurring={deleteRecurring}
        open={!!deleteRecurring}
        onClose={() => setDeleteRecurring(null)}
      />
    </div>
  );
}
