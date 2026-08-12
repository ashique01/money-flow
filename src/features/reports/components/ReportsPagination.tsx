interface Props {
  page: number;
  pageCount: number;
  setPage: (page: number) => void;
}

export const ReportsPagination = ({ page, pageCount, setPage }: Props) => {
  if (pageCount <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="px-3 py-1 rounded border disabled:opacity-50"
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {pageCount}
      </span>
      <button
        className="px-3 py-1 rounded border disabled:opacity-50"
        onClick={() => setPage(Math.min(page + 1, pageCount))}
        disabled={page === pageCount}
      >
        Next
      </button>
    </div>
  );
};
