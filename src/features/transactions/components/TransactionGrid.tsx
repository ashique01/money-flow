import TransactionRow from "./transaction-row";
import { Transaction } from "../types";

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export const TransactionGrid = ({ transactions, onEdit, onDelete }: Props) => (
  <div className="glass-card overflow-hidden">
    <div className="overflow-x-auto no-scrollbar">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-glass-border bg-muted/40">
            <th className="p-3 text-left text-xs font-medium text-muted-foreground">Date</th>
            <th className="p-3 text-left text-xs font-medium text-muted-foreground">Person</th>
            <th className="p-3 text-left text-xs font-medium text-muted-foreground">Category</th>
            <th className="p-3 text-left text-xs font-medium text-muted-foreground">Note</th>
            <th className="p-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
            <th className="hidden p-3 text-center text-xs font-medium text-muted-foreground sm:table-cell">Recurring</th>
            <th className="p-3 text-center text-xs font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-glass-border">
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.transaction_id}
              transaction={transaction}
              onEdit={() => onEdit(transaction)}
              onDelete={() => onDelete(transaction)}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
