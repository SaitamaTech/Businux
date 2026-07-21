import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Plan {
  name: string;
  icon: LucideIcon;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export function PricingPlanCard({ plan }: { plan: Plan }) {
  return (
    <Card className={cn("relative flex flex-col", plan.popular && "border-primary shadow-card-hover")}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
          Most Popular
        </Badge>
      )}
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <plan.icon className="h-5 w-5" />
        </div>
        <p className="font-semibold">{plan.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-bold">${plan.price}</span>
          <span className="text-xs text-muted-foreground">/month</span>
        </div>
        <p className="text-xs text-muted-foreground">Billed annually</p>

        <ul className="mt-4 flex-1 space-y-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <Check className="h-3.5 w-3.5 shrink-0 text-success" /> {f}
            </li>
          ))}
        </ul>

        <Button variant={plan.popular ? "default" : "outline"} className="mt-5 w-full" disabled={plan.current}>
          {plan.current ? "Current Plan" : `Choose ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  );
}
