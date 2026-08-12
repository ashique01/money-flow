"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { budgetSchema, BudgetFormData } from "../schemas/budget.schema";


import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useCreateBudget } from "../hooks/use-create-budget";

export default function BudgetForm() {
  const mutation = useCreateBudget();

  const { register, handleSubmit, reset } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
  });

  function submit(data: BudgetFormData) {
    mutation.mutate(data, {
      onSuccess() {
        reset();
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}

      className="glass-card space-y-4 p-5"
    >
      <h2 className="font-semibold">Create Budget</h2>

      <Input placeholder="Person" {...register("person")} />

      <Input placeholder="Category" {...register("category")} />

      <Input
        type="number"
        placeholder="Amount"
        {...register("amount", {
          valueAsNumber: true,
        })}
      />

      <select
        className="flex h-10 w-full rounded-lg border px-3"
        {...register("period")}
      >
        <option value="Monthly">Monthly</option>

        <option value="Weekly">Weekly</option>
      </select>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Create Budget"}
      </Button>
    </form>
  );
}
