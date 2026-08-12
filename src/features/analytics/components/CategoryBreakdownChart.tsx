import { CategorySpending } from "../types";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#22c55e",
];

interface Props {
  data?: CategorySpending[];
}

export function CategoryBreakdownChart({ data = [] }: Props) {
  const chartData = data.map((item) => ({
    name: item.categoryName,
    value: item.amount,
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        No spending data available
      </div>
    );
  }

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {chartData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip
        formatter={(value) => {
          const numericValue = Array.isArray(value)
            ? Number(value[0] ?? 0)
            : Number(value ?? 0);

          return numericValue.toLocaleString(undefined, {
            style: "currency",
            currency: "AUD",
          });
        }}
      />

      <Legend />
    </PieChart>
  );
}
