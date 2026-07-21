import { Mail, Phone, StickyNote, Calendar, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/format";
import type { ActivityItem } from "@/types";
import { cn } from "@/lib/utils";

const iconMap = {
  email: { icon: Mail, className: "bg-info/10 text-info" },
  call: { icon: Phone, className: "bg-success/10 text-success" },
  note: { icon: StickyNote, className: "bg-warning/10 text-warning" },
  meeting: { icon: Calendar, className: "bg-primary/10 text-primary" },
  system: { icon: Settings2, className: "bg-secondary text-muted-foreground" },
} as const;

export function CustomerTimelineCard({ activity }: { activity: ActivityItem[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Customer Timeline</CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View full timeline</button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-5">
          {activity.map((a, i) => {
            const { icon: Icon, className } = iconMap[a.type];
            return (
              <div key={a.id} className="relative flex gap-3">
                {i < activity.length - 1 && (
                  <span className="absolute left-4 top-9 h-full w-px -translate-x-1/2 bg-border" />
                )}
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", className)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{a.title}</p>
                    {a.status && <Badge variant="secondary" className="text-[10px]">{a.status}</Badge>}
                    <span className="ml-auto text-xs text-muted-foreground">{relativeTime(a.timestamp)}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{a.description}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.author}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
