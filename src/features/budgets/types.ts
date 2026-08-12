export interface Budget {
  // Category identifier (original)
  budget_id: string;

  person: string;

  category: string; // category ID
  category_id?: string; // duplicate of ID for clarity
  category_name?: string;
  category_icon?: string;
  category_color?: string;

  amount: number;

  period: string;

  created_at: string;

  updated_at: string;

  spent?: number;

  remaining?: number;

  percentage?: number;
  
}

export interface BudgetResponse {
  success: boolean;

  data: Budget[];
}

export interface CreateBudgetInput {
  person: string;

  category: string; // category ID
  category_id?: string; // duplicate of ID for clarity
  category_name?: string;
  category_icon?: string;
  category_color?: string;

  amount: number;

  period: string;
}
