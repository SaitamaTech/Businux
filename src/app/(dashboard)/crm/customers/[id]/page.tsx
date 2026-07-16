"use client";
import { notFound } from "next/navigation";
import { use } from "react";
import { Mail, FileText, Plus } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCustomers, mockDeals, mockActivity } from "@/services/mock-data";
import { CustomerProfileHeader } from "@/features/crm/components/customer-profile-header";
import { DealPipelineCard } from "@/features/crm/components/deal-pipeline-card";
import { CustomerTimelineCard } from "@/features/crm/components/customer-timeline-card";
import { formatNaira, formatDate } from "@/lib/format";

export default function CustomerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) notFound();

  const deals = mockDeals.filter((d) => d.customerId === customer.id);
  const dealTotal = deals.reduce((s, d) => s + d.value, 0);

  return (
    <DashboardShell title={customer.name} subtitle="CRM › Customers">
      <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm">Edit Profile</Button>
        <Button variant="outline" size="sm"><FileText className="h-3.5 w-3.5" /> Add Note</Button>
        <Button size="sm"><Mail className="h-3.5 w-3.5" /> Send Email</Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr_300px]">
        <div className="order-1 lg:order-1">
          <CustomerProfileHeader customer={customer} />
        </div>

        <div className="order-3 min-w-0 space-y-6 lg:order-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard label="Total Deals" value={String(customer.totalDeals)} />
            <StatCard label="Total Value" value={formatNaira(customer.totalValue, { compact: true })} />
            <StatCard label="Won Deals" value={String(customer.wonDeals)} />
            <StatCard label="Last Contact" value={formatDate(customer.lastContact)} />
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <CustomerTimelineCard activity={mockActivity} />
            </TabsContent>
            <TabsContent value="deals">
              <DealPipelineCard deals={deals} totalValue={dealTotal} />
            </TabsContent>
            <TabsContent value="notes">
              <NotesCard />
            </TabsContent>
            <TabsContent value="files">
              <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No files uploaded yet.</CardContent></Card>
            </TabsContent>
            <TabsContent value="tasks">
              <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No tasks linked to this customer yet.</CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="order-2 space-y-6 lg:order-3">
          <DealPipelineCard deals={deals} totalValue={dealTotal} />
          <NotesCard compact />
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function NotesCard({ compact = false }: { compact?: boolean }) {
  const notes = [
    { author: "John CEO", date: "2025-05-20", text: "Client prefers monthly billing", pinned: true },
    { author: "Sarah Johnson", date: "2025-05-15", text: "Follow up on additional user licenses" },
    { author: "John CEO", date: "2025-05-10", text: "Interested in our analytics dashboard" },
  ];
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Notes</CardTitle>
        {!compact && <button className="text-xs font-medium text-primary hover:underline">View all</button>}
      </CardHeader>
      <CardContent className="space-y-2.5 pt-0">
        {notes.map((n, i) => (
          <div key={i} className="rounded-lg border border-border bg-secondary/30 p-3 text-sm">
            <p>{n.text}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {n.author} · {formatDate(n.date)}
            </p>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
          <Plus className="h-3.5 w-3.5" /> Add Note
        </Button>
      </CardContent>
    </Card>
  );
}
