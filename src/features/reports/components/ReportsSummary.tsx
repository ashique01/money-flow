import { ReportResult } from '../types';

interface Props {
  totals?: ReportResult['totals'];
}

export const ReportsSummary = ({ totals }: Props) => {
  if (!totals) return null;
  return (
    <div className="flex gap-6 text-sm">
      <div>Income: ${totals.income.toFixed(2)}</div>
      <div>Expense: ${totals.expense.toFixed(2)}</div>
      <div>Net: ${totals.net.toFixed(2)}</div>
    </div>
  );
};
