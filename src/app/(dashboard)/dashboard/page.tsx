"use client";
import Link from "next/link";
import { DollarSign, TrendingUp, Receipt, FolderOpen, Users, Plus, FileText, UserPlus, FileBarChart } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { BusinessHealthCard } from "@/features/dashboard/components/business-health-card";
import { RevenueByCategoryCard } from "@/features/dashboard/components/revenue-by-category-card";
import { RecentProjectsCard } from "@/features/dashboard/components/recent-projects-card";
import { TopClientsCard } from "@/features/dashboard/components/top-clients-card";
import { TasksOverviewCard } from "@/features/dashboard/components/tasks-overview-card";
import { AIAssistantMiniPanel } from "@/features/dashboard/components/ai-assistant-mini-panel";
import { revenueSeries, revenueBySource, sparkline } from "@/services/mock-data";
import { useAuthStore } from "@/store/auth-store";

// `href: null` means the destination screen isn't part of this build yet —
// rendered as a disabled button rather than a dead `href="#"` link (which
// would silently do nothing on click and is a common, confusing anti-pattern).
const quickActions: { label: string; icon: typeof Plus; href: string | null }[] = [
  { label: "Create Project", icon: Plus, href: null },
  { label: "Add Task", icon: FileText, href: "/tasks" },
  { label: "Create Invoice", icon: Receipt, href: null },
  { label: "Add Client", icon: UserPlus, href: "/crm/customers" },
  { label: "Generate Report", icon: FileBarChart, href: "/reports" },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Good morning, {firstName}! 👋</h1>
              <p className="text-sm text-muted-foreground">Here&apos;s what&apos;s happening with your business today.</p>
            </div>
            <Button>
              <Plus className="h-4 w-4" /> New
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <MetricCard
              label="Total Revenue"
              value="₦24.5M"
              change={24.3}
              icon={DollarSign}
              iconClassName="bg-success/10 text-success"
              sparklineData={sparkline(24)}
              sparklineColor="#10B981"
            />
            <MetricCard
              label="Net Profit"
              value="₦7.9M"
              change={32.1}
              icon={TrendingUp}
              iconClassName="bg-primary/10 text-primary"
              sparklineData={sparkline(8)}
              sparklineColor="#4F46E5"
              delay={0.05}
            />
            <MetricCard
              label="Total Expenses"
              value="₦8.2M"
              change={-8.7}
              icon={Receipt}
              iconClassName="bg-destructive/10 text-destructive"
              sparklineData={sparkline(8, 0.2)}
              sparklineColor="#EF4444"
              delay={0.1}
            />
            <MetricCard
              label="Active Projects"
              value="18"
              change={2}
              changeLabel="new this month"
              icon={FolderOpen}
              iconClassName="bg-info/10 text-info"
              sparklineData={sparkline(18, 0.1)}
              sparklineColor="#0EA5E9"
              delay={0.15}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <RevenueChart data={revenueSeries} />
              </CardContent>
            </Card>
            <BusinessHealthCard score={87} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueByCategoryCard data={revenueBySource} total={24_500_000} />
            <TasksOverviewCard />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentProjectsCard />
            <TopClientsCard />
          </div>
        </div>

        <div className="space-y-6">
          <AIAssistantMiniPanel />

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 pt-0">
              {quickActions.map((a) =>
                a.href ? (
                  <Button key={a.label} variant="outline" size="sm" className="h-auto flex-col gap-1.5 py-3 text-xs" asChild>
                    <Link href={a.href}>
                      <a.icon className="h-4 w-4" aria-hidden="true" />
                      {a.label}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    key={a.label}
                    variant="outline"
                    size="sm"
                    disabled
                    title="Coming soon"
                    className="h-auto flex-col gap-1.5 py-3 text-xs"
                  >
                    <a.icon className="h-4 w-4" aria-hidden="true" />
                    {a.label}
                  </Button>
                )
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> Team Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">
              5 of 6 team members online right now.
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
