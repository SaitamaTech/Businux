"use client";
import { DollarSign, Receipt, TrendingUp, Percent, Wallet, Sparkles, Download } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { MetricCard } from "@/components/shared/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { RevenueByCategoryCard } from "@/features/dashboard/components/revenue-by-category-card";
import { revenueSeries, revenueBySource, sparkline } from "@/services/mock-data";

const insights = [
  "Revenue increased by 24.3% primarily driven by Software Services and Consulting.",
  "Marketing expenses are 15% higher than last month. Consider optimizing ad spend.",
  "Top performing employee: Sarah Johnson with 142% of target achieved.",
  "Customer retention improved by 8.3%. Great job!",
];

const employeePerformance = [
  { name: "Sarah Johnson", target: "₦5.0M", achieved: "₦7.1M", pct: 142 },
  { name: "Michael Brown", target: "₦4.0M", achieved: "₦4.6M", pct: 115 },
  { name: "Emily Davis", target: "₦3.5M", achieved: "₦3.0M", pct: 86 },
  { name: "James Wilson", target: "₦3.0M", achieved: "₦2.2M", pct: 73 },
];

export default function ReportsPage() {
  return (
    <DashboardShell title="Reports & Analytics" subtitle="Comprehensive insights to help you make data-driven decisions.">
      <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
        <Button size="sm">New Report</Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-5 flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
            <div className="min-w-0 space-y-6">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <MetricCard label="Total Revenue" value="₦24.5M" change={24.3} icon={DollarSign} iconClassName="bg-success/10 text-success" sparklineData={sparkline(24)} sparklineColor="#10B981" />
                <MetricCard label="Total Expenses" value="₦8.2M" change={-8.7} icon={Receipt} iconClassName="bg-destructive/10 text-destructive" sparklineData={sparkline(8, 0.2)} sparklineColor="#EF4444" delay={0.05} />
                <MetricCard label="Net Profit" value="₦16.3M" change={32.1} icon={TrendingUp} iconClassName="bg-primary/10 text-primary" sparklineData={sparkline(16)} sparklineColor="#4F46E5" delay={0.1} />
                <MetricCard label="Gross Profit Margin" value="66.5%" change={4.2} icon={Percent} iconClassName="bg-info/10 text-info" delay={0.15} />
                <MetricCard label="Operating Cash Flow" value="₦6.7M" change={18.6} icon={Wallet} iconClassName="bg-accent/10 text-accent" delay={0.2} />
              </div>

              <Card>
                <CardHeader><CardTitle>Revenue Trend Analysis</CardTitle></CardHeader>
                <CardContent className="pt-0">
                  <RevenueChart data={revenueSeries} />
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RevenueByCategoryCard data={revenueBySource} total={24_500_000} title="Revenue by Source" />
                <Card>
                  <CardHeader><CardTitle>Employee Performance</CardTitle></CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {employeePerformance.map((e) => (
                      <div key={e.name} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{e.name}</span>
                        <div className="text-right">
                          <span className="text-muted-foreground">{e.achieved} / {e.target}</span>{" "}
                          <span className={e.pct >= 100 ? "font-semibold text-success" : "font-semibold text-warning"}>{e.pct}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-accent/20 bg-gradient-to-b from-accent/5 to-transparent">
                <CardHeader className="flex-row items-center gap-2 space-y-0">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <CardTitle>AI Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5 pt-0">
                  {insights.map((insight, i) => (
                    <div key={i} className="rounded-lg border border-border bg-background/60 p-3 text-xs">
                      {insight}
                    </div>
                  ))}
                  <Button variant="ai" size="sm" className="w-full">Ask AI Assistant</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Report Shortcuts</CardTitle></CardHeader>
                <CardContent className="space-y-1 pt-0">
                  {["Profit & Loss Statement", "Balance Sheet", "Cash Flow Statement", "Sales Performance Report"].map((r) => (
                    <button key={r} className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm hover:bg-secondary">
                      {r} <Download className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {["financial", "revenue", "expenses", "employees", "customers"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardContent className="p-10 text-center text-sm text-muted-foreground">
                Detailed {tab} report view — connect to backend reporting service to populate this tab.
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardShell>
  );
}
