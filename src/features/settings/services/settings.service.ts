// src/features/settings/services/settings.service.ts
import { UserSettings } from '../types';

export async function getSettings(userId: string): Promise<UserSettings> {
  const resp = await fetch(`/api/settings?userId=${encodeURIComponent(userId)}`);
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Fetch settings failed: ${resp.status} ${txt}`);
  }
  return resp.json();
}

export async function updateSettings(settings: UserSettings): Promise<void> {
  const resp = await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Update settings failed: ${resp.status} ${txt}`);
  }
}
