"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Budget } from "../types";

import { useDeleteBudget } from "../hooks/use-delete-budget";

interface Props {
  budget: Budget | null;

  open: boolean;

  onClose: () => void;
}

export default function DeleteBudgetDialog({
  budget,
  open,
  onClose,
}: Props) {
  const mutation = useDeleteBudget();

  function handleDelete() {
    if (!budget) return;

    mutation.mutate(budget.budget_id, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Delete Budget</DialogTitle>
        </DialogHeader>

        <div className="py-4 text-sm text-muted-foreground">
          Are you sure you want to delete the{" "}
          <span className="font-medium text-foreground">{budget?.category}</span>{" "}
          budget
          {budget?.person ? ` for ${budget.person}` : ""}? This action cannot be
          undone.
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