"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverviewItem {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "success" | "warning" | "destructive" | "accent" | "secondary";
}

interface InsightSection {
  title: string;
  description: string;
  items: Array<{ label: string; value: string; tone?: OverviewItem["tone"] }>;
}

interface ModuleOverviewGridProps {
  title: string;
  subtitle: string;
  heroTitle?: string;
  heroDescription?: string;
  stats?: OverviewItem[];
  sections: InsightSection[];
  actions?: ReactNode;
}

export function ModuleOverviewGrid({
  title,
  subtitle,
  heroTitle,
  heroDescription,
  stats = [],
  sections,
  actions,
}: ModuleOverviewGridProps) {
  return (
    <DashboardShell title={title} subtitle={subtitle}>
      <div className="space-y-6">
        {(heroTitle || heroDescription || actions) && (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="flex flex-wrap items-start justify-between gap-4 p-6">
              <div>
                {heroTitle && <h2 className="text-lg font-semibold">{heroTitle}</h2>}
                {heroDescription && <p className="mt-1 text-sm text-muted-foreground">{heroDescription}</p>}
              </div>
              {actions}
            </CardContent>
          </Card>
        )}

        {stats.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg border border-border px-3 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    </div>
                    {item.tone ? <Badge variant={item.tone}>{item.tone === "default" ? "Live" : item.tone}</Badge> : null}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
