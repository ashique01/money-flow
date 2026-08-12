"use client";

import { useEffect } from "react";

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

import { Input } from "@/components/ui/input";

import { RecurringTransaction } from "../types";

import { recurringSchema, RecurringFormData } from "../schemas/recurring.schema";

import { useUpdateRecurring } from "../hooks/use-update-recurring";

interface Props {
  recurring: RecurringTransaction | null;
  open: boolean;
  onClose: () => void;
}

export default function EditRecurringDialog({
  recurring,
  open,
  onClose,
}: Props) {
  const mutation = useUpdateRecurring();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecurringFormData>({
    resolver: zodResolver(recurringSchema),
  });

  useEffect(() => {
    if (recurring) {
      reset({
        name: recurring.name,
        person: recurring.person,
        type: recurring.type,
        category: recurring.category,
        account: recurring.account,
        payment_method: recurring.payment_method,
        amount: recurring.amount,
        currency: recurring.currency,
        frequency: recurring.frequency,
        interval: recurring.interval,
        start_date: recurring.start_date,
        next_run: recurring.next_run,
        end_date: recurring.end_date ?? undefined,
        status: recurring.status,
        note: recurring.note,
      });
    }
  }, [recurring, reset]);

  function submit(data: RecurringFormData) {
    if (!recurring) return;

    mutation.mutate(
      { recurring_id: recurring.recurring_id, data },
      {
        onSuccess() {
          onClose();
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Recurring Transaction</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update the recurring transaction details below.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* Name */}
          <Input placeholder="Name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}

          {/* Person */}
          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("person")}
          >
            <option value="Ash">Ash</option>
            <option value="Rifa">Rifa</option>
            <option value="Shared">Shared</option>
          </select>

          {/* Type */}
          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("type")}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
            <option value="Transfer">Transfer</option>
            <option value="Savings Deposit">Savings Deposit</option>
            <option value="Investment">Investment</option>
            <option value="Refund">Refund</option>
          </select>

          {/* Category */}
          <Input placeholder="Category" {...register("category")} />
          {errors.category && (
            <p className="text-xs text-destructive">
              {errors.category.message}
            </p>
          )}

          {/* Amount */}
          <Input
            type="number"
            step="0.01"
            placeholder="Amount"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-xs text-destructive">{errors.amount.message}</p>
          )}

          {/* Frequency + Interval */}
          <div className="flex gap-3">
            <select
              className="h-10 w-full rounded-lg border px-3"
              {...register("frequency")}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            <Input
              type="number"
              placeholder="Interval"
              className="w-24 shrink-0"
              {...register("interval", { valueAsNumber: true })}
            />
          </div>

          {/* Dates */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">
                Start Date
              </label>
              <Input type="date" {...register("start_date")} />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs text-muted-foreground">
                Next Run
              </label>
              <Input type="date" {...register("next_run")} />
            </div>
          </div>

          {/* Status */}
          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("status")}
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>

          {/* Note */}
          <Input placeholder="Note (optional)" {...register("note")} />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}