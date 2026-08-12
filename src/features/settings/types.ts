// src/features/settings/types.ts
export interface UserSettings {
  userId: string;
  currency: string; // e.g. "USD"
  locale: string;   // e.g. "en-US"
  timezone: string; // e.g. "America/New_York"
  theme: 'light' | 'dark' | 'system';
  defaultAccountId?: string;
  defaultCategoryId?: string;
  notificationPrefs: {
    email: boolean;
    push: boolean;
  };
}
