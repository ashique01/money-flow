"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartPie,
  PiggyBank,
  Settings,
  Tags,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartPie,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function MobileNavigation() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      className={cn(
        "glass-surface fixed bottom-0 left-0 right-0 z-40 border-t md:hidden",
        "safe-bottom",
        "flex items-center justify-around",
        "h-[--bottom-nav-height]",
      )}
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/dashboard" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5",
              "relative min-w-0 flex-1 py-1",
              "transition-colors duration-200",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute -top-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
            )}

            <Icon
              size={20}
              strokeWidth={isActive ? 2.5 : 2}
              className="transition-all duration-200"
            />
            <span className="text-[10px] font-medium leading-none">
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}