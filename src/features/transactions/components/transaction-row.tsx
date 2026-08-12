import { Transaction } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (transaction: Transaction) => void;
}

export default function TransactionRow({
  transaction,
  onEdit,
  onDelete,
}: Props) {
  const isIncome = transaction.type === "Income";

  const formattedAmount = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: transaction.currency || "AUD",
  }).format(transaction.amount);

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-AU");

  return (
    <tr className="glass-hover transition-colors">
      <td className="whitespace-nowrap p-3 text-xs sm:text-sm">
        {formattedDate}
      </td>

      <td className="whitespace-nowrap p-3 text-xs sm:text-sm">
        {transaction.person}
      </td>

      <td className="whitespace-nowrap p-3 text-xs sm:text-sm">
        {transaction.category}
      </td>

      <td className="max-w-36 truncate p-3 text-xs sm:text-sm">
        {transaction.note || "-"}
      </td>

      <td
        className={cn(
          "whitespace-nowrap p-3 text-right text-xs font-semibold tabular-nums sm:text-sm",
          isIncome ? "text-income" : "text-expense",
        )}
      >
        {isIncome ? "+" : "-"}
        {formattedAmount}
      </td>

      <td className="hidden p-3 text-center sm:table-cell">
        {transaction.tags === "Recurring" && (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
            Recurring
          </span>
        )}
      </td>

      <td className="p-3">
        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => onEdit?.(transaction)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="
    text-destructive
    hover:text-destructive-foreground
    hover:bg-destructive/10
  "
            onClick={() => onDelete?.(transaction)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
