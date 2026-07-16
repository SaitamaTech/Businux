import { create } from "zustand";
import type { Task, TaskStatus } from "@/types";
import { mockTasks } from "@/services/mock-data";

interface TaskBoardState {
  tasks: Task[];
  moveTask: (id: string, status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
}

export const useTaskBoardStore = create<TaskBoardState>()((set) => ({
  tasks: mockTasks,
  moveTask: (id, status) =>
    set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) })),
  addTask: (title, status) =>
    set((s) => ({
      tasks: [
        ...s.tasks,
        { id: crypto.randomUUID(), title, tag: "General", status, priority: "Medium", dueDate: new Date().toISOString() },
      ],
    })),
}));
