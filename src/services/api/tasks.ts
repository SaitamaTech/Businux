import { env } from "@/lib/env";
import { apiClient } from "./client";
import { mockTasks } from "@/services/mock-data";
import type { Task } from "@/types";
import type { CreateTaskRequest, UpdateTaskStatusRequest } from "@/types/api";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const tasksApi = {
  async list(): Promise<Task[]> {
    if (env.useMockApi) {
      await mockDelay();
      return mockTasks;
    }
    return apiClient<Task[]>("/tasks");
  },

  async create(payload: CreateTaskRequest): Promise<Task> {
    if (env.useMockApi) {
      await mockDelay();
      return {
        id: crypto.randomUUID(),
        title: payload.title,
        tag: "General",
        status: payload.status,
        priority: payload.priority ?? "Medium",
        dueDate: payload.dueDate ?? new Date().toISOString(),
      };
    }
    return apiClient<Task>("/tasks", { method: "POST", body: payload });
  },

  async updateStatus(id: string, payload: UpdateTaskStatusRequest): Promise<Task> {
    if (env.useMockApi) {
      await mockDelay(150);
      const task = mockTasks.find((t) => t.id === id);
      if (!task) throw new Error("Task not found");
      return { ...task, status: payload.status };
    }
    return apiClient<Task>(`/tasks/${id}/status`, { method: "PATCH", body: payload });
  },

  async remove(id: string): Promise<void> {
    if (env.useMockApi) {
      await mockDelay(150);
      return;
    }
    await apiClient<void>(`/tasks/${id}`, { method: "DELETE" });
  },
};
