"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useDeleteAccount } from "../hooks/use-delete-account";
import { Account } from "../types";

interface Props {
  open: boolean;
  account: Account | null;
  onClose: () => void;
}

export default function DeleteAccountDialog({ open, account, onClose }: Props) {
  const { mutate, isPending } = useDeleteAccount();

  function handleDelete() {
    if (!account) return;
    mutate(account.id, {
      onSuccess() {
        onClose();
      },
      onError(error) {
        toast.error(error.message ?? "Failed to delete account");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-xl sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-sm text-muted-foreground">
          Are you sure you want to delete <span className="font-semibold text-foreground">{account?.name}</span>? This action cannot be undone.
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" disabled={isPending} onClick={handleDelete}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
