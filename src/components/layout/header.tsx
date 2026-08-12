"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, LogOut, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/store/auth-store";
import { NotificationBell } from "@/features/notification/components/NotificationBell";

interface HeaderProps {
  onMenuClick?: () => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/accounts": "Accounts",
  "/analytics": "Analytics",
  "/budgets": "Budgets",
  "/recurring": "Recurring",
  "/goals": "Goals",
  "/reports": "Reports",
  "/savings": "Savings",
  "/settings": "Settings",
};

function getPageTitle(pathname: string): string {
  // Exact match first
  if (pageTitles[pathname]) return pageTitles[pathname];

  // Try matching a segment
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const mainSegment = `/${segments[0]}`;
    if (pageTitles[mainSegment]) return pageTitles[mainSegment];
  }

  // Fallback: capitalize the last segment
  const last = segments[segments.length - 1] || "Dashboard";
  return last.charAt(0).toUpperCase() + last.slice(1);
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const router = useRouter();
  const email = useAuthStore((s) => s.email);
  const clearAll = useAuthStore((s) => s.clearAll);
  const rawUserId = useAuthStore((s) => s.user_id);
  const userId = rawUserId ?? '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pageTitle = getPageTitle(pathname ?? "/dashboard");
  const today = new Date().toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <header
      className={cn(
        "glass-surface sticky top-0 z-20",
        "flex h-[--header-height] items-center justify-between gap-3",
        "border-b px-4 sm:px-6",
      )}
    >
      {/* Left: menu button (mobile) + title */}
      <div className="flex items-center gap-3 min-w-0">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </Button>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold sm:text-lg">
            {pageTitle}
          </h2>
          <p className="hidden text-xs text-muted-foreground sm:block">
            {today}
          </p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="relative"
        >
          {mounted && (
            <>
              <Sun
                size={18}
                className={cn(
                  "absolute transition-all duration-300",
                  theme === "dark"
                    ? "rotate-0 scale-100 opacity-100"
                    : "rotate-90 scale-0 opacity-0",
                )}
              />
              <Moon
                size={18}
                className={cn(
                  "absolute transition-all duration-300",
                  theme === "light"
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0",
                )}
              />
            </>
          )}
        </Button>

        {/* Notification bell */}
        {userId ? <NotificationBell userId={userId} /> : null}
        
        {/* Avatar placeholder */}
        {email ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearAll();
              router.push("/login");
            }}
            aria-label="Logout"
            className="flex items-center gap-1"
          >
            <LogOut size={18} />
            Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
            aria-label="Login"
            className="flex items-center gap-1"
          >
            <LogIn size={18} />
            Login
          </Button>
        )}
      </div>
    </header>
  );
}