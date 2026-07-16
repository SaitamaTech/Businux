import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusDonut } from "./status-donut";
import { taskDonut } from "@/services/mock-data";

export function TasksOverviewCard() {
  const total = taskDonut.reduce((s, d) => s + d.value, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6 pt-0">
        <StatusDonut data={taskDonut} total={total} centerLabel="Total Tasks" />
        <div className="min-w-0 flex-1 space-y-2.5">
          {taskDonut.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name}
              </span>
              <span className="font-medium">
                {d.value} ({Math.round((d.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
