export interface Category {
  category_id: string;

  name: string;

  type: "Income" | "Expense";

  icon: string;

  color: string;

  owner: "Ash" | "Rifa" | "Shared";
}

export interface CreateCategoryInput {
  name: string;

  type: "Income" | "Expense";

  icon: string;

  color: string;

  owner: "Ash" | "Rifa" | "Shared";
}