"use client";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProposalStore } from "@/store/proposal-store";

const templates = [
  { id: "software-development", name: "Software Development", desc: "Perfect for software development and IT solutions proposals." },
  { id: "digital-marketing", name: "Digital Marketing", desc: "Comprehensive digital marketing services proposal." },
  { id: "business-consulting", name: "Business Consulting", desc: "Professional consulting services proposal template." },
  { id: "web-design", name: "Web Design", desc: "Website and UI/UX design proposal template." },
  { id: "mobile-app", name: "Mobile App Development", desc: "Mobile application development proposal template." },
];

export function ProposalTemplateList() {
  const templateId = useProposalStore((s) => s.templateId);
  const setTemplateId = useProposalStore((s) => s.setTemplateId);

  return (
    <div className="space-y-2.5">
      {templates.map((t) => {
        const active = t.id === templateId;
        return (
          <Card
            key={t.id}
            onClick={() => setTemplateId(t.id)}
            className={cn("cursor-pointer p-3.5 transition-colors hover:bg-secondary/50", active && "border-primary bg-primary/5")}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold">{t.name}</p>
              {active && (
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
          </Card>
        );
      })}
    </div>
  );
}
