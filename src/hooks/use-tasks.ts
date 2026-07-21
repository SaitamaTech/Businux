import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/services/api";
import type { Task, TaskStatus } from "@/types";
import type { CreateTaskRequest } from "@/types/api";

export const taskKeys = {
  all: ["tasks"] as const,
  list: () => [...taskKeys.all, "list"] as const,
};

export function useTasks() {
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: () => tasksApi.list(),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskRequest) => tasksApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: taskKeys.list() }),
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) => tasksApi.updateStatus(id, { status }),
    // Optimistic update: move the card instantly, roll back on failure.
    // This is the pattern to reach for once the Kanban board is migrated
    // from the local Zustand store to this hook (see docs/STATE_MANAGEMENT.md).
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list() });
      const previous = queryClient.getQueryData<Task[]>(taskKeys.list());
      queryClient.setQueryData<Task[]>(taskKeys.list(), (old) =>
        old?.map((t) => (t.id === id ? { ...t, status } : t))
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(taskKeys.list(), context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskKeys.list() }),
  });
}
