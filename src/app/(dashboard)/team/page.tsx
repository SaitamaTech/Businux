import { Users, Briefcase, Sparkles, ShieldCheck, ArrowRight, Clock3, UserCheck } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const teamMembers = [
  { name: "Mina Okafor", role: "Product Lead", status: "Online" },
  { name: "Sam Ade", role: "Sales Manager", status: "Online" },
  { name: "Tolu Bello", role: "UX Designer", status: "Away" },
  { name: "Ada Nwosu", role: "Finance Analyst", status: "Offline" },
];

export default function TeamPage() {
  return (
    <DashboardShell title="Team" subtitle="Manage your people, capacity, and performance.">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="brand-gradient p-6 text-white">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">People operations</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">Build a stronger, more productive team.</h1>
                <p className="max-w-2xl text-sm text-white/80">
                  Track availability, team roles, and performance so your business stays aligned and efficient.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href="/team">Invite member</a>
                </Button>
                <Button variant="secondary" asChild>
                  <a href="/dashboard">View org chart</a>
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total members", value: "24", icon: Users },
              { label: "Active this week", value: "18", icon: Briefcase },
              { label: "Open roles", value: "4", icon: Sparkles },
              { label: "Satisfaction", value: "92%", icon: ShieldCheck },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Team performance</CardTitle>
                  <CardDescription>See active work, meetings, and emerging opportunities.</CardDescription>
                </div>
                <Badge variant="default">Healthy</Badge>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid gap-4 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Project delivery rate</p>
                      <p className="mt-1 text-lg font-semibold">88%</p>
                    </div>
                    <span className="text-sm font-medium text-success">On track</span>
                  </div>
                  <Progress value={88} />
                </div>
                <div className="grid gap-4 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly capacity</p>
                      <p className="mt-1 text-lg font-semibold">68%</p>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Available bandwidth</span>
                  </div>
                  <Progress value={68} className="bg-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-medium">Hiring pipeline</p>
                  <p className="mt-2 text-sm text-muted-foreground">Review candidates and streamline interviews for two open engineering roles.</p>
                </div>
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-medium">Onboarding sprint</p>
                  <p className="mt-2 text-sm text-muted-foreground">Prepare the new marketing team for launch week.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team members</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center justify-between gap-3 rounded-3xl border border-border bg-background p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant={member.status === "Online" ? "success" : member.status === "Away" ? "warning" : "secondary"}>
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team pulse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="rounded-3xl border border-border bg-background p-4">
                  <p className="text-sm font-medium">Collaboration score</p>
                  <p className="mt-2 text-lg font-semibold">92%</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View team health
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
