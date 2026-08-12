import { ReportFilters, ReportPeriod } from '../types';
import { useAuthStore } from '@/store/auth-store';
import { useAccounts } from '@/features/accounts/hooks/use-accounts';
import { useCategories } from '@/features/categories/hooks/use-categories';

interface Props {
  filters: ReportFilters;
  updateFilter: (key: keyof ReportFilters, value: any) => void;
}

export const ReportsFilters = ({ filters, updateFilter }: Props) => {
  const email = useAuthStore((s) => s.email);
  const { data: accounts } = useAccounts(email ?? null);
  const { data: categories } = useCategories(email ?? '');

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Period */}
      <select
        className="h-10 rounded-lg border px-3"
        value={filters.period ?? 'MONTHLY'}
        onChange={(e) => updateFilter('period', e.target.value as ReportPeriod)}
      >
        <option value="MONTHLY">Monthly</option>
        <option value="YEARLY">Yearly</option>
      </select>

      {/* Date range */}
      <input
        type="date"
        className="h-10 rounded-lg border px-3"
        value={filters.startDate ?? ''}
        onChange={(e) => updateFilter('startDate', e.target.value || undefined)}
      />
      <input
        type="date"
        className="h-10 rounded-lg border px-3"
        value={filters.endDate ?? ''}
        onChange={(e) => updateFilter('endDate', e.target.value || undefined)}
      />

      {/* Accounts */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">Accounts:</span>
        {accounts?.map((acc) => (
          <label key={acc.id} className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={filters.accountIds?.includes(acc.id) ?? false}
              onChange={(e) => {
                const ids = (filters.accountIds?.split(',') ?? []).filter(Boolean);
                if (e.target.checked) ids.push(acc.id);
                else ids.splice(ids.indexOf(acc.id), 1);
                updateFilter('accountIds', ids.length ? ids.join(',') : undefined);
              }}
            />
            <span className="text-sm">{acc.name}</span>
          </label>
        ))}
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-2">
        <span className="text-sm">Categories:</span>
        {categories?.map((cat) => (
          <label key={cat.category_id} className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={filters.categoryIds?.includes(cat.category_id) ?? false}
              onChange={(e) => {
                const ids = (filters.categoryIds?.split(',') ?? []).filter(Boolean);
                if (e.target.checked) ids.push(cat.category_id);
                else ids.splice(ids.indexOf(cat.category_id), 1);
                updateFilter('categoryIds', ids.length ? ids.join(',') : undefined);
              }}
            />
            <span className="text-sm">{cat.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
