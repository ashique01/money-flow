import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import AppProvider from "@/providers/app-provider";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoneyFlow",
  description: "Personal finance management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={figtree.variable}>
        <ThemeProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}