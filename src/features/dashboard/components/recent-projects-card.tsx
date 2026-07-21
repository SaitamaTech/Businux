import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/services/mock-data";

const statusVariant = {
  "In Progress": "default",
  Review: "warning",
  Completed: "success",
  "At Risk": "destructive",
} as const;

export function RecentProjectsCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Recent Projects</CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {mockProjects.map((p) => (
          <div key={p.id}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium">{p.name}</span>
              <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={p.progress} className="h-1.5" />
              <span className="w-9 shrink-0 text-right text-xs text-muted-foreground">{p.progress}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
