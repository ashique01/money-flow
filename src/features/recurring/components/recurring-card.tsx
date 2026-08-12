"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecurringTransaction } from "../types";

interface Props {
  recurring: RecurringTransaction;
  onEdit?: (recurring: RecurringTransaction) => void;
  onDelete?: (recurring: RecurringTransaction) => void;
}

const statusStyles: Record<string, string> = {
  Active: "bg-income-bg text-income",
  Paused: "bg-warning/10 text-warning",
  Completed: "bg-muted text-muted-foreground",
};

function formatCurrency(amount: number, currency: string): string {
  const symbol = currency === "AUD" ? "$" : currency;
  return `${symbol}${amount.toFixed(2)}`;
}

export default function RecurringCard({
  recurring,
  onEdit,
  onDelete,
}: Props) {
  const isIncome =
    recurring.type === "Income" ||
    recurring.type === "Refund" ||
    recurring.type === "Savings Deposit" ||
    recurring.type === "Investment";
  const isActive = recurring.status === "Active";
  const nextRun = new Date(recurring.next_run);
  const nextRunFormatted = nextRun.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="glass-card flex flex-col gap-4 p-5">
      {/* Top: Icon + Info */}
      <div className="flex items-start gap-3">
        {/* Type icon badge */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            isIncome ? "bg-income-bg" : "bg-expense-bg",
          )}
        >
          {isIncome ? (
            <ArrowUpRight size={18} className="text-income" />
          ) : (
            <ArrowDownRight size={18} className="text-expense" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{recurring.name}</h3>
          <p className="text-sm text-muted-foreground">
            {recurring.person} · {recurring.category}
          </p>
        </div>

        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            statusStyles[recurring.status] ??
              "bg-muted text-muted-foreground",
          )}
        >
          {recurring.status}
        </span>
      </div>

      {/* Amount */}
      <div>
        <p
          className={cn(
            "text-2xl font-bold tracking-tight",
            isIncome ? "text-income" : "text-expense",
          )}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(recurring.amount, recurring.currency)}
        </p>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        {/* Frequency */}
        <div className="flex items-center gap-1">
          <RotateCcw size={12} />
          <span>
            {recurring.frequency}
            {recurring.interval > 1 ? ` ×${recurring.interval}` : ""}
          </span>
        </div>

        {/* Next run */}
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{nextRunFormatted}</span>
        </div>

        {!isActive && (
          <span className="text-warning">· Paused</span>
        )}
      </div>

      {/* Note (if any) */}
      {recurring.note && (
        <p className="rounded-lg bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground italic">
          {recurring.note}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-1 border-t border-glass-border pt-3">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onEdit?.(recurring)}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="xs"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete?.(recurring)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}