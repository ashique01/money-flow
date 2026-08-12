"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { dashboardNavigation } from "@/config/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuthStore } from "@/store/auth-store";

export default function AppSidebar() {
  const pathname = usePathname() ?? "";
  const { openMobile, setOpenMobile, isMobile } = useSidebar();

  // ---- Mobile: Sheet overlay ----
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="w-72 p-0 [&>button]:top-3 [&>button]:right-3 [&>button]:z-10"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarInner pathname={pathname} onNavClick={() => setOpenMobile(false)} />
        </SheetContent>
      </Sheet>
    );
  }

  // ---- Desktop: fixed glass sidebar ----
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30",
        "flex w-72 flex-col",
        "glass-strong border-r",
        "hidden md:flex",
      )}
    >
      <SidebarInner pathname={pathname} />
    </aside>
  );
}

/* ---- Shared sidebar content ---- */
function SidebarInner({
  pathname,
  onNavClick,
}: {
  pathname: string;
  onNavClick?: () => void;
}) {
  const name = useAuthStore((s) => s.name);
  return (
    <div className="flex h-full flex-col">
      {/* Brand / Logo */}
      <div className="flex h-[--header-height] shrink-0 items-center gap-3 border-b border-glass-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
          <span className="text-lg font-bold text-primary">M</span>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">MoneyFlow</h1>
          <p className="text-[10px] text-muted-foreground">Finance tracker</p>
        </div>
      </div>

      {/* Navigation links */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {dashboardNavigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5",
                  "text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 2}
                  className="shrink-0 transition-all duration-200"
                />
                <span className="truncate">{item.title}</span>

                {/* Active glow dot */}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/60" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer: user area */}
      <div className="shrink-0 border-t border-glass-border p-4">
        <div className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-200 hover:bg-sidebar-accent">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{name || "User"}</p>
            <p className="truncate text-xs text-muted-foreground">
              Personal account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}