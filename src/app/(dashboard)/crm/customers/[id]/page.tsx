import { notFound } from "next/navigation";
import { Mail, FileText, Plus, Globe2, CalendarCheck, Award, Sparkles, UserCheck } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { customersApi } from "@/services/api/customers";
import { CustomerProfileHeader } from "@/features/crm/components/customer-profile-header";
import { DealPipelineCard } from "@/features/crm/components/deal-pipeline-card";
import { CustomerTimelineCard } from "@/features/crm/components/customer-timeline-card";
import { formatNaira, formatDate } from "@/lib/format";

export default async function CustomerProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const customer = await customersApi.getById(id);
  if (!customer) notFound();

  const deals = await customersApi.getDeals(customer.id);
  const dealTotal = deals.reduce((s, d) => s + d.value, 0);
  const activity = await customersApi.getActivity(customer.id);
  const healthScore = 84;

  return (
    <DashboardShell title={customer.name} subtitle="CRM › Customers">
      <div className="mb-5 flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" size="sm">Edit Profile</Button>
        <Button variant="outline" size="sm"><FileText className="h-3.5 w-3.5" /> Add Note</Button>
        <Button size="sm"><Mail className="h-3.5 w-3.5" /> Send Email</Button>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[300px_1.4fr_320px]">
          <div className="space-y-6">
            <CustomerProfileHeader customer={customer} />
            <Card>
              <CardHeader>
                <CardTitle>Relationship pulse</CardTitle>
                <Badge variant="success">Healthy</Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">Engagement score</p>
                    <p className="text-lg font-semibold">{healthScore}%</p>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground">Path to renewal</div>
                    <div className="mt-2 rounded-full bg-secondary/20 p-1">
                      <div className="h-2 rounded-full bg-success" style={{ width: `${healthScore}%` }} />
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">Next action</span>
                    <Badge variant="default">Follow-up</Badge>
                  </div>
                  <p className="text-sm font-semibold">Send proposal update and confirm delivery date.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatCard label="Total Deals" value={String(customer.totalDeals)} />
              <StatCard label="Total Value" value={formatNaira(customer.totalValue, { compact: true })} />
              <StatCard label="Won Deals" value={String(customer.wonDeals)} />
              <StatCard label="Last Contact" value={formatDate(customer.lastContact)} />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Customer highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="mt-1 text-base font-semibold">{customer.status}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Opportunity size</p>
                  <p className="mt-1 text-base font-semibold">{formatNaira(dealTotal, { compact: true })}</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Next milestone</p>
                  <p className="mt-1 text-base font-semibold">Proposal review</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Priority overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Top opportunity</p>
                  <p className="mt-1 font-semibold">Renewal package with upgraded support</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Best next step</p>
                  <p className="mt-1 font-semibold">Schedule a follow-up meeting</p>
                </div>
              </CardContent>
            </Card>
            <NotesCard compact />
          </div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Customer activity</CardTitle>
            <Badge variant="secondary">Recent</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <CustomerTimelineCard activity={activity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal pipeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <DealPipelineCard deals={deals} totalValue={dealTotal} />
          </CardContent>
        </Card>
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
