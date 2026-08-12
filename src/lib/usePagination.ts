import { useEffect, useState } from "react";

export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState<number>(1);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, pageCount));
  }, [pageCount]);

  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);

  return {
    page,
    setPage,
    pageCount,
    pagedItems,
  };
}
