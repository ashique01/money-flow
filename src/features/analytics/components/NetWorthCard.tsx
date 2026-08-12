// src/features/analytics/components/NetWorthCard.tsx

import { NetWorth } from "../types";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface Props {
  netWorth?: NetWorth | null;
}

export function NetWorthCard({ netWorth }: Props) {
  const amount = netWorth?.amount ?? 0;

  return (
    <Card className="bg-muted/50">
      <CardHeader>Net Worth</CardHeader>

      <CardContent className="text-2xl font-bold">
        {amount.toLocaleString(undefined, {
          style: "currency",
          currency: "AUD",
        })}
      </CardContent>
    </Card>
  );
}
