"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useDeleteCategory } from "../hooks/use-delete-category";

import { Category } from "../types";

interface Props {
  open: boolean;

  category: Category | null;

  onClose: () => void;
}

export default function DeleteCategoryDialog({
  open,
  category,
  onClose,
}: Props) {
  const { mutate, isPending } = useDeleteCategory();

  function handleDelete() {
    if (!category) return;

    mutate(category.category_id, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          rounded-xl
          sm:max-w-[420px]
        "
      >
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>

        <div
          className="
            py-4
            text-sm
            text-muted-foreground
          "
        >
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">
            {category?.name}
          </span>
          ? This action cannot be undone.
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}