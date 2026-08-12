"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { CategoryExpense } from "../types";

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface Props {
  data: CategoryExpense[];
}

export default function ExpenseCategoryChart({ data }: Props) {
  const hasData = data && data.length > 0;

  return (
    <div className="glass-card p-4 sm:p-5">
      <h2 className="mb-4 text-base font-semibold sm:text-lg">
        Expense Categories
      </h2>

      {!hasData ? (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No data yet</p>
        </div>
      ) : (
        <div className="h-[280px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="50%"
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--glass-bg-strong)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "13px",
                  color: "var(--foreground)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}