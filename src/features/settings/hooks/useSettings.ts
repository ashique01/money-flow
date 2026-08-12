// src/features/settings/hooks/useSettings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSettings } from '../services/settings.service';
import { UserSettings } from '../types';

export const useSettings = (userId: string) => {
  const qc = useQueryClient();

  const query = useQuery<UserSettings, Error>({
    queryKey: ['settings', userId],
    queryFn: () => getSettings(userId),
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings', userId] }),
  });

  return { ...query, updateSettings: mutation.mutate };
};
