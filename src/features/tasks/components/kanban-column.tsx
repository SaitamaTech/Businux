"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard } from "./task-card";
import { useTaskBoardStore } from "@/store/task-board-store";
import type { Task, TaskStatus } from "@/types";
import { cn } from "@/lib/utils";

const columnAccent: Record<TaskStatus, string> = {
  "To Do": "border-t-slate-400",
  "In Progress": "border-t-primary",
  Review: "border-t-warning",
  Done: "border-t-success",
};

export function KanbanColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
  const moveTask = useTaskBoardStore((s) => s.moveTask);
  const addTask = useTaskBoardStore((s) => s.addTask);
  const [dragOver, setDragOver] = useState(false);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const id = e.dataTransfer.getData("text/task-id");
        if (id) moveTask(id, status);
      }}
      className={cn(
        "flex w-72 shrink-0 flex-col rounded-xl border-t-4 bg-secondary/40 p-3 transition-colors",
        columnAccent[status],
        dragOver && "bg-secondary/70 ring-2 ring-primary/30"
      )}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold">{status}</h3>
        <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      <div className="scrollbar-thin flex-1 space-y-2.5 overflow-y-auto">
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onDragStart={(e) => e.dataTransfer.setData("text/task-id", t.id)}
          />
        ))}
      </div>

      {adding ? (
        <div className="mt-2 space-y-2">
          <input
            autoFocus
            aria-label={`New task title for ${status}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && title.trim()) {
                addTask(title.trim(), status);
                setTitle("");
                setAdding(false);
              }
              if (e.key === "Escape") setAdding(false);
            }}
            placeholder="Task title..."
            className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-secondary"
        >
          <Plus className="h-3.5 w-3.5" /> Add Task
        </button>
      )}
    </div>
  );
}
