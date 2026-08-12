"use client";

import * as React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

/**
 * Real ThemeProvider using next-themes.
 * This wraps the app with NextThemeProvider so `useTheme` works correctly
 * and the theme toggle button in the header can change the UI.
 */
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
}
