"use client";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";

export function DashboardShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-background">
      <DashboardSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <DashboardTopbar title={title} subtitle={subtitle} />
        <main className="relative z-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
