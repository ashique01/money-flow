"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useCategories } from "@/features/categories/hooks/use-categories";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  transactionSchema,
  TransactionFormData,
} from "../schemas/transaction.schema";

import { useCreateTransaction } from "../hooks/use-create-transaction";

import TransactionFormFields from "./transaction-form-fields";

interface Props {
  open: boolean;

  onClose: () => void;
}

export default function CreateTransactionDialog({ open, onClose }: Props) {
  const email = useAuthStore((s) => s.email);
  const { data: categories, isLoading: catLoading, error: catError } = useCategories(email ?? "");
  const mutation = useCreateTransaction();

  const [customCategory, setCustomCategory] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),

    defaultValues: {
      date: new Date().toISOString().split("T")[0],

      person: "Ash",

      currency: "AUD",

      type: "Expense",

      category: "",

      account: "",

      payment_method: "",

      amount: 0,

      note: "",

      tags: "",
    },
  });

    // ----- Categories loading / error handling -----
  if (catLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-full bg-muted rounded" />
            <div className="h-64 w-full bg-muted rounded" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (catError) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <p className="text-destructive">Failed to load categories. Please try again.</p>
        </DialogContent>
      </Dialog>
    );
  }

function submit(data: TransactionFormData) {
    const finalData = {
      ...data,

      category:
        data.category === "Other" ? customCategory.trim() : data.category,
    };

    if (finalData.category === "") {
      return;
    }

    mutation.mutate(finalData, {
      onSuccess() {
        reset({
          date: new Date().toISOString().split("T")[0],

          person: "Ash",

          currency: "AUD",

          type: "Expense",

          category: "",

          account: "",

          payment_method: "",

          amount: 0,

          note: "",

          tags: "",
        });

        setCustomCategory("");

        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
        max-h-[90vh]
        overflow-y-auto
        rounded-xl
        sm:max-w-[600px]
        "
      >
        <DialogHeader>
          <DialogTitle
            className="
              text-lg
              font-semibold
              "
          >
            Create Transaction
          </DialogTitle>

          <p className="text-sm text-muted-foreground">
            Track your income and expenses.
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-5"
        >
          <TransactionFormFields
            register={register}
            errors={errors}
            watch={watch}
            customCategory={customCategory}
            setCustomCategory={setCustomCategory}
            categories={categories}
          />

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-lg"
            >
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}