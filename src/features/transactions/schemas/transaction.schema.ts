import { z } from "zod";

export const transactionSchema = z.object({
  date: z.string().min(1, "Date is required"),

  person: z.string().min(1, "Person is required"),

  type: z.string().min(1, "Type is required"),

  category: z.string().min(1, "Category is required"),

  account: z.string().optional(),

  payment_method: z.string().optional(),

  amount: z.number().positive("Amount must be greater than zero"),

  currency: z.string().optional(),

  note: z.string().optional(),

  tags: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
