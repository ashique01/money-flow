import { DataTable } from '@/components/ui/data-table';

interface Props {
  rows: any[]; // already paginated rows
  sortKey: string;
  sortDesc: boolean;
  onHeaderClick: (key: string) => void;
}

export const ReportsTable = ({ rows, sortKey, sortDesc, onHeaderClick }: Props) => {
  return (
    <DataTable
      data={rows}
      columns={[
        {
          header: 'Date',
          accessor: 'date',
          onHeaderClick: () => onHeaderClick('date'),
          sortIcon: sortKey === 'date' ? (sortDesc ? '▼' : '▲') : undefined,
        },
        {
          header: 'Description',
          accessor: 'description',
          onHeaderClick: () => onHeaderClick('description'),
          sortIcon: sortKey === 'description' ? (sortDesc ? '▼' : '▲') : undefined,
        },
        {
          header: 'Amount',
          accessor: 'amount',
          render: (v: number) => `$${v.toFixed(2)}`,
          onHeaderClick: () => onHeaderClick('amount'),
          sortIcon: sortKey === 'amount' ? (sortDesc ? '▼' : '▲') : undefined,
        },
        { header: 'Account', accessor: 'accountName' },
        { header: 'Category', accessor: 'categoryName' },
      ]}
    />
  );
};
