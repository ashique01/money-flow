import { useState } from "react";
import { RecentTransaction } from "../types";
import { cn } from "@/lib/utils";

interface Props {
  data: RecentTransaction[];
}

export default function RecentTransactions({ data }: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  const pagedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="glass-card p-4 sm:p-5">
      <h2 className="mb-4 text-base font-semibold sm:text-lg">
        Recent Transactions
      </h2>

      {data.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No recent transactions
        </p>
      ) : (
        <>
          <div className="divide-y divide-glass-border">
            {pagedData.map((tx) => (
              <div
                key={tx.transaction_id}
                className={cn(
                  "flex items-center justify-between gap-3 py-3",
                  "glass-hover rounded-lg px-2 -mx-2",
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {tx.note || "Transaction"}
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.category}</p>
                </div>

                <p className="shrink-0 text-sm font-semibold tabular-nums">
                  {tx.currency} {tx.amount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          {/* Pagination Controls */}
          {pageCount > 1 && (
            <div className="flex justify-center items-center gap-4 py-2">
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {pageCount}
              </span>
              <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
                disabled={page === pageCount}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}