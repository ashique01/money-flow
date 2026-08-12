import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}

export const PaginationControls = ({ page, pageCount, onPrev, onNext }: Props) => {
  if (pageCount <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-4 py-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={page === 1}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Previous
      </Button>
      <span>
        Page {page} of {pageCount}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={page === pageCount}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};
