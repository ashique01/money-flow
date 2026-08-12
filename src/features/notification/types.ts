// src/features/notification/types.ts
import { NotificationType, NotificationPriority } from '@/features/common/types';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  createdAt: string; // ISO
  readAt?: string; // ISO or undefined
}
