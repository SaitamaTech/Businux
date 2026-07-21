"use client";
import { useEffect, useState } from "react";
import { Rocket, TrendingUp, Building2, Landmark, Camera, UserPlus } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingPlanCard } from "@/features/settings/components/pricing-plan-card";
import { useAuthStore } from "@/store/auth-store";
import { useSettingsStore } from "@/store/settings-store";
import { initials } from "@/lib/format";
import { useToast } from "@/components/providers/toast-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Switch } from "@/components/ui/switch";

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
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const toast = useToast();
  const { theme, setTheme } = useTheme();
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const aiSuggestionsEnabled = useSettingsStore((s) => s.aiSuggestionsEnabled);
  const language = useSettingsStore((s) => s.language);
  const region = useSettingsStore((s) => s.region);
  const setNotificationsEnabled = useSettingsStore((s) => s.setNotificationsEnabled);
  const setAiSuggestionsEnabled = useSettingsStore((s) => s.setAiSuggestionsEnabled);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const setRegion = useSettingsStore((s) => s.setRegion);
  const [formState, setFormState] = useState({ name: "", companyName: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormState({ name: user.name, companyName: user.companyName });
    }
  }, [user]);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;

    setIsSaving(true);
    try {
      await updateProfile({
        name: formState.name.trim() || user.name,
        companyName: formState.companyName.trim() || user.companyName,
      });
      toast.success({ title: "Profile updated", description: "Your profile details are now visible across the site." });
    } catch {
      toast.error({ title: "Update failed", description: "We couldn't save your profile changes right now." });
    } finally {
      setIsSaving(false);
    }
  }

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
                  <Row label="Language" value={language} />
                  <Row label="Timezone" value={region} />
                </dl>
                <form onSubmit={handleSave} className="mt-5 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Full name</Label>
                    <Input
                      id="profile-name"
                      value={formState.name}
                      onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-company">Company</Label>
                    <Input
                      id="profile-company"
                      value={formState.companyName}
                      onChange={(event) => setFormState((current) => ({ ...current, companyName: event.target.value }))}
                      placeholder="Enter your company"
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Quick Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">Enable email and in-app alerts.</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Appearance</p>
                    <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
                  </div>
                  <Select value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")}> 
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">AI Settings</p>
                    <p className="text-sm text-muted-foreground">Enable AI recommendations and insights.</p>
                  </div>
                  <Switch checked={aiSuggestionsEnabled} onCheckedChange={setAiSuggestionsEnabled} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border px-4 py-3">
                    <p className="text-sm font-medium">Language</p>
                    <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English (US)">English (US)</SelectItem>
                        <SelectItem value="English (UK)">English (UK)</SelectItem>
                        <SelectItem value="Français">Français</SelectItem>
                        <SelectItem value="Español">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="rounded-lg border border-border px-4 py-3">
                    <p className="text-sm font-medium">Region</p>
                    <Select value={region} onValueChange={(value) => setRegion(value as any)}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMT+00:00">GMT+00:00</SelectItem>
                        <SelectItem value="GMT+01:00">GMT+01:00</SelectItem>
                        <SelectItem value="GMT+02:00">GMT+02:00</SelectItem>
                        <SelectItem value="GMT-05:00">GMT-05:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
