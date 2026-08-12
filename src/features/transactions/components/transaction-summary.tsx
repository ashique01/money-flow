"use client";

import { Wallet, TrendingUp, TrendingDown, List } from "lucide-react";
import { useTransactions } from "../hooks/use-transactions";
import { cn } from "@/lib/utils";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(value);
}

export default function TransactionSummary() {
  const { data, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="glass-card animate-pulse p-4 sm:p-5"
          >
            <div className="mb-2 h-3 w-16 rounded bg-muted" />
            <div className="h-6 w-24 rounded bg-muted" />
          </div>
        ))}
      </div>
    );
  }

  const transactions = data?.transactions || [];

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expense;

  const cards = [
    {
      title: "Balance",
      value: balance,
      format: formatCurrency,
      icon: Wallet,
      color: balance >= 0 ? "text-income" : "text-expense",
      bg: balance >= 0 ? "bg-income-bg" : "bg-expense-bg",
    },
    {
      title: "Income",
      value: income,
      format: formatCurrency,
      icon: TrendingUp,
      color: "text-income",
      bg: "bg-income-bg",
    },
    {
      title: "Expense",
      value: expense,
      format: formatCurrency,
      icon: TrendingDown,
      color: "text-expense",
      bg: "bg-expense-bg",
    },
    {
      title: "Transactions",
      value: transactions.length,
      format: (v: number) => String(v),
      icon: List,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 stagger-children">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={cn(
              "glass-card flex flex-col gap-2 p-4 sm:p-5",
              "hover:scale-[1.02]",
            )}
          >
            <div className="flex items-center gap-2">
              <div className={cn("rounded-lg p-1.5", card.bg)}>
                <Icon size={16} className={card.color} />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {card.title}
              </p>
            </div>
            <h2 className={cn("text-xl font-bold tracking-tight sm:text-2xl", card.color)}>
              {card.format(card.value)}
            </h2>
          </div>
        );
      })}
    </div>
  );
}