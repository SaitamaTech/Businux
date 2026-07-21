import { env } from "@/lib/env";
import { apiClient } from "./client";
import { revenueSeries, taskDonut, revenueBySource } from "@/services/mock-data";
import type { DashboardSummaryResponse } from "@/types/api";

async function mockDelay(ms = 400) {
  await new Promise((r) => setTimeout(r, ms));
}

export const dashboardApi = {
  async getSummary(): Promise<DashboardSummaryResponse> {
    if (env.useMockApi) {
      await mockDelay();
      return {
        totalRevenue: 24_500_000,
        netProfit: 7_900_000,
        totalExpenses: 8_200_000,
        activeProjects: 18,
        revenueTrend: revenueSeries.map((r) => ({ date: r.date, revenue: r.revenue, profit: r.profit })),
        businessHealthScore: 87,
      };
    }
    return apiClient<DashboardSummaryResponse>("/dashboard/summary");
  },

  async getTaskBreakdown() {
    if (env.useMockApi) {
      await mockDelay(250);
      return taskDonut;
    }
    return apiClient("/dashboard/tasks-breakdown");
  },

  async getRevenueBySource() {
    if (env.useMockApi) {
      await mockDelay(250);
      return revenueBySource;
    }
    return apiClient("/dashboard/revenue-by-source");
  },
};
