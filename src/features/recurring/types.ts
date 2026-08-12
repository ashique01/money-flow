export interface RecurringTransaction {
  recurring_id: string;

  name: string;

  person: string;

  type:
    | "Income"
    | "Expense"
    | "Transfer"
    | "Savings Deposit"
    | "Investment"
    | "Refund";

  category: string;

  account: string;

  payment_method: string;

  amount: number;

  currency: string;

  frequency: "Daily" | "Weekly" | "Monthly" | "Yearly";

  interval: number;

  start_date: string;

  next_run: string;

  end_date?: string;

  status: "Active" | "Paused" | "Completed";

  note: string;

  created_at: string;

  updated_at: string;
}

export interface CreateRecurringInput {
  name: string;

  person: string;

  type: string;

  category: string;

  account?: string;

  payment_method?: string;

  amount: number;

  currency: string;

  frequency: string;

  interval: number;

  start_date: string;

  next_run: string;

  end_date?: string;

  status: string;

  note?: string;
}
