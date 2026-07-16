import { Check, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNaira } from "@/lib/format";
import type { Deal } from "@/types";
import { cn } from "@/lib/utils";

export function DealPipelineCard({ deals, totalValue }: { deals: Deal[]; totalValue: number }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Deal Pipeline</CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View all deals</button>
      </CardHeader>
      <CardContent className="space-y-1 pt-0">
        {deals.map((d, i) => {
          const won = d.stage === "Won";
          const current = i === deals.length - 2;
          return (
            <div key={d.id} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full",
                    won || current ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                  )}
                >
                  {won ? <Check className="h-3 w-3" /> : <Circle className="h-2 w-2 fill-current" />}
                </span>
                <span className="font-medium">{d.stage}</span>
              </div>
              <span className="font-semibold">{formatNaira(d.value, { compact: true })}</span>
            </div>
          );
        })}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold">Deal Value</span>
          <span className="text-lg font-bold text-primary">{formatNaira(totalValue, { compact: true })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
