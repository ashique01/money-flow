import { Category } from '@/features/categories/types';
import { useCategories } from '@/features/categories/hooks/use-categories';
import { useAuthStore } from '@/store/auth-store';
import { useMemo } from 'react';

/**
 * Hook that returns a memoized function to look up a category name by id.
 * Returns the id itself if the category is not found.
 */
export const useCategoryName = () => {
  const email = useAuthStore((s) => s.email);
  const { data: categories } = useCategories(email ?? '');

  return useMemo(() => {
    return (id: string) =>
      categories?.find((c: Category) => c.category_id === id)?.name ?? id;
  }, [categories]);
};
