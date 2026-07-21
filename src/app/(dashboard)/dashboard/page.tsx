"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DollarSign, TrendingUp, Receipt, FolderOpen, Users, Plus, FileText, UserPlus, FileBarChart, Sparkles, ArrowRight, CircleDashed } from "lucide-react";
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
import { getPersistedCustomers, getPersistedProjects, hasDismissedTutorial, setDismissedTutorial } from "@/services/mock-store";
import { useAuthStore } from "@/store/auth-store";

// `href: null` means the destination screen isn't part of this build yet —
// rendered as a disabled button rather than a dead `href="#"` link (which
// would silently do nothing on click and is a common, confusing anti-pattern).
const quickActions: { label: string; icon: typeof Plus; href: string | null }[] = [
  { label: "Create Project", icon: Plus, href: "/projects/new" },
  { label: "Add Task", icon: FileText, href: "/tasks" },
  { label: "Create Invoice", icon: Receipt, href: null },
  { label: "Add Client", icon: UserPlus, href: "/crm/customers" },
  { label: "Generate Report", icon: FileBarChart, href: "/reports" },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const [tutorialSkipped, setTutorialSkipped] = useState<boolean>(hasDismissedTutorial());
  const customers = useMemo(() => getPersistedCustomers(), []);
  const projects = useMemo(() => getPersistedProjects(), []);
  const hasData = customers.length > 0 || projects.length > 0;

  const skipTutorial = () => {
    setDismissedTutorial(true);
    setTutorialSkipped(true);
  };

  if (!hasData && !tutorialSkipped) {
    return (
      <DashboardShell>
        <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl items-center justify-center px-4 py-10 sm:px-6">
          <Card className="w-full border-dashed border-border bg-background/80">
            <CardHeader className="space-y-3 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-7 w-7" />
              </div>
              <CardTitle>Welcome to your workspace</CardTitle>
              <p className="mx-auto max-w-xl text-sm text-muted-foreground">
                This dashboard is fresh for you. Follow the tutorial to learn how to add customers, create projects, and turn your insights into action.
              </p>
            </CardHeader>
            <CardContent className="grid gap-6 p-8 md:grid-cols-3">
              {[
                {
                  title: "Add your first customer",
                  description: "Create a client record so your CRM starts tracking real relationships.",
                  icon: Users,
                  href: "/crm/customers",
                },
                {
                  title: "Create your first project",
                  description: "Launch a project and keep your team aligned from day one.",
                  icon: FolderOpen,
                  href: "/projects/new",
                },
                {
                  title: "Use the AI assistant",
                  description: "Generate summaries, ideas, and recommendations for your business.",
                  icon: Sparkles,
                  href: "/ai-assistant",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <Button variant="secondary" size="sm" className="mt-4" asChild>
                    <Link href={item.href}>
                      <span className="flex items-center gap-2">
                        Start now <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardContent className="flex flex-col gap-4 border-t border-border px-8 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div>
                This tutorial can be skipped if you want to jump straight into the app.
              </div>
              <Button variant="outline" size="sm" onClick={skipTutorial}>
                <CircleDashed className="h-4 w-4" /> Skip tutorial
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    );
  }

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
