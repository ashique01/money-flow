import { Account } from '@/features/accounts/types';
import { useAccounts } from '@/features/accounts/hooks/use-accounts';
import { useAuthStore } from '@/store/auth-store';
import { useMemo } from 'react';

/**
 * Hook that returns a memoized function to look up an account name by id.
 * Returns the id itself if the account is not found.
 */
export const useAccountName = () => {
  const email = useAuthStore((s) => s.email);
  const { data: accounts } = useAccounts(email ?? null);

  return useMemo(() => {
    return (id: string) => accounts?.find((a: Account) => a.id === id)?.name ?? id;
  }, [accounts]);
};
