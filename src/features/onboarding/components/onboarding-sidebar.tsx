"use client";
import { Building2, Users, Package, Wrench, ClipboardCheck, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/store/onboarding-store";

const steps = [
  { label: "Business Information", icon: Building2 },
  { label: "Staff Distribution", icon: Users },
  { label: "Products", icon: Package },
  { label: "Services", icon: Wrench },
  { label: "Review & Finish", icon: ClipboardCheck },
];

export function OnboardingSidebar() {
  const step = useOnboardingStore((s) => s.step);
  const setStep = useOnboardingStore((s) => s.setStep);
  const progress = (step / steps.length) * 100;

  return (
    <aside className="w-full shrink-0 border-b border-border bg-card p-5 lg:w-72 lg:border-b-0 lg:border-r">
      <div className="mb-6">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="font-medium">Onboarding Progress</span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <p className="mb-2 text-xs text-muted-foreground">Step {step} of {steps.length}</p>
        <Progress value={progress} />
      </div>

      <nav className="space-y-1">
        {steps.map((s, i) => {
          const idx = i + 1;
          const active = idx === step;
          const done = idx < step;
          return (
            <button
              key={s.label}
              onClick={() => done && setStep(idx)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                active ? "bg-primary/10 text-primary" : done ? "text-foreground hover:bg-secondary" : "text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs",
                  active ? "bg-primary text-white" : done ? "bg-success text-white" : "bg-secondary text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : idx}
              </span>
              {s.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 hidden rounded-lg bg-secondary/60 p-4 lg:block">
        <p className="text-sm font-semibold">Complete onboarding</p>
        <p className="mt-1 text-xs text-muted-foreground">Finish all steps to unlock the full power of Businux.</p>
      </div>
    </aside>
  );
}
