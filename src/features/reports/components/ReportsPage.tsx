/* Enhanced Reports Page – advanced filtering, sorting, pagination, and visual insights */
"use client";

import { useState, useMemo } from "react";
import { useEnrichedRows } from '../hooks/useEnrichedRows';
import { useChartData } from '../hooks/useChartData';
import { ReportsFilters } from './ReportsFilters';
import { ReportsSummary } from './ReportsSummary';
import { ReportsChart } from './ReportsChart';
import { ReportsTable } from './ReportsTable';
import { ReportsPagination } from './ReportsPagination';
import { useReports } from "../hooks/useReports";
import { ReportExportButtons } from "./ReportExportButtons";
import { Spinner } from "@/components/ui/spinner";
import { ReportFilters, ReportPeriod } from "../types";

export const ReportsPage = () => {
  
  // ----- UI state -----
  const [filters, setFilters] = useState<ReportFilters>({ period: "MONTHLY" });
  const { data, isLoading, error } = useReports(filters);

  // ----- Filter handling -----
  const updateFilter = (key: keyof ReportFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

 
  // ----- Data enrichment -----
  const enrichedRows = useEnrichedRows(filters);


  // ----- Sorting -----
  const [sortKey, setSortKey] = useState<string>("date");
  const [sortDesc, setSortDesc] = useState<boolean>(false);
  const sortedRows = useMemo(() => {
    const copy = [...enrichedRows];
    copy.sort((a, b) => {
      const av = (a as any)[sortKey];
      const bv = (b as any)[sortKey];
      if (av < bv) return sortDesc ? 1 : -1;
      if (av > bv) return sortDesc ? -1 : 1;
      return 0;
    });
    return copy;
  }, [enrichedRows, sortKey, sortDesc]);

  // ----- Pagination -----
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const pageCount = Math.ceil(sortedRows.length / pageSize) || 1;
  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, page]);

  // ----- Chart data (amount per category) -----
  const chartData = useChartData(filters);


  // ----- UI actions -----
  const handleHeaderClick = (key: string) => {
    if (sortKey === key) setSortDesc((d) => !d);
    else { setSortKey(key); setSortDesc(false); }
    setPage(1);
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  return (
    <div className="space-y-6">
      <ReportsFilters filters={filters} updateFilter={updateFilter} />

      {/* ==== Export & Summary ==== */}
      {data && <ReportExportButtons report={data} />}
      <ReportsSummary totals={data?.totals} />

      {/* ==== Visual Chart (Amount per Category) ==== */}
      <ReportsChart data={chartData} />

      {/* ==== Table with sorting & pagination ==== */}
      <ReportsTable rows={pagedRows} sortKey={sortKey} sortDesc={sortDesc} onHeaderClick={handleHeaderClick} />

      {/* ==== Pagination controls ==== */}
      <ReportsPagination page={page} pageCount={pageCount} setPage={setPage} />
    </div>
  );
};
