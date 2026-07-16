import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api";

export const dashboardKeys = {
  summary: ["dashboard", "summary"] as const,
  taskBreakdown: ["dashboard", "task-breakdown"] as const,
  revenueBySource: ["dashboard", "revenue-by-source"] as const,
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: dashboardKeys.summary,
    queryFn: () => dashboardApi.getSummary(),
  });
}
