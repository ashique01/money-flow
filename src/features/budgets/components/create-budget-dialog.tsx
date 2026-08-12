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

import { useForm } from "react-hook-form";
import React from "react";
import { useAuthStore } from "@/store/auth-store";
import { useCategories } from "@/features/categories/hooks/use-categories";

import { zodResolver } from "@hookform/resolvers/zod";


import { budgetSchema, BudgetFormData } from "../schemas/budget.schema";
import { useCreateBudget } from "../hooks/use-create-budget";

// Basic fallback categories when none are loaded from the sheet
const defaultCategories = [
  { category_id: "default-1", name: "General", icon: "" },
  { category_id: "default-2", name: "Food", icon: "" },
  { category_id: "default-3", name: "Transport", icon: "" },
  { category_id: "default-4", name: "Entertainment", icon: "" },
];

interface Props {
  open: boolean;

  onClose: () => void;
}

export default function CreateBudgetDialog({ open, onClose }: Props) {
  const mutation = useCreateBudget();

  const email = useAuthStore((s) => s.email);
  const { data: categories, isLoading: catLoading, error: catError } = useCategories(email ?? "");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
  });

  const [customCategory, setCustomCategory] = React.useState("");

  // Set default category when categories are loaded and none selected
  React.useEffect(() => {
    if (categories && categories.length > 0 && !watch("category")) {
      setValue("category", categories[0].category_id);
    }
  }, [categories, setValue, watch]);

  // Clear custom category when a predefined one is selected
  const selectedCategory = watch("category");
  React.useEffect(() => {
    if (selectedCategory !== "Other") {
      setCustomCategory("");
    }
  }, [selectedCategory]);

  function submit(data: BudgetFormData) {
    // If user selected "Other", replace category with custom input
    if (data.category === "Other") {
      data.category = customCategory.trim();
    }
    mutation.mutate(data, {
      onSuccess() {
        reset();

        onClose();
      },
    });
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Budget</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Set a spending limit for a person and category.
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}

          className="space-y-4"
        >
          <select
            className="h-10 w-full rounded-lg border px-3"
            {...register("person")}
          >
            <option value="Ash">Ash</option>

            <option value="Rifa">Rifa</option>

            <option value="Shared">Shared</option>
          </select>

          {/* Category Select */}
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
              {mutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
