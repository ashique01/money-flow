"use client";

import { useEffect } from "react";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";

import { TransactionFormData } from "../schemas/transaction.schema";

import { getCategoriesByType } from "@/utils/category";
import type { CategoryOption } from "@/constants/categories";

import { Input } from "@/components/ui/input";

interface Props {
  register: UseFormRegister<TransactionFormData>;

  errors: FieldErrors<TransactionFormData>;

  watch: UseFormWatch<TransactionFormData>;

  customCategory: string;

  setCustomCategory: React.Dispatch<React.SetStateAction<string>>;
}

const selectClasses =
  "flex h-10 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export default function TransactionFormFields({
  register,

  errors,

  watch,

  customCategory,

  setCustomCategory,

  categories: externalCategories,
}: Props & { categories?: any }) {
  const selectedType = watch("type") === "Income" ? "Income" : "Expense";

  const selectedCategory = watch("category");

  // If externalCategories (fetched from backend) are provided, map them to the CategoryOption shape.
  // Otherwise fall back to the static constants.
  let categories: CategoryOption[] = [];
  if (externalCategories && externalCategories.length) {
    const mapped = (externalCategories as any[]).map((c) => ({
      value: c.name,
      label: c.name,
      icon: c.icon || "📁",
      type: c.type,
    }));
    categories = mapped.filter((cat) => cat.type === selectedType);
    // Ensure an "Other" option is always available.
    categories.push({
      value: "Other",
      label: "Other",
      icon: "➕",
      type: selectedType,
    });
  } else {
    categories = getCategoriesByType(selectedType);
  }

  useEffect(() => {
    if (selectedCategory !== "Other") {
      setCustomCategory("");
    }
  }, [selectedCategory, setCustomCategory]);

  return (
    <div className="space-y-4">
      {/* Date */}

      <div className="space-y-1">
        <Input
          type="date"

          className="h-10 text-sm"

          {...register("date")}
        />

        {errors.date && (
          <p className="text-xs text-destructive">{errors.date.message}</p>
        )}
      </div>

      {/* Person */}

      <select
        className={selectClasses}

        {...register("person")}
      >
        <option value="Ash">Ash</option>

        <option value="Rifa">Rifa</option>

        <option value="Shared">Shared</option>
      </select>

      {/* Type */}

      <select
        className={selectClasses}

        {...register("type")}
      >
        <option value="Expense">Expense</option>

        <option value="Income">Income</option>
      </select>

      {/* Category */}

      <div className="space-y-1">
        <select
          className={selectClasses}

          {...register("category")}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option
              key={`${category.type}-${category.value}`}

              value={category.value}
            >
              {category.icon} {category.label}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="text-xs text-destructive">{errors.category.message}</p>
        )}
      </div>

      {/* Custom Category */}

      {selectedCategory === "Other" && (
        <Input
          placeholder="Enter custom category"

          className="h-10 text-sm"

          value={customCategory}

          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}

      {/* Account */}

      <Input
        placeholder="Account"

        className="h-10 text-sm"

        {...register("account")}
      />

      {/* Payment Method */}

      <Input
        placeholder="Payment Method"

        className="h-10 text-sm"

        {...register("payment_method")}
      />

      {/* Amount */}

      <div className="space-y-1">
        <Input
          type="number"

          step="0.01"

          placeholder="Amount"

          className="h-10 text-sm"

          {...register("amount", {
            valueAsNumber: true,
          })}
        />

        {errors.amount && (
          <p className="text-xs text-destructive">{errors.amount.message}</p>
        )}
      </div>

      {/* Currency */}

      <Input
        placeholder="Currency"

        className="h-10 text-sm"

        {...register("currency")}
      />

      {/* Note */}

      <Input
        placeholder="Note"

        className="h-10 text-sm"

        {...register("note")}
      />

      {/* Tags */}

      <Input
        placeholder="Tags"

        className="h-10 text-sm"

        {...register("tags")}
      />
    </div>
  );
}
