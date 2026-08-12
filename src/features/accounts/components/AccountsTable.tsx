import { Account } from '../types';
import AccountRow from './account-row';

interface Props {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (account: Account) => void;
}

export const AccountsTable = ({ accounts, onEdit, onDelete }: Props) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-glass-border bg-muted/40">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-right">Balance</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {accounts.map((account) => (
              <AccountRow
                key={account.id}
                account={account}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};