"use client";

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

import { recurringSchema, RecurringFormData } from "../schemas/recurring.schema";

import { useCreateRecurring } from "../hooks/use-create-recurring";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateRecurringDialog({ open, onClose }: Props) {
  const mutation = useCreateRecurring();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecurringFormData>({
    resolver: zodResolver(recurringSchema),
    defaultValues: {
      person: "Ash",
      type: "Expense",
      currency: "AUD",
      frequency: "Monthly",
      interval: 1,
      status: "Active",
      start_date: new Date().toISOString().split("T")[0],
      next_run: new Date().toISOString().split("T")[0],
    },
  });

  function submit(data: RecurringFormData) {
    mutation.mutate(data, {
      onSuccess() {
        reset();
        onClose();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Recurring Transaction</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Set up a transaction that repeats automatically.
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
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}