"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { RecurringTransaction } from "../types";

import { useDeleteRecurring } from "../hooks/use-delete-recurring";

interface Props {
  recurring: RecurringTransaction | null;
  open: boolean;
  onClose: () => void;
}

export default function DeleteRecurringDialog({
  recurring,
  open,
  onClose,
}: Props) {
  const mutation = useDeleteRecurring();

  function handleDelete() {
    if (!recurring) return;

    mutation.mutate(recurring.recurring_id, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Delete Recurring Transaction</DialogTitle>
        </DialogHeader>

        <div className="py-4 text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">
            {recurring?.name}
          </span>
          ? This action cannot be undone.
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleDelete}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}