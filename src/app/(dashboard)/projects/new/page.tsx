"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, FilePlus, Sparkles } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projectsApi } from "@/services/api/projects";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/providers/toast-provider";

export default function NewProjectPage() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [summary, setSummary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await projectsApi.createProject({
        name: name || "New Project",
        progress: 0,
        status: "In Progress",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success({ title: "Project created", description: `Project ${name || "New Project"} was added.` });
      router.push("/projects");
    } catch (error) {
      toast.error({ title: "Unable to create project", description: "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell title="New Project" subtitle="Create a new project plan for your team.">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">Project setup</p>
            <h1 className="text-3xl font-semibold tracking-tight">Launch a new initiative.</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Capture the key details, timelines, and team alignment for your next high-value project.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/projects">
              <span className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to projects
              </span>
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Define the project name, priority, and expected delivery timeline.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Project name</span>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product launch redesign" required />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Project owner</span>
                  <Input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Sarah Johnson" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Start date</span>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">Delivery target</span>
                  <Input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
                </label>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Project summary</span>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  placeholder="Outline the project goals, success criteria, and core outcomes."
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button type="submit" disabled={loading}>
                  <FilePlus className="h-4 w-4" /> {loading ? "Creating..." : "Create project"}
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  Get started with a high-impact scope today.
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
