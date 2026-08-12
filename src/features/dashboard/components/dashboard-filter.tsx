"use client";

import { DashboardPeriod } from "../types";

interface Props {
  value: DashboardPeriod;

  onChange: (value: DashboardPeriod) => void;
}

const options = [
  {
    label: "Today",
    value: "today",
  },

  {
    label: "This Week",
    value: "week",
  },

  {
    label: "This Month",
    value: "month",
  },

  {
    label: "Last Month",
    value: "last_month",
  },

  {
    label: "This Year",
    value: "year",
  },

  {
    label: "All Time",
    value: "all",
  },
];

export default function DashboardFilter({ value, onChange }: Props) {
  return (
    <select
      className="
flex
h-10
rounded-lg
border
border-input
bg-background
px-3
text-sm
"

      value={value}

      onChange={(e) => onChange(e.target.value as DashboardPeriod)}
    >
      {options.map((item) => (
        <option
          key={item.value}

          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
  );
}
