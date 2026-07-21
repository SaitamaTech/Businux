"use client";
import { Flag, MoreVertical, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format";
import type { Task, TaskStatus } from "@/types";
import { cn } from "@/lib/utils";
import { useTaskBoardStore } from "@/store/task-board-store";

const priorityColor = { High: "text-destructive", Medium: "text-warning", Low: "text-success" } as const;
const allStatuses: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

export function TaskCard({ task, onDragStart }: { task: Task; onDragStart: (e: React.DragEvent) => void }) {
  const moveTask = useTaskBoardStore((s) => s.moveTask);

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      role="group"
      aria-roledescription="Draggable task card"
      aria-label={`${task.title}, currently in ${task.status}`}
      className="cursor-grab space-y-2 p-3.5 transition-shadow hover:shadow-card-hover focus-within:ring-2 focus-within:ring-ring active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge variant="secondary" className="text-[10px]">
          {task.tag}
        </Badge>

        {/* Keyboard/screen-reader alternative to drag-and-drop — native HTML5
            drag-and-drop (used for mouse users above) has no keyboard
            equivalent, so this menu is what makes moving a card between
            columns possible via keyboard alone (WCAG 2.2 SC 2.1.1). */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Move "${task.title}" to another column`}
            className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MoreVertical className="h-3.5 w-3.5" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Move to</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {allStatuses
              .filter((s) => s !== task.status)
              .map((status) => (
                <DropdownMenuItem key={status} onClick={() => moveTask(task.id, status)}>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /> {status}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm font-medium leading-snug">{task.title}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(task.dueDate)}</span>
        <span className={cn("flex items-center gap-1 font-medium", priorityColor[task.priority])}>
          <Flag className="h-3 w-3" aria-hidden="true" /> {task.priority}
        </span>
      </div>
    </Card>
  );
}
