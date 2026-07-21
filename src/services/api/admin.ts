import { env } from "@/lib/env";
import { apiClient } from "./client";
import type { Role, ApiKey } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const adminApi = {
  async listRoles(): Promise<Role[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [];
    }
    return apiClient<Role[]>("/admin/roles");
  },

  async listApiKeys(): Promise<ApiKey[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [];
    }
    return apiClient<ApiKey[]>("/admin/api-keys");
  },
};
