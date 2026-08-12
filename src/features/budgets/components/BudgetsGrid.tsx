import BudgetCard from "./budget-card";
import { Budget } from "../types";

interface Props {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (budget: Budget) => void;
}

export const BudgetsGrid = ({ budgets, onEdit, onDelete }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {budgets.map((budget) => (
      <BudgetCard
        key={budget.budget_id}
        budget={budget}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);
