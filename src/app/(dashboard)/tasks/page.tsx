"use client";
import { Plus, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { KanbanColumn } from "@/features/tasks/components/kanban-column";
import { useTaskBoardStore } from "@/store/task-board-store";
import type { TaskStatus } from "@/types";

const statuses: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

const priorityBreakdown = [
  { label: "High", value: 18, color: "bg-destructive" },
  { label: "Medium", value: 32, color: "bg-warning" },
  { label: "Low", value: 16, color: "bg-success" },
  { label: "None", value: 6, color: "bg-slate-300" },
];

const automations = [
  { name: "Client Onboarding Flow", lastRun: "2h ago" },
  { name: "Task Assignment Rule", lastRun: "1h ago" },
  { name: "Project Status Update", lastRun: "30m ago" },
  { name: "Overdue Task Reminder", lastRun: "15m ago" },
];

export default function TasksPage() {
  const tasks = useTaskBoardStore((s) => s.tasks);
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.status === "Done").length;
  const progressPct = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <DashboardShell title="Task & Workflow Manager" subtitle="Plan, track and automate your work with AI-powered insights.">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Drag cards between columns to update status.</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Sparkles className="h-3.5 w-3.5" /> AI Assistant
          </Button>
          <Button size="sm">
            <Plus className="h-3.5 w-3.5" /> New Task
          </Button>
        </div>
      </div>

      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <KanbanColumn key={status} status={status} tasks={tasks.filter((t) => t.status === status)} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Progress Overview</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <div className="mb-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold">{progressPct}%</span>
              <span className="text-xs text-muted-foreground">Overall Progress</span>
            </div>
            <Progress value={progressPct} />
            <p className="mt-2 text-xs text-muted-foreground">{doneCount} of {total} tasks completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tasks by Priority</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-0">
            {priorityBreakdown.map((p) => (
              <div key={p.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{p.label}</span>
                  <span className="font-medium">{p.value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className={`h-full ${p.color}`} style={{ width: `${(p.value / 40) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Workflow Automation</CardTitle></CardHeader>
          <CardContent className="space-y-3 pt-0">
            {automations.map((a) => (
              <div key={a.name} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground">Last run: {a.lastRun}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
