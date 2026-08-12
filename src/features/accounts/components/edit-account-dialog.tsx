"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useState, useEffect } from "react";

import { useUpdateAccount } from "../hooks/use-update-account";
import { Account, UpdateAccountInput } from "../types";

interface Props {
  open: boolean;
  account: Account | null;
  onClose: () => void;
}

export default function EditAccountDialog({ open, account, onClose }: Props) {
  const { mutate, isPending } = useUpdateAccount();

  const [form, setForm] = useState<UpdateAccountInput>({
    id: "",
    name: "",
    type: "Bank",
    balance: 0,
    currency: "AUD",
  });

  useEffect(() => {
    if (account) {
      setForm({
        id: account.id,
        name: account.name,
        type: account.type,
        balance: account.balance,
        currency: account.currency,
        status: account.status,
      });
    }
  }, [account]);

  function updateField(key: keyof UpdateAccountInput, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    if (!form.id) return;
    mutate(form, {
      onSuccess() {
        onClose();
      },
      onError(error) {
        toast.error(error.message ?? "Failed to update account");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-xl sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Account Name</Label>
            <Input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="NAB Everyday" />
          </div>
          <div>
            <Label>Account Type</Label>
            <select className="w-full rounded-md border bg-background p-2" value={form.type} onChange={(e) => updateField("type", e.target.value)}>
              <option>Bank</option>
              <option>Cash</option>
              <option>Savings</option>
              <option>Credit Card</option>
              <option>Investment</option>
            </select>
          </div>
          <div>
            <Label>Balance</Label>
            <Input type="number" value={form.balance} onChange={(e) => updateField("balance", Number(e.target.value))} />
          </div>
          <div>
            <Label>Currency</Label>
            <select className="w-full rounded-md border bg-background p-2" value={form.currency} onChange={(e) => updateField("currency", e.target.value)}>
              <option>AUD</option>
              <option>USD</option>
              <option>BDT</option>
            </select>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={isPending} onClick={handleSubmit}>{isPending ? "Saving..." : "Save Changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
