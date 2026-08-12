import { useState, useMemo } from "react";

/**
 * Generic pagination hook.
 * Takes an array of items and a page size, returns the current page slice
 * and helpers to navigate pages.
 */
export function usePagination<T>(items: T[] = [], pageSize = 10) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

  const pagedItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  const next = () => setPage((p) => Math.min(p + 1, pageCount));
  const prev = () => setPage((p) => Math.max(p - 1, 1));

  return { page, setPage, pageCount, pagedItems, next, prev };
}
