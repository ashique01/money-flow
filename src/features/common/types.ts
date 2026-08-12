// src/features/common/types.ts
/** Shared enums used by multiple modules */
export enum NotificationType {
  BUDGET_EXCEEDED = 'BUDGET_EXCEEDED',
  GOAL_REACHED = 'GOAL_REACHED',
  RECURRING_DUE = 'RECURRING_DUE',
  LOW_BALANCE = 'LOW_BALANCE',
  LARGE_EXPENSE = 'LARGE_EXPENSE',
  MONTHLY_SUMMARY = 'MONTHLY_SUMMARY',
  WEEKLY_SUMMARY = 'WEEKLY_SUMMARY',
}

export enum NotificationPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
