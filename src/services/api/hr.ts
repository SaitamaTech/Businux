import { env } from "@/lib/env";
import { apiClient } from "./client";
import type { Employee } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const hrApi = {
  async listEmployees(): Promise<Employee[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [];
    }
    return apiClient<Employee[]>("/hr/employees");
  },

  async getEmployee(id: string): Promise<Employee | null> {
    if (env.useMockApi) {
      await mockDelay(150);
      return null;
    }
    return apiClient<Employee | null>(`/hr/employees/${id}`);
  },
};
