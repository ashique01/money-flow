"use client";

import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <Header onMenuClick={toggleSidebar} />

      <main className="flex-1 overflow-y-auto p-4 pb-[calc(var(--bottom-nav-height)+1rem)] sm:p-6 lg:p-8 md:pb-6">
        {children}
      </main>

      <MobileNavigation />
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="h-screen overflow-hidden">
      {/* Fixed glass sidebar — w-72 on desktop, sheet overlay on mobile */}
      <AppSidebar />

      {/* Main content — fills remaining width, starts after sidebar on desktop */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden md:ml-72">
        <DashboardContent>{children}</DashboardContent>
      </div>
    </SidebarProvider>
  );
}