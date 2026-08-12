"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlySummary } from "../types";

interface Props {
  data: MonthlySummary;
}

export default function MonthlyOverviewChart({ data }: Props) {
  const chartData = [
    { name: "Income", value: data.income ?? 0, fill: "hsl(var(--chart-3))" },
    { name: "Expense", value: data.expense ?? 0, fill: "hsl(var(--chart-5))" },
  ];

  const hasData = chartData.some((d) => d.value > 0);

  return (
    <div className="glass-card p-4 sm:p-5">
      <h2 className="mb-4 text-base font-semibold sm:text-lg">
        Monthly Overview
      </h2>

      {!hasData ? (
        <div className="flex h-[300px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No data yet</p>
        </div>
      ) : (
        <div className="h-[280px] sm:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={8}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 13, fill: "var(--muted-foreground)" }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--glass-bg-strong)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "13px",
                  color: "var(--foreground)",
                }}
                cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              />
              <Bar
                dataKey="value"
                radius={[8, 8, 0, 0]}
                maxBarSize={80}
                fill="hsl(var(--primary))"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}