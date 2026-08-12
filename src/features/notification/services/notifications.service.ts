// src/features/notification/services/notifications.service.ts
import { Notification } from '../types';

export async function fetchNotifications(userId: string, unreadOnly = true): Promise<Notification[]> {
  const resp = await fetch(`/api/notifications?userId=${encodeURIComponent(userId)}&unreadOnly=${unreadOnly}`);
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Fetch notifications failed: ${resp.status} ${txt}`);
  }
  return resp.json();
}

export async function markNotificationRead(id: string): Promise<void> {
  const resp = await fetch('/api/notifications/read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notificationId: id }),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Mark read failed: ${resp.status} ${txt}`);
  }
}
