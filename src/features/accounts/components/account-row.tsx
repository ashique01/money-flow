import { Account } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToggleStatusButton } from "./toggle-status-button";

interface Props {
  account: Account;
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
}

export default function AccountRow({ account, onEdit, onDelete }: Props) {
  const formattedBalance = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: account.currency || "AUD",
  }).format(account.balance);

  return (
    <tr className="glass-hover transition-colors">
      <td className="whitespace-nowrap p-3 text-xs sm:text-sm">
        {account.name}
      </td>

      <td className="whitespace-nowrap p-3 text-xs sm:text-sm">
        {account.type}
      </td>

      <td className="whitespace-nowrap p-3 text-xs sm:text-sm">
        {account.owner}
      </td>

      <td className="whitespace-nowrap p-3 text-right text-xs font-semibold tabular-nums sm:text-sm">
        {formattedBalance}
      </td>

      {/* Status column */}
      <td className="whitespace-nowrap p-3 text-center">
        <Badge variant={account.status === "Active" ? "default" : "secondary"}>
          {account.status}
        </Badge>
        {account.status === "Inactive" && (
          <div className="mt-1">
            <ToggleStatusButton id={account.id} />
          </div>
        )}
      </td>

      <td className="p-3">
        <div className="flex items-center justify-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => onEdit?.(account)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
            onClick={() => onDelete?.(account)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}