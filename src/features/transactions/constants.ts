// src/features/transactions/constants.ts

export const TRANSACTION_TYPES = [
  "Expense",
  "Income",
] as const;

export const CURRENCIES = [
  "AUD",
  "USD",
  "BDT",
] as const;

export const PAYMENT_METHODS = [
  "Cash",
  "Card",
  "Bank Transfer",
  "PayID",
  "Apple Pay",
  "Google Pay",
] as const;