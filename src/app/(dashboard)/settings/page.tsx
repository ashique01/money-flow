// src/app/(dashboard)/settings/page.tsx
"use client";

import { SettingsPage } from "@/features/settings/components/SettingsPage";
import { useAuthStore } from "@/store/auth-store";

export default function Settings() {
  const userId = useAuthStore((s) => s.user_id);

  if (!userId) {
    return <p className="text-center text-red-600">User not logged in.</p>;
  }

  return <SettingsPage userId={userId} />;
}
