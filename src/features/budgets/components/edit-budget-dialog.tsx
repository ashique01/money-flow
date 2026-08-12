"use client";

import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth-store";
import { useCategories } from "@/features/categories/hooks/use-categories";

// Basic fallback categories when none are loaded from the sheet
const defaultCategories = [
  { category_id: "default-1", name: "General", icon: "" },
  { category_id: "default-2", name: "Food", icon: "" },
  { category_id: "default-3", name: "Transport", icon: "" },
  { category_id: "default-4", name: "Entertainment", icon: "" },
];

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

import { Budget } from "../types";

import { budgetSchema, BudgetFormData } from "../schemas/budget.schema";

import { useUpdateBudget } from "../hooks/use-update-budget";

interface Props {
  budget: Budget | null;

  open: boolean;

  onClose: () => void;
}

export default function EditBudgetDialog({ budget, open, onClose }: Props) {
  const mutation = useUpdateBudget();

  const email = useAuthStore((s) => s.email);
  const { data: categories, isLoading: catLoading, error: catError } = useCategories(email ?? "");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
  });

  const [customCategory, setCustomCategory] = useState("");

  // Clear custom category when a predefined one is selected
  const selectedCategory = watch("category");
  React.useEffect(() => {
    if (selectedCategory !== "Other") {
      setCustomCategory("");
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!budget) return;
    // Determine the appropriate category ID to pre‑select
    let selectedCatId = budget.category;
    if (categories && categories.length) {
      const match = categories.find((c) => c.name === budget.category || c.category_id === budget.category);
      if (match) selectedCatId = match.category_id;
    } else {
      const match = defaultCategories.find((c) => c.name === budget.category);
      if (match) selectedCatId = match.category_id;
    }
    reset({
      person: budget.person,
      category: selectedCatId,
      amount: budget.amount,
      period: budget.period,
    });
  }, [budget, categories]);

  function submit(data: BudgetFormData) {
    // Replace "Other" with custom category text
    if (data.category === "Other") {
      data.category = customCategory.trim();
    }
    if (!budget) return;

    mutation.mutate(
      { budget_id: budget.budget_id, data },
      {
        onSuccess() {
          onClose();
        },
      },
    );
  }

  if (catLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
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
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <p className="text-destructive">Failed to load categories. Please try again.</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update the spending limit details below.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* Person */}

          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("person")}
          >
            <option value="Ash">Ash</option>

            <option value="Rifa">Rifa</option>

            <option value="Shared">Shared</option>
          </select>

          {/* Category */}

          {/* Category Select */}
          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("category")}
          >
            <option value="" disabled>Select category</option>
            {(categories && categories.length > 0 ? categories : defaultCategories).map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.icon ? `${cat.icon} ` : ''}{cat.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {/* Custom Category Input */}
          {watch("category") === "Other" && (
            <Input
              placeholder="Custom category"
              className="h-10"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
            />
          )}

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
            {...register("amount", {
              valueAsNumber: true,
            })}
          />

          {errors.amount && (
            <p className="text-xs text-destructive">
              {errors.amount.message}
            </p>
          )}

          {/* Period */}

          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("period")}
          >
            <option value="Monthly">Monthly</option>

            <option value="Weekly">Weekly</option>

            <option value="Yearly">Yearly</option>
          </select>

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