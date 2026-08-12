// src/features/notification/components/NotificationList.tsx
'use client';
import { Notification } from '../types';
import { Button } from '@/components/ui/button';

export const NotificationList = ({
  notifications,
  onRead,
}: {
  notifications: Notification[];
  onRead: (id: string) => void;
}) => (
  <div className="space-y-2 max-h-96 overflow-y-auto">
    {notifications.map((n) => (
      <div
        key={n.id}
        className={`p-2 rounded ${n.readAt ? '' : 'bg-muted'}`}
      >
        <h4 className="font-medium">{n.title}</h4>
        <p className="text-sm">{n.body}</p>
        <div className="flex justify-end text-xs text-muted-foreground">
          {new Date(n.createdAt).toLocaleString()}
        </div>
        {!n.readAt && (
          <Button variant="link" size="sm" onClick={() => onRead(n.id)}>
            Mark as read
          </Button>
        )}
      </div>
    ))}
    {notifications.length === 0 && (
      <p className="text-center text-muted-foreground">No notifications</p>
    )}
  </div>
);
