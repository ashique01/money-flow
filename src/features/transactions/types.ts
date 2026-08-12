export interface Transaction {
  transaction_id: string;

  date: string;

  person: string;

  type: string;

  category: string;

  account: string;

  payment_method: string;

  amount: number;

  currency: string;

  note: string;

  tags: string;

  recurring_id?: string;

  created_at: string;

  updated_at: string;
}

export interface CreateTransactionInput {
  date: string;

  person: string;

  type: string;

  category: string;

  account?: string;

  payment_method?: string;

  amount: number;

  currency?: string;

  note?: string;

  tags?: string;
}

export interface TransactionResponse {
  count: number;

  transactions: Transaction[];
}

export interface TransactionFilters {
  search?: string;

  type?: string;

  person?: string;

  category?: string;

  startDate?: string;

  endDate?: string;

  sortBy?: "newest" | "oldest" | "amount_high" | "amount_low";
}

export interface Budget {
  budget_id: string;

  person: string;

  category: string;

  amount: number;

  period: string;

  start_date: string;

  end_date: string;

  created_at: string;

  updated_at: string;
}

export interface BudgetResponse {
  success: boolean;

  data: Budget[];
}
