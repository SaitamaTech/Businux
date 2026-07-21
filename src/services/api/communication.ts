import { env } from "@/lib/env";
import { apiClient } from "./client";
import type { MessageItem } from "@/types";

async function mockDelay(ms = 300) {
  await new Promise((r) => setTimeout(r, ms));
}

export const communicationApi = {
  async listMessages(): Promise<MessageItem[]> {
    if (env.useMockApi) {
      await mockDelay();
      return [];
    }
    return apiClient<MessageItem[]>("/communication/messages");
  },

  async sendMessage(payload: Partial<MessageItem>): Promise<MessageItem> {
    if (env.useMockApi) {
      await mockDelay(200);
      return { id: crypto.randomUUID(), from: payload.from ?? "me", to: payload.to ?? "", body: payload.body ?? "", timestamp: new Date().toISOString() } as MessageItem;
    }
    return apiClient<MessageItem>("/communication/messages", { method: "POST", body: payload });
  },
};
