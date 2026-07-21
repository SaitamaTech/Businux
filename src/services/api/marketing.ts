import { env } from "@/lib/env";
import { apiClient } from "./client";
import type { Campaign } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const marketingApi = {
  async listCampaigns(): Promise<Campaign[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [];
    }
    return apiClient<Campaign[]>("/marketing/campaigns");
  },
};
