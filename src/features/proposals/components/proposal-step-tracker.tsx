"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { n: 1, label: "Details", sub: "Basic Information" },
  { n: 2, label: "Content", sub: "AI Generation" },
  { n: 3, label: "Editor", sub: "Review & Customize" },
  { n: 4, label: "Review", sub: "Final Check" },
  { n: 5, label: "Send", sub: "Share & Approve" },
];

export function ProposalStepTracker({ current }: { current: number }) {
  return (
    <div className="flex items-center overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} className="flex shrink-0 items-center">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                  active ? "bg-primary text-white" : done ? "bg-success text-white" : "bg-secondary text-muted-foreground"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : s.n}
              </span>
              <div className="mt-1.5 text-center">
                <p className={cn("text-xs font-semibold", active && "text-primary")}>{s.label}</p>
                <p className="text-[10px] text-muted-foreground">{s.sub}</p>
              </div>
            </div>
            {i < steps.length - 1 && <div className={cn("mx-3 h-px w-10 sm:w-16", done ? "bg-success" : "bg-border")} />}
          </div>
        );
      })}
    </div>
  );
}
