import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRecommendations } from "@/services/mock-data";

export function AIRecommendationsCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-accent" /> AI Recommendations
        </CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {mockRecommendations.map((r) => (
          <button
            key={r.id}
            className="flex w-full items-center justify-between gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-secondary/60"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{r.title}</p>
              <p className="truncate text-xs text-muted-foreground">{r.impact}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
