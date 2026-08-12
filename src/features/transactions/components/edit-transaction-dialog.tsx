"use client";

import { useEffect, useState } from "react";

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

import { Transaction } from "../types";

import { useUpdateTransaction } from "../hooks/use-update-transaction";

import TransactionFormFields from "./transaction-form-fields";

interface Props {
  transaction: Transaction | null;

  open: boolean;

  onClose: () => void;
}

export default function EditTransactionDialog({
  transaction,

  open,

  onClose,
}: Props) {
  const mutation = useUpdateTransaction();

  const [customCategory, setCustomCategory] = useState("");

  const {
    register,

    handleSubmit,

    reset,

    watch,

    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  useEffect(() => {
    if (!transaction) return;

    reset({
      date: transaction.date,

      person: transaction.person,

      type: transaction.type as "Income" | "Expense",

      category: transaction.category,

      account: transaction.account,

      payment_method: transaction.payment_method,

      amount: transaction.amount,

      currency: transaction.currency,

      note: transaction.note,

      tags: transaction.tags,
    });

    if (
      ![
        "Food",
        "Transport",
        "Shopping",
        "Subscription",
        "Rent",
        "Utilities",
        "Health",
        "Education",
        "Entertainment",
        "Travel",
        "Salary",
        "Freelance",
        "Business",
        "Investment",
        "Gift",
      ].includes(transaction.category)
    ) {
      setCustomCategory(transaction.category);
    }
  }, [transaction, reset]);

  function submit(data: TransactionFormData) {
    if (!transaction) return;

    const finalData = {
      ...data,

      category:
        data.category === "Other" ? customCategory.trim() : data.category,
    };

    mutation.mutate(
      {
        transaction_id: transaction.transaction_id,

        data: finalData,
      },

      {
        onSuccess() {
          onClose();

          setCustomCategory("");
        },
      },
    );
  }

  return (
    <Dialog
      open={open}

      onOpenChange={onClose}
    >
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
            Edit Transaction
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}

          className="
          space-y-5
          "
        >
          <TransactionFormFields
            register={register}

            errors={errors}

            watch={watch}

            customCategory={customCategory}

            setCustomCategory={setCustomCategory}
          />

          <DialogFooter
            className="
            gap-2
            "
          >
            <Button
              type="button"

              variant="outline"

              className="
              rounded-lg
              "

              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"

              disabled={mutation.isPending}

              className="
              rounded-lg
              "
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
