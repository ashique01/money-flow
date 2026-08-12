"use client";

import { useState } from "react";

import { useBudgets } from "../hooks/use-budgets";
import { Budget } from "../types";

import EditBudgetDialog from "./edit-budget-dialog";
import DeleteBudgetDialog from "./delete-budget-dialog";
import { BudgetsLoading } from "./BudgetsLoading";
import { BudgetsEmpty } from "./BudgetsEmpty";
import { BudgetsGrid } from "./BudgetsGrid";
import { BudgetsPagination } from "./BudgetsPagination";

import { usePagination } from "@/lib/usePagination";
import { ErrorBox } from "@/components/ErrorBox";

export default function BudgetList() {
  const { data, isLoading, error } = useBudgets();

  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteBudget, setDeleteBudget] = useState<Budget | null>(null);

  const budgets = data ?? [];

  const {
    page,
    setPage,
    pageCount,
    pagedItems: pagedBudgets,
  } = usePagination(budgets, 10);

  console.log("========== BUDGET DEBUG ==========");
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("data:", data);
  console.log("budgets:", budgets);
  console.log("budget count:", budgets.length);
  console.log("paged budgets:", pagedBudgets);
  console.log("page:", page);
  console.log("pageCount:", pageCount);
  console.log("===================================");

  if (isLoading) {
    return <BudgetsLoading />;
  }

  if (error) {
    return (
      <ErrorBox
        message={
          error instanceof Error ? error.message : "Failed to load budgets"
        }
      />
    );
  }

  if (budgets.length === 0) {
    return <BudgetsEmpty />;
  }

  return (
    <>
      <BudgetsGrid
        budgets={pagedBudgets}
        onEdit={(budget) => {
          setSelectedBudget(budget);
          setEditOpen(true);
        }}
        onDelete={(budget) => {
          setDeleteBudget(budget);
        }}
      />

      <BudgetsPagination page={page} pageCount={pageCount} setPage={setPage} />

      <EditBudgetDialog
        budget={selectedBudget}
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedBudget(null);
        }}
      />

      <DeleteBudgetDialog
        budget={deleteBudget}
        open={!!deleteBudget}
        onClose={() => {
          setDeleteBudget(null);
        }}
      />
    </>
  );
}
