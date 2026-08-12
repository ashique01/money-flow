// src/features/notification/hooks/useNotifications.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, markNotificationRead } from '../services/notifications.service';
import { Notification } from '../types';

export const useNotifications = (userId: string) => {
  const qc = useQueryClient();

  // TanStack Query v5 uses the object syntax for query calls
  const query = useQuery<Notification[], Error>({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotifications(userId),
  });

  const readMutation = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notifications', userId] }),
  });

  // expose the data and a convenient markRead function
  return { ...query, markRead: readMutation.mutate };
};
