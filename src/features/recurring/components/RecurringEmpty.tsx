import { Repeat } from "lucide-react";

export const RecurringEmpty = () => (
  <div className="glass-card p-8 text-center">
    <Repeat size={40} className="mx-auto mb-3 text-muted-foreground/50" />
    <p className="text-sm text-muted-foreground">No recurring transactions yet.</p>
    <p className="mt-1 text-xs text-muted-foreground">Click "Add Recurring" to set up an automated transaction.</p>
  </div>
);