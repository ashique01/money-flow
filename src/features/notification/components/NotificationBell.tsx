'use client';

import { Notification } from '../types';
import { BellIcon } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationLoading } from './NotificationLoading';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { NotificationList } from './NotificationList';

export const NotificationBell = ({ userId }: { userId: string }) => {
  // If there is no userId, don't render anything – avoids calling the hook with an empty string.
  if (!userId) return null;

  const { data = [], markRead, isLoading } = useNotifications(userId);
  // Ensure we have an array – the API might return an object or null in edge cases.
  const notificationsArray: Notification[] = Array.isArray(data) ? data : [];
  const unread = notificationsArray.filter((n) => !n.readAt).length;

  if (isLoading) return <NotificationLoading />;

  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative cursor-pointer">
          <BellIcon />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 rounded-full bg-red-600 px-1 text-xs text-white">
              {unread}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <NotificationList notifications={notificationsArray} onRead={markRead} />
      </PopoverContent>
    </Popover>
  );
};
