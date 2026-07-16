"use client";
import { Rocket, TrendingUp, Building2, Landmark, Camera, UserPlus } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PricingPlanCard } from "@/features/settings/components/pricing-plan-card";
import { useAuthStore } from "@/store/auth-store";
import { initials } from "@/lib/format";

const plans = [
  { name: "Starter", icon: Rocket, description: "Perfect for small teams just getting started.", price: 19, features: ["Up to 5 users", "All core features", "5GB storage", "Email support"] },
  { name: "Growth", icon: TrendingUp, description: "For growing teams that need more power.", price: 49, features: ["Up to 15 users", "All core features", "50GB storage", "Priority support", "Advanced analytics"], popular: true, current: true },
  { name: "Business", icon: Building2, description: "For established businesses that need advanced tools.", price: 99, features: ["Up to 50 users", "All core features", "200GB storage", "Priority support", "Advanced analytics", "Custom reports"] },
  { name: "Enterprise", icon: Landmark, description: "For large organizations with custom needs.", price: 199, features: ["Unlimited users", "All core features", "Unlimited storage", "Dedicated support", "Advanced analytics", "Custom reports", "Dedicated account manager"] },
];

const team = [
  { name: "Sarah Johnson", email: "sarah@techflowsolutions.com", role: "Project Manager", status: "Active" },
  { name: "Michael Brown", email: "michael@techflowsolutions.com", role: "Team Lead", status: "Active" },
  { name: "Emily Davis", email: "emily@techflowsolutions.com", role: "Developer", status: "Active" },
  { name: "James Wilson", email: "james@techflowsolutions.com", role: "Marketing Manager", status: "Inactive" },
];

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <DashboardShell title="Settings & Subscription" subtitle="Manage your account, team, preferences and subscription.">
      <Tabs defaultValue="profile">
        <TabsList className="mb-5 flex-wrap">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="team">Team Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>User Profile</CardTitle></CardHeader>
              <CardContent className="pt-0">
                <div className="mb-5 flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">{user ? initials(user.name) : "U"}</AvatarFallback>
                    </Avatar>
                    <button
                      aria-label="Change profile photo"
                      className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <Camera className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <dl className="space-y-3 text-sm">
                  <Row label="Role" value={<Badge>{user?.role}</Badge>} />
                  <Row label="Department" value="Executive" />
                  <Row label="Language" value="English (US)" />
                  <Row label="Timezone" value="(GMT+01:00) West Africa Time" />
                </dl>
                <Button variant="outline" className="mt-5">Edit Profile</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Quick Settings</CardTitle></CardHeader>
              <CardContent className="space-y-1 pt-0">
                {["Notifications", "Appearance", "AI Settings", "Language & Region"].map((s) => (
                  <button key={s} className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm hover:bg-secondary">
                    {s} <span className="text-muted-foreground">›</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader><CardTitle>Company Profile</CardTitle></CardHeader>
            <CardContent className="pt-0">
              <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <Row label="Company Name" value={user?.companyName} />
                <Row label="Industry" value="Software Development" />
                <Row label="Company Size" value="25 – 50 employees" />
                <Row label="Address" value="123 Innovation Drive, Victoria Island, Lagos, Nigeria" />
              </dl>
              <Button variant="outline" className="mt-5">Edit Company</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Team Members</CardTitle>
              <Button size="sm"><UserPlus className="h-3.5 w-3.5" /> Invite Member</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="divide-y divide-border">
                {team.map((m) => (
                  <div key={m.email} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarFallback>{initials(m.name)}</AvatarFallback></Avatar>
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{m.role}</span>
                      <Badge variant={m.status === "Active" ? "success" : "secondary"}>{m.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader><CardTitle>Security</CardTitle></CardHeader>
            <CardContent className="space-y-1 pt-0">
              {[
                { label: "Password", detail: "Last changed 2 months ago" },
                { label: "Two-Factor Authentication", detail: "Enabled" },
                { label: "Login Sessions", detail: "3 active sessions" },
                { label: "Devices", detail: "4 devices" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between border-b border-border py-3 last:border-0">
                  <span className="text-sm font-medium">{s.label}</span>
                  <span className="text-xs text-muted-foreground">{s.detail}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle>Billing Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3 pt-0 text-sm">
              <Row label="Current Plan" value="Growth" />
              <Row label="Billing Cycle" value="Annual" />
              <Row label="Next Billing Date" value="Jun 1, 2026" />
              <Row label="Payment Method" value="VISA •••• 4242" />
              <Button className="mt-2">Manage Billing</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((p) => (
              <PricingPlanCard key={p.name} plan={p} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
