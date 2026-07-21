"use client";

import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, ClipboardList, DollarSign, ShieldCheck, Wallet, Clock3, Sparkles, CircleDashed } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getPersistedCustomers, getPersistedProjects, hasDismissedTutorial, setDismissedTutorial } from "@/services/mock-store";

const financeHighlights = [
  { label: "Cash balance", value: "₦14.8M", icon: Wallet, variant: "success", change: "+12%" },
  { label: "Open invoices", value: "12", icon: ClipboardList, variant: "warning", change: "-8%" },
  { label: "Monthly revenue", value: "₦6.2M", icon: DollarSign, variant: "primary", change: "+18%" },
  { label: "Revenue runway", value: "5 months", icon: ShieldCheck, variant: "secondary", change: "+2" },
];

const invoicePipeline = [
  { name: "Pending approvals", value: 9, color: "bg-warning/10 text-warning", badge: "Action needed" },
  { name: "Overdue", value: 3, color: "bg-destructive/10 text-destructive", badge: "High priority" },
  { name: "Paid this week", value: 18, color: "bg-success/10 text-success", badge: "Good momentum" },
];

const upcomingPayments = [
  { client: "Innovate Ltd.", amount: "₦820K", due: "Jun 2" },
  { client: "Greenfield Industries", amount: "₦450K", due: "Jun 4" },
  { client: "TechFlow Solutions Ltd.", amount: "₦1.2M", due: "Jun 7" },
];

export default function FinancePage() {
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
      <DashboardShell title="Finance" subtitle="Track cash flow, invoices, and financial performance.">
        <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-4xl items-center justify-center px-4 py-10 sm:px-6">
          <Card className="w-full border-dashed border-border bg-background/80">
            <CardHeader className="space-y-3 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-7 w-7" />
              </div>
              <CardTitle>Welcome to your finance workspace</CardTitle>
              <p className="mx-auto max-w-xl text-sm text-muted-foreground">
                This finance page is empty so you can start with clean financial metrics. Add your first customer or project to unlock revenue and invoice insights.
              </p>
            </CardHeader>
            <CardContent className="grid gap-6 p-8 md:grid-cols-3">
              {[
                {
                  title: "Add a customer",
                  description: "Track invoices and revenue for your first client.",
                  href: "/crm/customers",
                },
                {
                  title: "Start a project",
                  description: "Create a project so your financial plan reflects real work.",
                  href: "/projects/new",
                },
                {
                  title: "Visit the dashboard",
                  description: "See your business overview and learn where finance fits in.",
                  href: "/dashboard",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                  <h2 className="text-base font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  <Button variant="secondary" size="sm" className="mt-4" asChild>
                    <a href={item.href}>{item.title}</a>
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
    <DashboardShell title="Finance" subtitle="Track cash flow, invoices, and financial performance.">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/80 via-primary to-primary/60 p-6 text-white">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Financial snapshot</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Stay on top of cash and growth.</h1>
                <p className="max-w-2xl text-sm text-white/80">
                  The Finance hub gives you a simple, actionable view of working capital, invoices, and runway so your business stays healthy.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="/finance">Review financial plan</a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/reports">View reports</a>
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
            {financeHighlights.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <Badge variant="outline" className={item.variant === "success" ? "text-success" : item.variant === "warning" ? "text-warning" : item.variant === "destructive" ? "text-destructive" : item.variant === "secondary" ? "text-secondary" : "text-primary"}>
                    {item.change}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Invoice pipeline</CardTitle>
                  <CardDescription>Track invoices that need attention before month end.</CardDescription>
                </div>
                <Badge variant="secondary">Updated just now</Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {invoicePipeline.map((item) => (
                  <div key={item.name} className="rounded-3xl border border-border bg-background p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.badge}</p>
                      </div>
                      <span className="text-lg font-semibold">{item.value}</span>
                    </div>
                    <Progress value={Math.min(100, Number(item.value) * 5)} className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash flow priorities</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Revenue planning</p>
                  <p className="mt-2 text-lg font-semibold">Keep your growth runway steady with recurring invoice automation.</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Expense control</p>
                  <p className="mt-2 text-lg font-semibold">Review collections and avoid late payments with real-time alerts.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {upcomingPayments.map((payment) => (
                  <div key={payment.client} className="rounded-3xl border border-border bg-background p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold">{payment.client}</p>
                        <p className="text-sm text-muted-foreground">Due {payment.due}</p>
                      </div>
                      <p className="text-lg font-semibold">{payment.amount}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  View all payments
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Control center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Best practice</p>
                  <p className="text-sm text-foreground">Set up automated invoice reminders so overdue items stay below 5%.</p>
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  Connect accounting
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
