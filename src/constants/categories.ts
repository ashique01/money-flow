export interface CategoryOption {
  value: string;
  label: string;
  icon: string;
  type: "Income" | "Expense";
}


export const EXPENSE_CATEGORIES: CategoryOption[] = [

  {
    value: "Food",
    label: "Food",
    icon: "🍔",
    type: "Expense",
  },

  {
    value: "Transport",
    label: "Transport",
    icon: "🚗",
    type: "Expense",
  },

  {
    value: "Shopping",
    label: "Shopping",
    icon: "🛒",
    type: "Expense",
  },

  {
    value: "Subscription",
    label: "Subscription",
    icon: "🔄",
    type: "Expense",
  },

  {
    value: "Rent",
    label: "Rent",
    icon: "🏠",
    type: "Expense",
  },

  {
    value: "Utilities",
    label: "Utilities",
    icon: "💡",
    type: "Expense",
  },

  {
    value: "Health",
    label: "Health",
    icon: "🏥",
    type: "Expense",
  },

  {
    value: "Education",
    label: "Education",
    icon: "📚",
    type: "Expense",
  },

  {
    value: "Entertainment",
    label: "Entertainment",
    icon: "🎬",
    type: "Expense",
  },

  {
    value: "Travel",
    label: "Travel",
    icon: "✈️",
    type: "Expense",
  },

  {
    value: "Other",
    label: "Other",
    icon: "➕",
    type: "Expense",
  },

];



export const INCOME_CATEGORIES: CategoryOption[] = [

  {
    value: "Salary",
    label: "Salary",
    icon: "💰",
    type: "Income",
  },

  {
    value: "Freelance",
    label: "Freelance",
    icon: "💻",
    type: "Income",
  },

  {
    value: "Business",
    label: "Business",
    icon: "🏢",
    type: "Income",
  },

  {
    value: "Investment",
    label: "Investment",
    icon: "📈",
    type: "Income",
  },

  {
    value: "Gift",
    label: "Gift",
    icon: "🎁",
    type: "Income",
  },

  {
    value: "Other",
    label: "Other",
    icon: "➕",
    type: "Income",
  },

];