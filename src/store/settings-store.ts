import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '@/features/settings/types';

interface SettingsState {
  settings: UserSettings | null;
  setSettings: (s: UserSettings) => void;
  clear: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: null,
      setSettings: (s) => set({ settings: s }),
      clear: () => set({ settings: null }),
    }),
    {
      name: 'moneyflow-settings',
    },
  ),
);
