/* Enhanced Settings Page – full user preferences */
"use client";

import { useSettings } from "../hooks/useSettings";
import { useAccounts } from "@/features/accounts/hooks/use-accounts";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { SettingsLoading } from "./SettingsLoading";
import { useAuthStore } from "@/store/auth-store";
import { useTheme } from "next-themes";
import { useSettingsStore } from "@/store/settings-store";
import React from "react";

export const SettingsPage = ({ userId }: { userId: string }) => {
  // Load user settings
  const { data: settings, isLoading, error, updateSettings } = useSettings(userId);
  const email = useAuthStore((s) => s.email);
  const setSettings = useSettingsStore((s) => s.setSettings);
  const { setTheme } = useTheme();

  // Sync UI theme with saved setting
  React.useEffect(() => {
    if (settings?.theme) {
      setTheme(settings.theme);
    }
  }, [settings?.theme, setTheme]);

  // Load reference data for defaults
  const { data: accounts } = useAccounts(email);
  const { data: categories } = useCategories(email ?? "");

  const { register, handleSubmit, reset, watch } = useForm({
    // We'll reset once settings are loaded
    defaultValues: settings,
  });

  // When settings are fetched, populate the form
  React.useEffect(() => {
    if (settings) {
      reset(settings);
      setSettings(settings);
    }
  }, [settings, reset, setSettings]);

  // Sync theme when the form value changes
  const themeValue = watch('theme');
  React.useEffect(() => {
    if (themeValue) {
      setTheme(themeValue as any);
    }
  }, [themeValue]);

  if (isLoading) return <SettingsLoading />;
  if (error) return <p className="text-red-600">{error.message}</p>;

  const onSubmit = (values: any) => {
    // Optimistically update the global settings store
    setSettings(values);
    updateSettings(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-6">
      {/* Currency */}
      <label className="block">
        <span className="text-sm font-medium text-muted-foreground">Currency</span>
        <select {...register("currency")}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="AUD">AUD</option>
          {/* add more as needed */}
        </select>
      </label>

      {/* Locale */}
      <label className="block">
        <span className="text-sm font-medium text-muted-foreground">Locale</span>
        <Input {...register("locale")} placeholder="e.g. en-US" />
      </label>

      {/* Timezone */}
      <label className="block">
        <span className="text-sm font-medium text-muted-foreground">Timezone</span>
        <Input {...register("timezone")} placeholder="e.g. America/New_York" />
      </label>

      {/* Theme */}
      <label className="block">
        <span className="text-sm font-medium text-muted-foreground">Theme</span>
        <select {...register("theme")}>
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      {/* Default Account */}
      {accounts && (
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">Default Account</span>
          <select {...register("defaultAccountId")}>
            <option value="">— none —</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Default Category */}
      {categories && (
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">Default Category</span>
          <select {...register("defaultCategoryId")}>
            <option value="">— none —</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Notification Preferences */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-muted-foreground">Notifications</legend>
        <label className="flex items-center space-x-2">
          <Checkbox {...register("notificationPrefs.email")} />
          <span>Email</span>
        </label>
        <label className="flex items-center space-x-2">
          <Checkbox {...register("notificationPrefs.push")} />
          <span>Push</span>
        </label>
      </fieldset>

      <Button type="submit" className="w-full">
        Save Settings
      </Button>
    </form>
  );
};