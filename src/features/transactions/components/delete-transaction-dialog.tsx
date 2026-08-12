"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Transaction } from "../types";

import { useDeleteTransaction } from "../hooks/use-delete-transaction";

interface Props {
  transaction: Transaction | null;

  open: boolean;

  onClose: () => void;
}

export default function DeleteTransactionDialog({
  transaction,

  open,

  onClose,
}: Props) {
  const mutation = useDeleteTransaction();

  function handleDelete() {
    if (!transaction) return;

    mutation.mutate(transaction.transaction_id, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog
      open={open}

      onOpenChange={onClose}
    >
      <DialogContent
        className="
        rounded-xl
        sm:max-w-[420px]
        "
      >
        <DialogHeader>
          <DialogTitle>Delete Transaction</DialogTitle>
        </DialogHeader>

        <div
          className="
        py-4
        text-sm
        text-muted-foreground
        "
        >
          Are you sure you want to delete this transaction?
        </div>

        <DialogFooter>
          <Button
            variant="outline"

            onClick={onClose}
          >
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
