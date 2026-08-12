import { TrendingUp, TrendingDown, PiggyBank, Wallet } from "lucide-react";
import { DashboardSummary as Summary } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  data: Summary;
}

const cardConfig = [
  {
    key: "balance",
    label: "Balance",
    icon: Wallet,
    getValue: (d: Summary) =>
      new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(d.balance),
    getColor: (d: Summary) => (d.balance >= 0 ? "text-income" : "text-expense"),
    getBg: (d: Summary) => (d.balance >= 0 ? "bg-income-bg" : "bg-expense-bg"),
  },
  {
    key: "income",
    label: "Income",
    icon: TrendingUp,
    getValue: (d: Summary) =>
      new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(d.income),
    getColor: () => "text-income",
    getBg: () => "bg-income-bg",
  },
  {
    key: "expense",
    label: "Expense",
    icon: TrendingDown,
    getValue: (d: Summary) =>
      new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(d.expense),
    getColor: () => "text-expense",
    getBg: () => "bg-expense-bg",
  },
  {
    key: "savingRate",
    label: "Saving Rate",
    icon: PiggyBank,
    getValue: (d: Summary) => `${d.savingRate}%`,
    getColor: (d: Summary) =>
      d.savingRate >= 20 ? "text-income" : "text-warning",
    getBg: (d: Summary) =>
      d.savingRate >= 20 ? "bg-income-bg" : "bg-warning/10",
  },
];

export default function DashboardSummary({ data }: Props) {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 stagger-children">
      {cardConfig.map((card) => {
        const Icon = card.icon;
        const value = card.getValue(data);
        const color = card.getColor(data);
        const bg = card.getBg(data);

        return (
          <div
            key={card.key}
            className={cn(
              "glass-card flex flex-col gap-2 p-4 sm:p-5",
              "hover:scale-[1.02]",
            )}
          >
            <div className="flex items-center gap-2">
              <div className={cn("rounded-lg p-1.5", bg)}>
                <Icon size={16} className={color} />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                {card.label}
              </p>
            </div>
            <h2
              className={cn(
                "text-xl font-bold tracking-tight sm:text-2xl",
                color,
              )}
            >
              {value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}
