import { z } from "zod";

export const recurringSchema = z.object({
  name: z.string().min(1, "Name is required"),
  person: z.string().min(1, "Person is required"),
  type: z.string().min(1, "Type is required"),
  category: z.string().min(1, "Category is required"),
  account: z.string().optional(),
  payment_method: z.string().optional(),
  amount: z.number().positive("Amount must be greater than 0"),
  currency: z.string().min(1),
  frequency: z.string().min(1, "Frequency is required"),
  interval: z.number().min(1, "Interval must be at least 1"),
  start_date: z.string().min(1, "Start date is required"),
  next_run: z.string().min(1, "Next run is required"),
  end_date: z.string().optional(),
  status: z.string().min(1),
  note: z.string().optional(),
});

export type RecurringFormData = z.infer<typeof recurringSchema>;