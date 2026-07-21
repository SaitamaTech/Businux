import Link from "next/link";
import { ArrowRight, Briefcase, CalendarDays, ClipboardList, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockProjects, mockTasks } from "@/services/mock-data";

const statusVariant = {
  "In Progress": "default",
  Review: "warning",
  Completed: "success",
  "At Risk": "destructive",
} as const;

export default function ProjectsPage() {
  const totalProjects = mockProjects.length;
  const completedProjects = mockProjects.filter((project) => project.status === "Completed").length;
  const riskProjects = mockProjects.filter((project) => project.status === "At Risk").length;
  const averageCompletion = Math.round(mockProjects.reduce((sum, project) => sum + project.progress, 0) / totalProjects);
  const upcomingTasks = [...mockTasks]
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  return (
    <DashboardShell title="Projects" subtitle="Manage your active projects, timelines, and delivery plans.">
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/80 via-primary to-primary/60 p-6 text-white">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  <Sparkles className="h-4 w-4" /> Portfolio overview
                </div>
                <h1 className="text-3xl font-semibold tracking-tight">Build, track, and deliver every project.</h1>
                <p className="max-w-2xl text-sm text-white/90">
                  A modern workspace for planning scope, tracking progress, and staying aligned across your most important initiatives.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/projects/new">New project</Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/reports">Project reports</Link>
                </Button>
              </div>
            </div>
          </div>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white/70">Active projects</p>
              <p className="mt-2 text-3xl font-semibold text-white">{totalProjects}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white/70">Average completion</p>
              <p className="mt-2 text-3xl font-semibold text-white">{averageCompletion}%</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white/70">On track</p>
              <p className="mt-2 text-3xl font-semibold text-white">{completedProjects}/{totalProjects}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Project roadmap</CardTitle>
                  <CardDescription>See progress and status for your active portfolio.</CardDescription>
                </div>
                <Badge variant={riskProjects > 0 ? "destructive" : "success"}>
                  {riskProjects > 0 ? `${riskProjects} at risk` : "All systems go"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                {mockProjects.map((project) => (
                  <div key={project.id} className="rounded-3xl border border-border bg-background p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{project.id.toUpperCase()}</p>
                        <h2 className="text-lg font-semibold">{project.name}</h2>
                      </div>
                      <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-sm font-medium text-muted-foreground">Completion</span>
                      <div className="flex-1">
                        <Progress value={project.progress} />
                      </div>
                      <span className="w-14 text-right text-sm font-semibold">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="secondary" asChild>
                  <Link href="/projects">View project details</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio highlights</CardTitle>
                <CardDescription>Track top initiatives and their current focus areas.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 pt-0">
                <div className="grid gap-3 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Project pulse</p>
                      <p className="text-sm text-foreground">90% of active work items are on schedule.</p>
                    </div>
                    <Badge variant="success">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Speed to launch</p>
                      <p className="text-sm text-foreground">Deliver faster with clear milestones.</p>
                    </div>
                    <span className="text-sm font-semibold">3 weeks</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Stakeholder readiness</p>
                      <p className="text-sm text-foreground">Sharing weekly updates keeps communication aligned.</p>
                    </div>
                    <Badge variant="default">Strong</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deadlines & tasks</CardTitle>
                <CardDescription>Upcoming milestones and actions due soon.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="rounded-3xl border border-border bg-background p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.tag} • Due {task.dueDate}</p>
                      </div>
                      <Badge variant={task.status === "Done" ? "success" : task.status === "Review" ? "warning" : task.status === "In Progress" ? "default" : "secondary"}>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" asChild>
                  <Link href="/tasks">
                    <span className="flex items-center gap-2">
                      See all tasks <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery roadmap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="space-y-4 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Planning</span>
                    <span className="text-sm font-semibold text-foreground">Complete</span>
                  </div>
                  <Progress value={95} />
                </div>
                <div className="space-y-4 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Design</span>
                    <span className="text-sm font-semibold text-foreground">80%</span>
                  </div>
                  <Progress value={80} />
                </div>
                <div className="space-y-4 rounded-3xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Execution</span>
                    <span className="text-sm font-semibold text-foreground">60%</span>
                  </div>
                  <Progress value={60} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
