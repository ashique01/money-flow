import RecurringCard from "./recurring-card";
import { RecurringTransaction } from "../types";

interface Props {
  items: RecurringTransaction[];
  onEdit: (recurring: RecurringTransaction) => void;
  onDelete: (recurring: RecurringTransaction) => void;
}

export const RecurringGrid = ({ items, onEdit, onDelete }: Props) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <RecurringCard
        key={item.recurring_id}
        recurring={item}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ))}
  </div>
);
