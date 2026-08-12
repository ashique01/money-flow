"use client";

import { Button } from "@/components/ui/button";
import { Budget } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  budget: Budget;

  onEdit?: (budget: Budget) => void;

  onDelete?: (budget: Budget) => void;
}

export default function BudgetCard({ budget, onEdit, onDelete }: Props) {
  const spent = budget.spent ?? 0;
  const remaining = budget.remaining ?? 0;
  const percentage = Math.min(budget.percentage ?? 0, 100);
  const isOverBudget = remaining < 0;
  const isNearlyExceeded = percentage >= 90;

  return (
    <div className="glass-card space-y-4 p-5">
      {/* Header */}

      <div className="flex justify-between">
        <div>
          <div className="flex items-center space-x-2">
          {budget.category_icon && (
            <span
              className="inline-block w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: budget.category_color || "transparent" }}
            >
              {budget.category_icon}
            </span>
          )}
          <h3 className="font-semibold">{budget.category_name || budget.category}</h3>
        </div>

          <p className="text-sm text-muted-foreground">{budget.person}</p>
        </div>

        <span className="text-sm text-muted-foreground">{budget.period}</span>
      </div>

      {/* Budget */}

      <div>
        <p className="text-2xl font-bold">
          ${(budget.amount ?? 0).toFixed(2)}
        </p>

        <p className="text-xs text-muted-foreground">Budget limit</p>
      </div>

      {/* Usage */}

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Spent</span>

          <span className="font-medium">${spent.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Remaining</span>

          <span
            className={cn(
              "font-medium",
              isOverBudget ? "text-destructive" : "text-income",
            )}
          >
            ${remaining.toFixed(2)}
          </span>
        </div>

        {/* Progress Bar */}

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              percentage >= 90
                ? "bg-destructive"
                : percentage >= 70
                  ? "bg-warning"
                  : "bg-primary",
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {percentage}% used
        </p>

        {/* Warnings */}

        {isOverBudget && (
          <p className="text-xs font-semibold text-destructive">
            Budget exceeded by ${Math.abs(remaining).toFixed(2)}!
          </p>
        )}

        {!isOverBudget && isNearlyExceeded && (
          <p className="text-xs font-semibold text-warning">
            Almost at limit — ${remaining.toFixed(2)} remaining
          </p>
        )}
      </div>

      {/* Actions */}

      <div className="flex justify-end gap-1 border-t pt-3">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onEdit?.(budget)}
        >
          Edit
        </Button>

        <Button
          variant="ghost"
          size="xs"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onDelete?.(budget)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}