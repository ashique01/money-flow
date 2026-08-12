import { z } from "zod";

export const budgetSchema = z.object({
  person: z.string().min(1, "Person is required"),

  category: z.string().min(1, "Category is required"),

  amount: z.number().positive("Amount must be greater than 0"),

  period: z.string().min(1, "Period is required"),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
