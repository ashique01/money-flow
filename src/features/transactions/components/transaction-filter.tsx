"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { TransactionFilters } from "../types";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/constants/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface Props {
  filters: TransactionFilters;
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
}

const selectClasses =
  "flex h-9 w-full rounded-lg border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export default function TransactionFilter({ filters, setFilters }: Props) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(!isMobile);

  function clearFilters() {
    setFilters({});
  }

  const anyActive = Object.values(filters).some(
    (v) => v !== undefined && v !== "",
  );

  const filterContent = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {/* Search */}
      <Input
        placeholder="Search transactions..."
        value={filters.search || ""}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value || undefined })
        }
        className="h-9 text-sm"
      />

      {/* Type */}
      <select
        className={selectClasses}
        value={filters.type || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            type: e.target.value || undefined,
          })
        }
      >
        <option value="">All Types</option>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>

      {/* Person */}
      <select
        className={selectClasses}
        value={filters.person || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            person: e.target.value || undefined,
          })
        }
      >
        <option value="">All People</option>
        <option value="Ash">Ash</option>
        <option value="Rifa">Rifa</option>
        <option value="Shared">Shared</option>
      </select>

      {/* Category */}
      <select
        className={selectClasses}
        value={filters.category || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            category: e.target.value || undefined,
          })
        }
      >
        <option value="">All Categories</option>
        {[...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES].map((cat) => (
          <option key={`${cat.type}-${cat.value}`} value={cat.value}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>

      {/* Start Date */}
      <Input
        type="date"
        className="h-9 text-sm"
        value={filters.startDate || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            startDate: e.target.value || undefined,
          })
        }
      />

      {/* End Date */}
      <Input
        type="date"
        className="h-9 text-sm"
        value={filters.endDate || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            endDate: e.target.value || undefined,
          })
        }
      />

      {/* Sort By */}
      <select
        className={selectClasses}
        value={filters.sortBy || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            sortBy: (e.target.value as TransactionFilters["sortBy"]) || undefined,
          })
        }
      >
        <option value="">Sort By</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="amount_high">Highest Amount</option>
        <option value="amount_low">Lowest Amount</option>
      </select>

      {/* Clear */}
      <div className="flex items-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 w-full gap-1.5"
          onClick={clearFilters}
          disabled={!anyActive}
        >
          <X size={14} />
          Clear
        </Button>
      </div>
    </div>
  );

  return (
    <div className="glass-card overflow-hidden">
      {/* Mobile toggle */}
      {isMobile && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center justify-between p-4 text-sm font-medium",
            expanded && "border-b border-glass-border",
          )}
        >
          <span className="flex items-center gap-2">
            <Filter size={16} />
            Filters
            {anyActive && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-[10px] font-bold text-primary">
                !
              </span>
            )}
          </span>
          <span
            className={cn(
              "text-xs text-muted-foreground transition-transform duration-200",
              expanded && "rotate-180",
            )}
          >
            ▼
          </span>
        </button>
      )}

      {/* Filter content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          expanded ? "max-h-[800px] p-4" : "max-h-0",
        )}
      >
        {filterContent}
      </div>
    </div>
  );
}