import { BarChart3, Zap, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  { icon: BarChart3, iconClass: "bg-primary/10 text-primary", title: "Manage everything", desc: "Customers, invoices, projects, and more." },
  { icon: Zap, iconClass: "bg-info/10 text-info", title: "AI-Powered", desc: "Get intelligent insights and automate your business operations." },
  { icon: ShieldCheck, iconClass: "bg-success/10 text-success", title: "Secure & Reliable", desc: "Enterprise-grade security to keep your data safe." },
];

export function SignupBenefitsPanel() {
  return (
    <div className="max-w-sm">
      <h2 className="text-2xl font-bold tracking-tight">All-in-one platform for growing businesses</h2>
      <p className="mt-2 text-sm text-muted-foreground">Join thousands of businesses already managing smarter with AI.</p>
      <div className="mt-6 space-y-3">
        {benefits.map((b) => (
          <Card key={b.title}>
            <CardContent className="flex items-start gap-3 p-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${b.iconClass}`}>
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
