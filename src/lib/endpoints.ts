export const API = {
  // Dashboard
  DASHBOARD: "dashboard",

  // Transactions
  TRANSACTIONS: "transactions",
  TRANSACTION: "transaction",
  CREATE_TRANSACTION: "createTransaction",
  UPDATE_TRANSACTION: "updateTransaction",
  DELETE_TRANSACTION: "deleteTransaction",

  // Accounts
  ACCOUNTS: "accounts",
  TOGGLE_ACCOUNT: "toggleAccountStatus",
  CREATE_ACCOUNT: "createAccount",
  UPDATE_ACCOUNT: "updateAccount",
  DELETE_ACCOUNT: "deleteAccount",

  // Categories

  CATEGORIES: "categories",

  CREATE_CATEGORY: "createCategory",

  UPDATE_CATEGORY: "updateCategory",

  DELETE_CATEGORY: "deleteCategory",

  // Budgets
  BUDGETS: "budgets",
  CREATE_BUDGET: "createBudget",
  UPDATE_BUDGET: "updateBudget",
  DELETE_BUDGET: "deleteBudget",

  // Recurring

  RECURRING: "recurring",

  CREATE_RECURRING: "createRecurring",

  UPDATE_RECURRING: "updateRecurring",

  DELETE_RECURRING: "deleteRecurring",

  // Users
  USERS: "users",
  LOGIN: "login",

  // Goals
  GOALS: "goals",

  CREATE_GOAL: "createGoal",

  UPDATE_GOAL: "updateGoal",

  DELETE_GOAL: "deleteGoal",
  // Google proxy endpoint
  GOOGLE: "google",

} as const;
