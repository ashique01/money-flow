"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { useState } from "react";

import { useCreateAccount } from "../hooks/use-create-account";

import { CreateAccountInput } from "../types";

import { useAuthStore } from "@/store/auth-store";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateAccountDialog({ open, onClose }: Props) {
  const { mutate, isPending } = useCreateAccount();
  const email = useAuthStore((state) => state.email);

  const [form, setForm] = useState<CreateAccountInput>({
    name: "",
    type: "Bank",
    balance: 0,
    currency: "AUD",
  });

  function updateField(key: keyof CreateAccountInput, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    if (!email) return;
    if (!form.name.trim()) return;

    mutate(
      { ...form, email },
      {
        onSuccess() {
          setForm({ name: "", type: "Bank", balance: 0, currency: "AUD" });
          onClose();
        },
        onError(error) {
          toast.error(error.message ?? "Failed to create account");
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Account Name</Label>
            <Input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="NAB Everyday"
            />
          </div>
          <div>
            <Label>Account Type</Label>
            <select
              className="w-full rounded-md border bg-background p-2"
              value={form.type}
              onChange={(e) => updateField("type", e.target.value)}
            >
              <option>Bank</option>
              <option>Cash</option>
              <option>Savings</option>
              <option>Credit Card</option>
              <option>Investment</option>
            </select>
          </div>
          <div>
            <Label>Balance</Label>
            <Input
              type="number"
              value={form.balance}
              onChange={(e) => updateField("balance", Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Currency</Label>
            <select
              className="w-full rounded-md border bg-background p-2"
              value={form.currency}
              onChange={(e) => updateField("currency", e.target.value)}
            >
              <option>AUD</option>
              <option>USD</option>
              <option>BDT</option>
            </select>
          </div>
          <Button
            className="w-full"
            disabled={isPending || !email}
            onClick={handleSubmit}
          >
            {isPending ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
