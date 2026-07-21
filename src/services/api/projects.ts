import { env } from "@/lib/env";
import { apiClient } from "./client";
import { mockTasks } from "@/services/mock-data";
import { getPersistedProjects, addPersistedProject } from "@/services/mock-store";
import type { Project, Task } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const projectsApi = {
  async listProjects(): Promise<Project[]> {
    if (env.useMockApi) {
      await mockDelay();
      return getPersistedProjects();
    }
    return apiClient<Project[]>("/projects");
  },

  async getProject(id: string): Promise<Project | null> {
    if (env.useMockApi) {
      await mockDelay(150);
      return getPersistedProjects().find((p) => p.id === id) ?? null;
    }
    return apiClient<Project | null>(`/projects/${id}`);
  },

  async createProject(payload: Partial<Project>): Promise<Project> {
    if (env.useMockApi) {
      await mockDelay(200);
      return addPersistedProject(payload);
    }
    return apiClient<Project>("/projects", { method: "POST", body: payload });
  },

  async listTasks(projectId?: string): Promise<Task[]> {
    if (env.useMockApi) {
      await mockDelay();
      return projectId ? mockTasks.filter((t) => t.id.startsWith(projectId)) : [...mockTasks];
    }
    return apiClient<Task[]>(`/projects/tasks${projectId ? `?projectId=${projectId}` : ""}`);
  },
};
