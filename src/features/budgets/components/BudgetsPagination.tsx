import type { Dispatch, SetStateAction } from "react";

interface Props {
  page: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const BudgetsPagination = ({ page, pageCount, setPage }: Props) => {
  if (pageCount <= 1) return null;
  return (
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
  );
};