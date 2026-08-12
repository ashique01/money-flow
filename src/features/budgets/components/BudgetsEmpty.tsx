import { PiggyBank } from "lucide-react";

export const BudgetsEmpty = () => (
  <div className="glass-card p-8 text-center">
    <PiggyBank size={40} className="mx-auto mb-3 text-muted-foreground/50" />
    <p className="text-sm text-muted-foreground">No budgets created yet.</p>
    <p className="mt-1 text-xs text-muted-foreground">
      Click &quot;Create Budget&quot; above to set your first spending limit.
    </p>
  </div>
);