"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Plus, ChevronDown } from "lucide-react";

import {
  transactionSchema,
  TransactionFormData,
} from "../schemas/transaction.schema";

import { useCreateTransaction } from "../hooks/use-create-transaction";

import { getCategoriesByType } from "@/utils/category";

import { TRANSACTION_TYPES, PAYMENT_METHODS, CURRENCIES } from "../constants";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";

import { cn } from "@/lib/utils";

const selectClasses = `
  flex
  h-10
  w-full
  rounded-lg
  border
  border-input
  bg-background/50
  px-3
  py-2
  text-sm
  shadow-sm
  transition-colors
  focus-visible:border-ring
  focus-visible:outline-none
  focus-visible:ring-1
  focus-visible:ring-ring
  `;

export default function TransactionForm() {
  const mutation = useCreateTransaction();

  const isMobile = useIsMobile();

  const [expanded, setExpanded] = useState(true);

  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

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

  const selectedType = watch("type") === "Income" ? "Income" : "Expense";

  const selectedCategory = watch("category");

  const categories = getCategoriesByType(selectedType);

  useEffect(() => {
    if (selectedCategory !== "Other") {
      setCustomCategory("");
    }
  }, [selectedCategory]);

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
      },
    });
  }

  const formContent = (
    <form
      onSubmit={handleSubmit(submit)}

      className="
      space-y-5
      "
    >
      <div>
        <h2
          className="
          text-base
          font-semibold
          sm:text-lg
          "
        >
          Add Transaction
        </h2>

        <p
          className="
          text-xs
          text-muted-foreground
          "
        >
          Track your income and expenses.
        </p>
      </div>

      <div
        className="
        grid
        gap-3
        sm:grid-cols-2
        lg:grid-cols-4
        "
      >
        <div className="space-y-1">
          <label className="text-xs font-medium">Date</label>

          <Input
            type="date"

            className="
            h-10
            text-sm
            "

            {...register("date")}
          />

          {errors.date && (
            <p
              className="
              text-xs
              text-destructive
              "
            >
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Person</label>

          <select
            className={selectClasses}

            {...register("person")}
          >
            <option value="Ash">Ash</option>

            <option value="Rifa">Rifa</option>

            <option value="Shared">Shared</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Type</label>

          <select
            className={selectClasses}

            {...register("type")}
          >
            {TRANSACTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Category</label>

          <select
            className={selectClasses}

            {...register("category")}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option
                key={`${cat.type}-${cat.value}`}

                value={cat.value}
              >
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>

          {errors.category && (
            <p
              className="
              text-xs
              text-destructive
              "
            >
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Account</label>

          <select
            className={selectClasses}

            {...register("account")}
          >
            <option value="">Select Account</option>

            <option value="NAB">NAB</option>

            <option value="Cash">Cash</option>

            <option value="Savings">Savings</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Payment Method</label>

          <select
            className={selectClasses}

            {...register("payment_method")}
          >
            <option value="">Select Method</option>

            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Amount</label>

          <Input
            type="number"

            step="0.01"

            className="
            h-10
            text-sm
            "

            {...register("amount", {
              valueAsNumber: true,
            })}
          />

          {errors.amount && (
            <p
              className="
              text-xs
              text-destructive
              "
            >
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium">Currency</label>

          <select
            className={selectClasses}

            {...register("currency")}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCategory === "Other" && (
        <Input
          placeholder="
            Enter custom category
            "

          className="
            h-10
            text-sm
            "

          value={customCategory}

          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}

      <Input
        placeholder="Note"

        className="
        h-10
        text-sm
        "

        {...register("note")}
      />

      <Input
        placeholder="
        e.g. Travel, Work
        "

        className="
        h-10
        text-sm
        "

        {...register("tags")}
      />

      <Button
        type="submit"

        disabled={mutation.isPending}

        className="
        h-11
        w-full
        text-sm
        font-semibold
        "

        size="lg"
      >
        {mutation.isPending ? "Saving..." : "Create Transaction"}
      </Button>
    </form>
  );

  return (
    <div
      className="
      glass-card
      overflow-hidden
      "
    >
      {isMobile && (
        <button
          type="button"

          onClick={() => setExpanded(!expanded)}

          className={cn(
            `
              flex
              w-full
              items-center
              justify-between
              p-4
              text-sm
              font-medium
              `,

            expanded &&
              `
              border-b
              border-glass-border
              `,
          )}
        >
          <span
            className="
              flex
              items-center
              gap-2
              "
          >
            <Plus size={16} />
            Add Transaction
          </span>

          <ChevronDown
            size={16}

            className={cn(
              `
                text-muted-foreground
                transition-transform
                duration-200
                `,

              expanded && "rotate-180",
            )}
          />
        </button>
      )}

      <div
        className={cn(
          `
          overflow-hidden
          transition-all
          duration-300
          `,

          expanded ? "max-h-[2000px] p-4 sm:p-5" : "max-h-0",
        )}
      >
        {formContent}
      </div>
    </div>
  );
}
