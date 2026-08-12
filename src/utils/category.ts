import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  CategoryOption,
} from "@/constants/categories";

export function getCategoriesByType(
  type: "Expense" | "Income",
): CategoryOption[] {
  if (type === "Income") {
    return INCOME_CATEGORIES;
  }

  return EXPENSE_CATEGORIES;
}
